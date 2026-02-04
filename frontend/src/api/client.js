const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_URL is not defined. Check environment variables.");
}

const buildUrl = (path) => {
  const trimmedBase = API_BASE_URL.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${trimmedBase}${normalizedPath}`;
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
