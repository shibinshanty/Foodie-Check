



const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-bold">🍽️ Foodie Check</h2>
          <p className="text-sm text-gray-400">Serving the details of Menu and its Items</p>
        </div>

        <div className="flex space-x-6 text-sm">
          <a href="#privacy" className="hover:text-yellow-300 transition">Privacy Policy</a>
          <a href="#terms" className="hover:text-yellow-300 transition">Terms of Service</a>
          <a href="#help" className="hover:text-yellow-300 transition">Help</a>
        </div>
      </div>

      <div className="text-center mt-4 text-gray-500 text-xs">
        © {new Date().getFullYear()} Foodie Check. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
