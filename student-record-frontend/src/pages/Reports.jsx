import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Reports() {
  const [students, setStudents] = useState([]);
  const token = localStorage.getItem("token");

  const loadStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(res.data);
    } catch (err) {
      alert("Failed to load students");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/students/${id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(
        students.map((s) =>
          s._id === id ? { ...s, status: res.data.status } : s
        )
      );
    } catch (err) {
      alert("Update failed");
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          Student Reports
        </h1>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Course</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id} className="border-b">
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.course}</td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleStatus(s._id, s.status)}
                      className={`px-3 py-1 rounded text-white font-semibold ${
                        s.status === "Active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {s.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
