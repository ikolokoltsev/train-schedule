"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteTrainAction } from "@/lib/actions/train";
import { useActionState } from "react";

type Props = {
  id: number;
  number: string;
};

export function DeleteTrainButton({ id, number }: Props) {
  const [state, formAction] = useActionState(deleteTrainAction, undefined);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete train <strong>{number}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}

        <form action={formAction}>
          <input type="hidden" name="id" value={id} />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild className="bg-red-500 hover:bg-red-600">
              <Button variant={"destructive"} type="submit">
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
