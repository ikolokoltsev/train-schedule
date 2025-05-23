import { BACKEND_URL } from "./constant";

// lib/train.ts
export type Train = {
  id: number;
  number: string;
  name: string;
  type: string;
  departureStation: string;
  arrivalStation: string;
  departureTime: string;
  arrivalTime: string;
};

export async function getAllTrains(): Promise<Train[]> {
  const res = await fetch(`${BACKEND_URL}/train`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch trains");
  return res.json();
}
