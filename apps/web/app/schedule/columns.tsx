"use client";

import { Train } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteTrainButton } from "./components/deleteTrainButton";
import { EditTrainModal } from "./components/editTrainModal";
import { UpdateTrainField } from "./components/updateTrainField";

export const columns: ColumnDef<Train>[] = [
  {
    accessorKey: "number",
    header: "Number",
    cell: ({ row }) => {
      const train = row.original;
      return (
        <UpdateTrainField id={train.id} field="number" value={train.number} />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const train = row.original;
      return <UpdateTrainField id={train.id} field="name" value={train.name} />;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const train = row.original;
      return <UpdateTrainField id={train.id} field="type" value={train.type} />;
    },
  },
  {
    accessorKey: "departureStation",
    header: "Departure Station",
    cell: ({ row }) => {
      const train = row.original;
      return (
        <UpdateTrainField
          id={train.id}
          field="departureStation"
          value={train.departureStation}
        />
      );
    },
  },
  {
    accessorKey: "arrivalStation",
    header: "Arrival Station",
    cell: ({ row }) => {
      const train = row.original;
      return (
        <UpdateTrainField
          id={train.id}
          field="arrivalStation"
          value={train.arrivalStation}
        />
      );
    },
  },
  {
    accessorKey: "departureTime",
    header: "Departure Time",
    cell: ({ row }) => {
      const train = row.original;
      const formattedDateTime = new Date(train.departureTime)
        .toISOString()
        .slice(0, 16);
      return (
        <UpdateTrainField
          id={train.id}
          field="departureTime"
          value={formattedDateTime}
          type="datetime-local"
        />
      );
    },
  },
  {
    accessorKey: "arrivalTime",
    header: "Arrival Time",
    cell: ({ row }) => {
      const train = row.original;
      const formattedDateTime = new Date(train.departureTime)
        .toISOString()
        .slice(0, 16);
      return (
        <UpdateTrainField
          id={train.id}
          field="arrivalTime"
          value={formattedDateTime}
          type="datetime-local"
        />
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const train = row.original;
      return (
        <div className="flex items-center gap-4">
          <EditTrainModal initialValues={train} />
          <DeleteTrainButton id={train.id} number={train.number} />
        </div>
      );
    },
  },
];
