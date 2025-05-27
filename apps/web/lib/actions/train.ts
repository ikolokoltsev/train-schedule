"use server";
import { revalidatePath } from "next/cache";
import { BACKEND_URL } from "../constant";
import { Train, TrainFormSchema, TrainFormState } from "../type";

export async function getAllTrains(): Promise<Train[]> {
  const response = await fetch(`${BACKEND_URL}/train`, {
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Failed to fetch trains");
  const trains = await response.json();
  return trains;
}

export async function addTrain(
  _: TrainFormState,
  formData: FormData
): Promise<TrainFormState> {
  const validationFields = TrainFormSchema.safeParse({
    number: formData.get("number"),
    name: formData.get("name"),
    type: formData.get("type"),
    departureStation: formData.get("departureStation"),
    arrivalStation: formData.get("arrivalStation"),
    departureTime: formData.get("departureTime"),
    arrivalTime: formData.get("arrivalTime"),
  });
  if (!validationFields.success) {
    const error = validationFields.error.flatten();
    return {
      error: {
        number: error.fieldErrors.number?.[0] || "",
        name: error.fieldErrors.name?.[0] || "",
        type: error.fieldErrors.type?.[0] || "",
        departureStation: error.fieldErrors.departureStation?.[0] || "",
        arrivalStation: error.fieldErrors.arrivalStation?.[0] || "",
        departureTime: error.fieldErrors.departureTime?.[0] || "",
        arrivalTime: error.fieldErrors.arrivalTime?.[0] || "",
      },
    };
  }

  const response = await fetch(`${BACKEND_URL}/train`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validationFields.data),
  });

  if (response.ok) {
    revalidatePath("/schedule");
  } else {
    return {
      message:
        response.status === 409
          ? "Train number already exists"
          : response.statusText,
    };
  }
}

export async function deleteTrainAction(
  _: unknown,
  formData: FormData
): Promise<{ success?: boolean; message?: string }> {
  const id = formData.get("id");

  if (!id || typeof id !== "string") {
    return { message: "Invalid train ID" };
  }

  try {
    const res = await fetch(`${BACKEND_URL}/train/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const msg = await res.text();
      return { message: msg };
    }

    revalidatePath("/schedule");
    return { success: true };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return { message: "Failed to delete train: " + message };
  }
}

export async function editTrainAction(
  _: TrainFormState,
  formData: FormData
): Promise<TrainFormState> {
  const values = Object.fromEntries(formData.entries());

  const id = values.id;
  if (!id || typeof id !== "string") {
    return { message: "Invalid train ID" };
  }

  const validated = TrainFormSchema.safeParse(values);
  if (!validated.success) {
    const error = validated.error.flatten().fieldErrors;
    return {
      error: {
        number: error.number?.[0] || "",
        name: error.name?.[0] || "",
        type: error.type?.[0] || "",
        departureStation: error.departureStation?.[0] || "",
        arrivalStation: error.arrivalStation?.[0] || "",
        departureTime: error.departureTime?.[0] || "",
        arrivalTime: error.arrivalTime?.[0] || "",
      },
    };
  }

  const res = await fetch(`${BACKEND_URL}/train/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validated.data),
  });

  if (res.ok) {
    revalidatePath("/schedule");
  } else {
    return {
      message: "Failed to update train. Please try again.",
    };
  }
}

export async function updateTrainField(
  _: unknown,
  formData: FormData
): Promise<{ success?: boolean; message?: string }> {
  const id = formData.get("id");
  const key = formData.get("key");
  const value = formData.get("value");

  if (
    !id ||
    typeof id !== "string" ||
    typeof key !== "string" ||
    typeof value !== "string"
  ) {
    return { message: "Invalid update input." };
  }

  const res = await fetch(`${BACKEND_URL}/train/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [key]: value }),
  });

  if (res.ok) {
    revalidatePath("/schedule");
    const msg = await res.text();
    return { message: msg || "Failed to update field" };
  } else {
    return {
      message: "Failed to update field. Please try again.",
    };
  }
}
