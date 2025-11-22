import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProjects from './pages/admin/ManageProjects';
import ManageSkills from './pages/admin/ManageSkills';
import ManageBio from './pages/admin/ManageBio';
import ViewContacts from './pages/admin/ViewContacts';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/projects"
                element={
                  <ProtectedRoute>
                    <ManageProjects />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/skills"
                element={
                  <ProtectedRoute>
                    <ManageSkills />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/bio"
                element={
                  <ProtectedRoute>
                    <ManageBio />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/contacts"
                element={
                  <ProtectedRoute>
                    <ViewContacts />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

