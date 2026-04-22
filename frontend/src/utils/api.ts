const BASE_URL = "https://stealthsurveillance.onrender.com/api";

import { getToken } from "./token";

export const api = async (
  endpoint: string,
  method: string = "GET",
  body?: any,
  customToken?: string
) => {
  const token = customToken || getToken();

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(data?.detail || "Request failed");
  }

  return data;
};