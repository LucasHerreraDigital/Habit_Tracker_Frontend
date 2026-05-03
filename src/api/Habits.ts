const API_URL = "";

export const getHabits = async (token: string) => {
  const res = await fetch(`${API_URL}/habits`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const createHabit = async (title: string, token: string) => {
  const res = await fetch(`${API_URL}/habits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });
  return res.json();
};

export const deleteHabit = async (id: string,token:string) =>{
    await fetch(`${API_URL}/habits/${id}`,{
        method: "DELETE",
        headers:{Authorization:`Bearer ${token}`}

    })
}

export const toggleHabit = async (id:string,token:string)=>{
    const res = await fetch(`${API_URL}/habits/${id}/toggle`,{
        method:"PATCH",
        headers:{Authorization: `Bearer ${token}`}
    })
    return res.json()
}