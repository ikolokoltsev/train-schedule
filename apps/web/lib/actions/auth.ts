"use server";

import { redirect } from "next/navigation";
import { BACKEND_URL } from "../constant";
import { createSession } from "../session";
import { FormState, LoginFormSchema, SignUpFormSchema } from "../type";

export async function SignUp(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = SignUpFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validationFields.success) {
    const error = validationFields.error.flatten();
    return {
      error: {
        name: error.fieldErrors.name?.[0] || "",
        email: error.fieldErrors.email?.[0] || "",
        password: error.fieldErrors.password ?? [""],
      },
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });
  if (response.ok) {
    redirect("/auth/signin");
  } else {
    return {
      message:
        response.status === 409 ? "User already exists" : response.statusText,
    };
  }
}

export async function signIn(
  state: FormState,
  fromData: FormData
): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: fromData.get("email"),
    password: fromData.get("password"),
  });

  if (!validatedFields.success) {
    const error = validatedFields.error.flatten();
    return {
      error: {
        email: error.fieldErrors.email?.[0] || "",
        password: error.fieldErrors.password ?? [""],
        name: "",
      },
    };
  }
  const response = await fetch(`${BACKEND_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });
  if (response.ok) {
    const data = await response.json();
    await createSession({
      user: {
        id: data.id,
        name: data.name,
      },
      accessToken: data.accessToken,
    });
    redirect("/");
  } else {
    return {
      message:
        response.status === 401 ? "Invalid credentials" : response.statusText,
    };
  }
}
