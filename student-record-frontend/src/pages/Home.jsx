import StudentTable from "../components/StudentTable";

export default function Home() {
  return (
    <div className="p-6">
      <h2 className="text-3xl text-blue-600 font-bold text-center">
        Welcome to Student Management System
      </h2>

      <StudentTable />
    </div>
  );
}
