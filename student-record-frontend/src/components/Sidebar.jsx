import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-blue-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <nav className="space-y-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive ? "bg-blue-700" : "hover:bg-blue-700"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/students"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive ? "bg-blue-700" : "hover:bg-blue-700"
            }`
          }
        >
          Students
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive ? "bg-blue-700" : "hover:bg-blue-700"
            }`
          }
        >
          Reports
        </NavLink>
      </nav>
    </div>
  );
}
