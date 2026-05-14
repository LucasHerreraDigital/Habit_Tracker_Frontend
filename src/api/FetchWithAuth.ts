const API_URL = import.meta.env.VITE_API_URI

export const fetchWithAuth = async (
    endpoint: string,
    options: RequestInit = {}
) =>{
    const token = localStorage.getItem("token")
     const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
        },
    });

    if (!res.ok) {
        if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login"; 
        }

        const data = await res.json();
        throw new Error(data.message || "Error en la request");
    }

    return res.json();
    };

