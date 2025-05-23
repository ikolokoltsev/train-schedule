import { getAllTrains } from "@/lib/train";
import { columns } from "./columns";
import { DataTable } from "./dataTable";

export default async function SchedulePage() {
  const trains = await getAllTrains();

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Train Schedule</h1>
        <DataTable columns={columns} data={trains} />
      </div>
    </div>
  );
}
