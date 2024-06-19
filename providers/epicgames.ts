import { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

export interface EpicGamesEmail {
  email: string;
  verified: boolean;
}

export interface EpicGamesProfile {
  id: string;
  email: string;
  displayName: string;
  [claim: string]: unknown;
}

export default function EpicGames(
  config: OAuthUserConfig<EpicGamesProfile> & {
    scope?: string;
    enterprise?: {
      baseUrl?: string;
    };
  }
): OAuthConfig<EpicGamesProfile> {
  const baseUrl = config?.enterprise?.baseUrl ?? "https://www.epicgames.com";
  const apiBaseUrl = config?.enterprise?.baseUrl
    ? `${config?.enterprise?.baseUrl}/api/v3`
    : "https://api.epicgames.dev";

  return {
    id: "epicgames",
    name: "Epic Games",
    type: "oauth",
    authorization: {
      url: `${baseUrl}/id/authorize`,
      params: { scope: config.scope ?? "basic_profile" },
    },
    token: `${apiBaseUrl}/epic/oauth/v2/token`,
    userinfo: {
      url: `${apiBaseUrl}/epic/id/v2/accounts`,
      async request({ tokens, provider }: any) {
        const profile = await fetch(provider.userinfo?.url as URL, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            "User-Agent": "authjs",
          },
        }).then(async (res) => await res.json());

        if (!profile.email) {
          // If the user does not have a public email, get another via the Epic Games API
          // See https://docs.epicgames.com/en/rest/users/emails#list-public-email-addresses-for-the-authenticated-user
          const res = await fetch(`${apiBaseUrl}/user/emails`, {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
              "User-Agent": "authjs",
            },
          });

          if (res.ok) {
            const emails: EpicGamesEmail[] = await res.json();
            profile.email = (emails.find((e) => e.verified) ?? emails[0]).email;
          }
        }

        return profile;
      },
    },
    profile(profile) {
      return {
        id: profile.id.toString(),
        name: profile.displayName,
        email: profile.email,
      };
    },
    options: config,
  } as OAuthConfig<EpicGamesProfile>;
}
