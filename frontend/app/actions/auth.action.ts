"use server";

import {getPublicEnv} from "env.common";

export async function login(values: { email: string; password: string }) {
  try {
    const url = getPublicEnv(import.meta.env).VITE_API_URL + "/auth/login";

    const res = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Login failed: ${error}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Login action failed:", err);
    throw err;
  }
}

export const register = (values: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isCoach?: boolean;
}) => postRegister("/auth/register", values);

export const registerCoach = (values: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isCoach: boolean;
  birthDate?: Date;
  profilePicture?: string;
  hourlyRate?: number;
  sports?: string[];
  level?: "BEGINNER" | "MEDIUM" | "HIGHLEVEL";
  gender?: "MALE" | "FEMALE";
}) => {
  const formattedValues = {
    ...values,
    birthdate: values.birthDate
      ? new Date(values.birthDate).toISOString().slice(0, 10)
      : undefined,
  };

  return postRegister("/auth/register/coach", formattedValues);
};

async function postRegister<T>(endpoint: string, values: T & { isCoach?: boolean }) {
  const url = getPublicEnv(import.meta.env).VITE_API_URL + endpoint;

  console.log("Données enoyées", values)
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        role: values.isCoach ? 'COACH' : 'USER',
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Registration failed: ${error}`);
    }

    console.log("Données reçu :", await res.json());
  } catch (err) {
    console.error("Registration action failed:", err);
    throw err;
  }
}
