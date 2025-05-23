"use client";

import { Train } from "@/lib/train";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Train>[] = [
  {
    accessorKey: "number",
    header: "Number",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "departureStation",
    header: "Departure Station",
  },
  {
    accessorKey: "departureTime",
    header: "Departure Time",
    cell: ({ row }) => new Date(row.original.departureTime).toLocaleString(),
  },
  {
    accessorKey: "arrivalStation",
    header: "Arrival Station",
  },
  {
    accessorKey: "arrivalTime",
    header: "Arrival Time",
    cell: ({ row }) => new Date(row.original.arrivalTime).toLocaleString(),
  },
];
