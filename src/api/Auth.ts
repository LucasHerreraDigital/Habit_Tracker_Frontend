import { fetchBase } from "./FetchBase";

type LoginResponse = {
  token: string;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  return fetchBase("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const registerUser = async (
  email: string,
  password: string
) => {
  return fetchBase("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};