import { CookieParam } from "puppeteer";

export const Cookies = (auth_token: string): CookieParam[] => {
  return [
    {
      name: "auth_token",
      value: auth_token,
      domain: ".x.com",
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "None",
      sameParty: false,
      sourceScheme: "Secure",
    },
  ];
};
