import { useEffect, useState } from "react";
import { getStudents, addStudent, updateStudent, deleteStudent } from "../services/studentService";
import Navbar from "../components/Navbar";

export default function AdminPanel() {
  const [students, setStudents] = useState([]);
  
  const loadStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Admin Dashboard</h1>
        
        {/* Student Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Course</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s._id} className="border-b">
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">{s.course}</td>
                  <td className="p-3 space-x-2">
                    <button className="bg-yellow-400 px-3 py-1 rounded">Edit</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
