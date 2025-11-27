export function buildApiUrl(path: string): string {
  const baseEnv = import.meta.env.VITE_API_URL || "";
  const normalizedBase = baseEnv.endsWith("/")
    ? baseEnv.slice(0, -1)
    : baseEnv;
  const baseWithApi = normalizedBase.endsWith("/api")
    ? normalizedBase
    : `${normalizedBase}/api`;

  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  if (!normalizedPath) return baseWithApi;
  return `${baseWithApi}/${normalizedPath}`;
}
