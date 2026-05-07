const API_URL = import.meta.env.VITE_API_URI;

export const fetchBase = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error en la request");
  }

  return data;
};