import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition-colors ${
      isActive ? "bg-orange-500 text-white" : "text-gray-300 hover:bg-gray-700"
    }`;

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1 bg-gray-800 rounded-2xl p-6 border border-gray-700 h-full">
            <h2 className="text-2xl font-bold mb-6">Admin</h2>
            <nav className="space-y-2">
              <NavLink to="/admin" end className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/admin/projects" className={linkClass}>
                Manage Projects
              </NavLink>
              <NavLink to="/admin/skills" className={linkClass}>
                Manage Skills
              </NavLink>
              <NavLink to="/admin/bio" className={linkClass}>
                Manage Bio
              </NavLink>
              <NavLink to="/admin/contacts" className={linkClass}>
                View Contacts
              </NavLink>
            </nav>

            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          </aside>

          <section className="md:col-span-3">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <Outlet />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
