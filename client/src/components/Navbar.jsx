import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Try to scroll to an element with the given id; if it does not exist, navigate to the route
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // No element on the current page — navigate to the matching route (e.g., /about)
    navigate(`/${id}`);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#1a1a1a] text-white shadow-xl sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() =>
              location.pathname === "/"
                ? scrollToSection("home")
                : navigate("/")
            }
            className="text-2xl font-bold text-white hover:text-orange-500 transition-colors"
          >
            Portfolio
          </button>

          <div className="hidden md:flex space-x-1">
            {location.pathname === "/" ? (
              <>
                <button
                  onClick={() => navigate("/")}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-orange-500 transition-all duration-300"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-orange-500 transition-all duration-300"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-orange-500 transition-all duration-300"
                >
                  Projects
                </button>
                <button
                  onClick={() => scrollToSection("skills")}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-orange-500 transition-all duration-300"
                >
                  Skills
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-orange-500 transition-all duration-300"
                >
                  Contacts
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/");
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }, 150);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-orange-500 transition-all duration-300"
                >
                  Home
                </button>
                <button
                  onClick={() => navigate("/about")}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive("/about")
                      ? "text-orange-500"
                      : "text-gray-400 hover:text-orange-500"
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => navigate("/projects")}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive("/projects")
                      ? "text-orange-500"
                      : "text-gray-400 hover:text-orange-500"
                  }`}
                >
                  Projects
                </button>
                <button
                  onClick={() => navigate("/skills")}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive("/skills")
                      ? "text-orange-500"
                      : "text-gray-400 hover:text-orange-500"
                  }`}
                >
                  Skills
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive("/contact")
                      ? "text-orange-500"
                      : "text-gray-400 hover:text-orange-500"
                  }`}
                >
                  Contacts
                </button>
              </>
            )}

            {/* 🔐 Admin Links */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin"
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-all duration-300"
                >
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-red-500 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/admin/login"
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-orange-500 transition-all duration-300"
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
