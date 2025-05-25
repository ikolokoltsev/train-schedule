import { getAllTrains } from "@/lib/actions/train";
import { AddTrainModal } from "./addTrainModal";
import { columns } from "./columns";
import { DataTable } from "./dataTable";

export default async function SchedulePage() {
  const trains = await getAllTrains();

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Train Schedule</h1>
        <AddTrainModal />
        <DataTable columns={columns} data={trains} />
      </div>
    </div>
  );
}
