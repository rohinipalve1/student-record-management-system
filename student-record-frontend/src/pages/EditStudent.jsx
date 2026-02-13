import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import Alert from "../components/Alert";
import { getStudents, updateStudent } from "../services/studentService";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getStudents().then((res) => {
      const found = res.data.find((s) => s._id === id);
      setStudent(found);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    updateStudent(id, data).then(() => {
      setMsg("Student updated successfully!");
      setTimeout(() => navigate("/"), 1500);
    });
  };

  if (!student) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        Edit Student
      </h2>

      <Alert message={msg} />
      <StudentForm
        student={student}
        onSubmit={handleSubmit}
        buttonText="Update Student"
      />
    </div>
  );
}
