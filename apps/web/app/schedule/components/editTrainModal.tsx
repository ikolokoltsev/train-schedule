"use client";

import { editTrainAction } from "@/lib/actions/train";
import { TrainFormValues } from "@/lib/type";
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

type Props = {
  initialValues: TrainFormValues & { id: number };
};

const toLocalDateTimeString = (isoString: string) => {
  const date = new Date(isoString);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().slice(0, 16);
};

export function EditTrainModal({ initialValues }: Props) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(editTrainAction, undefined);

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
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Train</DialogTitle>
        </DialogHeader>

        {state?.message && (
          <p className="text-red-500 text-sm">{state.message}</p>
        )}

        <form
          action={async (formData) => {
            await formAction(formData);
            setOpen(false);
          }}
          className="space-y-4"
        >
          <input type="hidden" name="id" value={initialValues.id} />

          {trainFields.map(({ name, label }) => (
            <div key={name}>
              <Label htmlFor={name}>{label}</Label>
              <Input
                id={name}
                name={name}
                defaultValue={initialValues[name as keyof TrainFormValues]}
                required
              />
            </div>
          ))}

          <div>
            <Label htmlFor="departureTime">Departure Time</Label>
            <Input
              id="departureTime"
              name="departureTime"
              type="datetime-local"
              defaultValue={toLocalDateTimeString(initialValues.departureTime)}
              required
            />
          </div>

          <div>
            <Label htmlFor="arrivalTime">Arrival Time</Label>
            <Input
              id="arrivalTime"
              name="arrivalTime"
              type="datetime-local"
              defaultValue={toLocalDateTimeString(initialValues.arrivalTime)}
              required
            />
          </div>

          <Button type="submit">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
