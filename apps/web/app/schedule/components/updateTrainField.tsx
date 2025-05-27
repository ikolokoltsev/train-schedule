"use client";
import { Input } from "@/components/ui/input";
import { updateTrainField } from "@/lib/actions/train";
import { Loader2 } from "lucide-react";
import { useActionState, useState } from "react";

type Props = {
  id: number;
  field: string;
  value: string;
  type?: "text" | "datetime-local";
};

export function UpdateTrainField({ id, field, value, type = "text" }: Props) {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [state, action, isPending] = useActionState(
    updateTrainField,
    undefined
  );

  const handleBlur = async () => {
    if (tempValue !== value) {
      const formData = new FormData();
      formData.append("id", id.toString());
      formData.append("key", field);
      formData.append("value", tempValue);

      await action(formData);
    }
    setEditing(false); // always close after attempt
  };

  return (
    <>
      {editing ? (
        <form action={action}>
          <input type="hidden" name="id" value={id.toString()} />
          <input type="hidden" name="key" value={field} />
          <Input
            name="value"
            type={type}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                (e.target as HTMLInputElement).blur();
              } else if (e.key === "Escape") {
                setTempValue(value);
                setEditing(false);
              }
            }}
            disabled={isPending}
            autoFocus
            className="h-8 text-sm"
          />
        </form>
      ) : (
        <button
          className="text-left text-sm w-full truncate hover:underline"
          onClick={() => setEditing(true)}
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            value || "—"
          )}
        </button>
      )}
    </>
  );
}
