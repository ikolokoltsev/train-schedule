"use client";

import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { addTrain } from "@/lib/actions/train";
import { TrainFormState } from "@/lib/type";

export function AddTrainModal() {
  const [open, setOpen] = useState(false);
  const [state, action] = useActionState<TrainFormState, FormData>(
    addTrain,
    undefined
  );

  const trainFields = [
    { name: "number", label: "Train Number" },
    { name: "name", label: "Name" },
    { name: "type", label: "Type" },
    { name: "departureStation", label: "Departure Station" },
    { name: "arrivalStation", label: "Arrival Station" },
  ] as const;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">+ Add Train</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Train</DialogTitle>
        </DialogHeader>

        {state?.error && (
          <div className="text-red-500 text-sm">
            {typeof state.error === "string"
              ? state.error
              : Object.values(state.error).map((err, idx) => (
                  <div key={idx}>{err}</div>
                ))}
          </div>
        )}

        <form
          action={async (formData: FormData) => {
            await action(formData);
            setOpen(false);
          }}
          className="space-y-4"
        >
          {trainFields.map(({ name, label }) => (
            <div key={name}>
              <Label htmlFor={name}>{label}</Label>
              <Input id={name} name={name} required />
            </div>
          ))}

          <div>
            <Label htmlFor="departureTime">Departure Time</Label>
            <Input
              id="departureTime"
              name="departureTime"
              type="datetime-local"
              required
            />
          </div>

          <div>
            <Label htmlFor="arrivalTime">Arrival Time</Label>
            <Input
              id="arrivalTime"
              name="arrivalTime"
              type="datetime-local"
              required
            />
          </div>

          <Button type="submit">Add Train</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
