const API = "/api/auth";

// A helper function for all auth-requests
async function request(path, options) {
  let response;

  try {
    response = await fetch(`${API}${path}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });
  } catch {
    throw new Error("Cannot connect to server. Please try again.");
  }

  if (response.status === 204) return null;

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("Server returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}

// Register-request
export function register(email, password) {
  return request("/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// Login-request
export function login(email, password) {
  return request("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// Logout-request
export function logout() {
  return request("/logout", {
    method: "POST",
  });
}

// A request that asks the server if the logged-in user is still the same
export async function getCurrentUser() {
  const response = await fetch(`${API}/current`);
  if (!response.ok) return null;
  return response.json();
}
