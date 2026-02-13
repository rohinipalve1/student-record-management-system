import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import Alert from "../components/Alert";
import { addStudent } from "../services/studentService";

export default function AddStudent() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    addStudent(data).then(() => {
      setMsg("Student added successfully!");
      setTimeout(() => navigate("/"), 1500);
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        Add New Student
      </h2>

      <Alert message={msg} />
      <StudentForm onSubmit={handleSubmit} buttonText="Add Student" />
    </div>
  );
}
