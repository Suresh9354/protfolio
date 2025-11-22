const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white py-8 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Portfolio Website. All rights
          reserved.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Built with React, Express, MongoDB, and Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
