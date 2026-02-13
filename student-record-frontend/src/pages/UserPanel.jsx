import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserPanel() {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const loadStudent = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudent(res.data);
    } catch (err) {
      alert("Failed to load your data");
    }
  };

  useEffect(() => {
    if (!token) navigate("/login");
    loadStudent();
  }, []);

  if (!student) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      <div className="bg-blue-700 text-white p-4 flex justify-between items-center rounded mb-6">
        <h2 className="text-xl font-semibold">User Panel</h2>
        <button
          onClick={logout}
          className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Welcome */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-blue-700">
          Welcome, {student.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here is your profile information.
        </p>
      </div>

      {/* Student Info Table */}
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Field</th>
              <th className="p-3">Information</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3 font-semibold">Name</td>
              <td className="p-3">{student.name}</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-semibold">Email</td>
              <td className="p-3">{student.email}</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-semibold">Course</td>
              <td className="p-3">{student.course}</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-semibold">ID</td>
              <td className="p-3">{student._id}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
