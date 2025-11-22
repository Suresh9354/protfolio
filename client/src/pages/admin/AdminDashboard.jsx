import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-12 text-white">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/admin/projects"
            className="bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 group"
          >
            <div className="w-16 h-16 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition-colors">
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-orange-500 transition-colors">Manage Projects</h2>
            <p className="text-gray-400">Add, edit, or delete projects</p>
          </Link>

          <Link
            to="/admin/skills"
            className="bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 group"
          >
            <div className="w-16 h-16 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition-colors">
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-orange-500 transition-colors">Manage Skills</h2>
            <p className="text-gray-400">Add, edit, or delete skills</p>
          </Link>

          <Link
            to="/admin/bio"
            className="bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 group"
          >
            <div className="w-16 h-16 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition-colors">
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-orange-500 transition-colors">Manage Bio</h2>
            <p className="text-gray-400">Update your bio information</p>
          </Link>

          <Link
            to="/admin/contacts"
            className="bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 group"
          >
            <div className="w-16 h-16 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition-colors">
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-orange-500 transition-colors">View Contacts</h2>
            <p className="text-gray-400">View contact form submissions</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

