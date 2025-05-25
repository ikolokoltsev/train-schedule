"use client";

import { TrainFormValues } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TrainFormValues>[] = [
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
];
