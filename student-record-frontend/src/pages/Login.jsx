import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);

      if (res.data.role) {
        localStorage.setItem("role", res.data.role);
      }

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid Email or Password ❌");
    }
  };

  return (
    <div className="min-h-screen flex">
      
      {/* LEFT SIDE (Brand / Image) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-700 to-indigo-800 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">
          Student Record System
        </h1>
        <p className="text-lg text-center opacity-90">
          Manage students, reports and records<br />
          with a professional admin panel
        </p>
      </div>

      {/* RIGHT SIDE (LOGIN FORM) */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-10 rounded-xl shadow-2xl w-96"
        >
          <h2 className="text-3xl font-bold mb-2 text-center text-blue-700">
            Admin Login
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Welcome back 👋
          </p>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-xs text-gray-400 text-center mt-6">
            © 2026 Student Record Management
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
