export const parseCookies = (cookieString: string): Map<string, string> => {
  return cookieString
    .split(";")
    .map((pair) => pair.trim())
    .reduce((cookiesMap: Map<string, string>, currPair: string) => {
      const [key, value] = currPair.split("=");
      cookiesMap.set(key, value);
      return cookiesMap;
    }, new Map());
};

export const getCookieValue = (
  cookieString: string | undefined,
  key: string
): string | undefined => {
  if (!cookieString) return;
  const cookiesMap = parseCookies(cookieString);
  return cookiesMap.get(key);
};
