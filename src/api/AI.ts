import { fetchWithAuth } from "./FetchWithAuth";

export const getAIInsight = async (
  stats: unknown
) => {
  return fetchWithAuth("/ai/insight", {
    method: "POST",
    body: JSON.stringify({ stats }),
  });
};