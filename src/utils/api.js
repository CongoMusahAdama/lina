export const API_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.origin.includes("localhost")
    ? "http://localhost:5000/api"
    : "https://lina-0tkg.onrender.com/api");

export const apiRequest = async (endpoint, method = "GET", body = null) => {
  const token = localStorage.getItem("lina_auth_token");
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const config = {
    method,
    headers,
    credentials: "include", // Important for httpOnly cookies
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const res = await fetch(`${API_URL}${endpoint}`, config);
    return await res.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    return { success: false, message: "Server connection failed" };
  }
};
