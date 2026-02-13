import { useEffect, useState } from "react";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent
} from "../services/studentService";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Students() {
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
    setForm({
      name: s.name,
      email: s.email,
      course: s.course
    });
    setEditId(s._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this student?")) {
      await deleteStudent(id);
      loadStudents();
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />

        <div className="flex-1 bg-gray-100 p-6">
          <h1 className="text-3xl font-bold text-blue-700 mb-6">
            Students Management
          </h1>

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
                required
              />
              <input
                className="w-full border p-2 rounded"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
              <input
                className="w-full border p-2 rounded"
                placeholder="Course"
                value={form.course}
                onChange={(e) =>
                  setForm({ ...form, course: e.target.value })
                }
                required
              />

              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                {editId ? "Update Student" : "Add Student"}
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
                        onClick={() => handleDelete(s._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center p-6">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
