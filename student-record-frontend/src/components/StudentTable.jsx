import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../services/studentService";
import { useNavigate } from "react-router-dom";

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const loadStudents = () => {
    getStudents().then((res) => setStudents(res.data));
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      deleteStudent(id).then(() => {
        loadStudents(); // refresh table
      });
    }
  };

  return (
    <table className="w-full mt-6 border">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="border p-2">Name</th>
          <th className="border p-2">Roll</th>
          <th className="border p-2">Department</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.map((s) => (
          <tr key={s._id} className="text-center">
            <td className="border p-2">{s.name}</td>
            <td className="border p-2">{s.roll}</td>
            <td className="border p-2">{s.department}</td>
            <td className="border p-2 space-x-2">
              <button
                onClick={() => navigate(`/edit/${s._id}`)}
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
      </tbody>
    </table>
  );
}
