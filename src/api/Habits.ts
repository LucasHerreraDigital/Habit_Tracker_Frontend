import { fetchWithAuth } from "./FetchWithAuth";

export const getHabits = async () => {
  return fetchWithAuth("/habits");
};

export const createHabit = async (title: string) => {
  return fetchWithAuth("/habits", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
};

export const deleteHabit = async (id: string) => {
  return fetchWithAuth(`/habits/${id}`, {
    method: "DELETE",
  });
};

export const completeHabit = async (id: string) => {
  return fetchWithAuth(`/habits/${id}/complete`, {
    method: "POST",
  });
};