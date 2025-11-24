import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageProjects from "./pages/admin/ManageProjects";
import ManageSkills from "./pages/admin/ManageSkills";
import ManageBio from "./pages/admin/ManageBio";
import ViewContacts from "./pages/admin/ViewContacts";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "projects", element: <Projects /> },
        { path: "skills", element: <Skills /> },
        { path: "contact", element: <Contact /> },
        { path: "admin/login", element: <AdminLogin /> },
        {
          path: "admin",
          element: (
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          ),
          children: [
            { index: true, element: <AdminDashboard /> },
            { path: "projects", element: <ManageProjects /> },
            { path: "skills", element: <ManageSkills /> },
            { path: "bio", element: <ManageBio /> },
            { path: "contacts", element: <ViewContacts /> },
          ],
        },
      ],
    },
  ],
  {
    // Opt into the v7 behavior for relative splat path resolution to silence the warning
    future: { v7_relativeSplatPath: true },
  }
);

export default router;
