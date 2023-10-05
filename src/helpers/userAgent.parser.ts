export function userAgentParser(userAgent: { browser: string }): string {
  for (const [key, value] of Object.entries(userAgent)) {
    if (value === undefined || value === null || Number.isNaN(value) || value === "unknown") {
      delete userAgent[key];
    }
  }

  const parsedUserAgent = Object.values(userAgent).join(" ");

  return parsedUserAgent;
}
