import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">
        Student Record Management
      </h2>

      <div className="space-x-4">
        <button
          onClick={() => {
            console.log("TOKEN:", localStorage.getItem("token"));
            navigate("/dashboard");
          }}
          className="hover:underline"
        >
          Students
        </button>

        <button
          onClick={() => navigate("/reports")}
          className="hover:underline"
        >
          Reports
        </button>

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
