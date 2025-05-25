"use server";
import { revalidatePath } from "next/cache";
import { BACKEND_URL } from "../constant";
import { Train, TrainFormSchema, TrainFormState } from "../type";

export async function getAllTrains(): Promise<Train[]> {
  const response = await fetch(`${BACKEND_URL}/train`, {
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Failed to fetch trains");
  return response.json();
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
