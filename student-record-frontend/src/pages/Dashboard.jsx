import { useEffect, useState } from "react";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent
} from "../services/studentService";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", course: "" });
  const [editId, setEditId] = useState(null);

  const loadStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateStudent(editId, form);
      setEditId(null);
    } else {
      await addStudent(form);
    }
    setForm({ name: "", email: "", course: "" });
    loadStudents();
  };

  const handleEdit = (s) => {
    setForm(s);
    setEditId(s._id);
  };

  return (
    <>
      <Navbar />

      <div className="flex">
        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-gray-100 p-6">
          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Students"
              value={students.length}
              color="bg-blue-600"
            />
            <StatCard
              title="Courses"
              value={[...new Set(students.map(s => s.course))].length}
              color="bg-green-600"
            />
            <StatCard
              title="Admins"
              value="1"
              color="bg-purple-600"
            />
          </div>

          {/* FORM */}
          <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mb-10">
            <h2 className="text-xl font-semibold mb-4">
              {editId ? "Update Student" : "Add Student"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                className="w-full border p-2 rounded"
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
              <input
                className="w-full border p-2 rounded"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
              <input
                className="w-full border p-2 rounded"
                placeholder="Course"
                value={form.course}
                onChange={(e) =>
                  setForm({ ...form, course: e.target.value })
                }
              />

              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                {editId ? "Update" : "Add"}
              </button>
            </form>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Course</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id} className="border-b">
                    <td className="p-3">{s.name}</td>
                    <td className="p-3">{s.email}</td>
                    <td className="p-3">{s.course}</td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleEdit(s)}
                        className="bg-yellow-400 px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          deleteStudent(s._id).then(loadStudents)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
