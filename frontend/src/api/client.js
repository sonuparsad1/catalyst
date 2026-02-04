const API_BASE_URL = import.meta.env.VITE_API_URL?.trim();
const HAS_WINDOW = typeof window !== "undefined";
const FALLBACK_BASE_URL = HAS_WINDOW ? window.location.origin : "";
const RESOLVED_BASE_URL = API_BASE_URL || FALLBACK_BASE_URL;

if (!RESOLVED_BASE_URL && HAS_WINDOW) {
  throw new Error(
    "Unable to determine API base URL. Set VITE_API_URL or run in a browser."
  );
}

const buildUrl = (path) => {
  const trimmedBase = RESOLVED_BASE_URL
    ? RESOLVED_BASE_URL.replace(/\/+$/, "")
    : "";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return trimmedBase ? `${trimmedBase}${normalizedPath}` : normalizedPath;
};

const normalizeError = async (response) => {
  let payload = null;
  try {
    payload = await response.json();
  } catch (error) {
    payload = null;
  }

  return {
    status: response.status,
    message: payload?.message || "Request failed",
    code: payload?.code || "REQUEST_FAILED",
  };
};

const request = async ({ path, method = "GET", body, token, headers }) => {
  const response = await fetch(buildUrl(path), {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw await normalizeError(response);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export { request };
