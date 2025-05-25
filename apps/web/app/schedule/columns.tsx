"use client";

import { Train } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteTrainButton } from "./components/deleteTrainButton";

export const columns: ColumnDef<Train>[] = [
  { accessorKey: "number", header: "Number" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "departureStation", header: "Departure Station" },
  { accessorKey: "arrivalStation", header: "Arrival Station" },
  {
    accessorKey: "departureTime",
    header: "Departure Time",
    cell: ({ row }) =>
      new Date(row.original.departureTime).toLocaleString("en-GB", {
        dateStyle: "short",
        timeStyle: "short",
      }),
  },
  {
    accessorKey: "arrivalTime",
    header: "Arrival Time",
    cell: ({ row }) =>
      new Date(row.original.arrivalTime).toLocaleString("en-GB", {
        dateStyle: "short",
        timeStyle: "short",
      }),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const train = row.original;
      return <DeleteTrainButton id={train.id} number={train.number} />;
    },
  },
];
