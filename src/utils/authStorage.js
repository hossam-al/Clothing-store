export function extractAuthToken(response) {
  const payload = response?.data || {};

  return (
    payload.token ||
    payload.access_token ||
    payload.data?.token ||
    payload.data?.access_token ||
    payload.data?.plainTextToken ||
    ""
  );
}

export function extractAuthUser(response) {
  const payload = response?.data || {};

  return payload.user || payload.data?.user || payload.data || null;
}

export function saveAuthSession(response) {
  const token = extractAuthToken(response);
  const user = extractAuthUser(response);

  if (token) {
    localStorage.setItem("auth_token", token);
  }

  if (user) {
    localStorage.setItem("auth_user", JSON.stringify(user));
  }

  window.dispatchEvent(new Event("auth-updated"));

  return { token, user };
}

export function getStoredAuthSession() {
  let user;

  try {
    user = JSON.parse(localStorage.getItem("auth_user")) || null;
  } catch {
    user = null;
  }

  return {
    token: localStorage.getItem("auth_token") || "",
    user,
  };
}

export function clearAuthSession() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
}
