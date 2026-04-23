const BASE_URL =
  "https://stealthsurveillance.onrender.com/api";

import { getAccessToken } from "./token";

export const api = async (
  endpoint: string,
  method: string = "GET",
  body?: any,
  customToken?: string
) => {
  const token =
    customToken || getAccessToken();

  const res = await fetch(
    `${BASE_URL}${endpoint}`,
    {
      method,

      headers: {
        "Content-Type":
          "application/json",

        ...(token && {
          Authorization:
            `Bearer ${token}`,
        }),
      },

      body: body
        ? JSON.stringify(body)
        : undefined,
    }
  );

  let data;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  // HANDLE ERRORS
  if (!res.ok) {

    // SIMPLE DETAIL ERROR
    if (data?.detail) {
      throw new Error(data.detail);
    }

    // DJANGO VALIDATION ERRORS
    if (
      data &&
      typeof data === "object"
    ) {
      const firstKey =
        Object.keys(data)[0];

      const firstError =
        data[firstKey];

      if (
        Array.isArray(firstError)
      ) {
        throw new Error(
          `${firstKey}: ${firstError[0]}`
        );
      }

      throw new Error(
        JSON.stringify(data)
      );
    }

    throw new Error(
      "Request failed"
    );
  }

  return data;
};