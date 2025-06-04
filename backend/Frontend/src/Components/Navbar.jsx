import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
  },);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center gap-2">
          🍽️ <span>DeepNet</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-lg font-medium">
          {isLoggedIn ? (
            <>
              <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
              <Link to="/menu" className="hover:text-yellow-300 transition">Menu</Link>
              <Link to="/editmenu" className="hover:text-yellow-300 transition"> Edit Menu</Link>
              <Link to="/contact" className="hover:text-yellow-300 transition">Contact Us</Link>
              <button onClick={handleLogout} className="hover:text-yellow-300 transition">Logout</button>
            </>
          ) : (
            <>
              <Link to="/signup" className="hover:text-yellow-300 transition">Sign Up</Link>
              <Link to="/login" className="hover:text-yellow-300 transition">Login</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mx-4 mt-2 mb-4 px-6 py-4 flex flex-col space-y-4 text-lg font-medium bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white rounded-xl shadow-2xl ring-1 ring-gray-700">
          {isLoggedIn ? (
            <>
              <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-yellow-300">Home</Link>
              <Link to="/menu" onClick={() => setIsOpen(false)} className="hover:text-yellow-300">Menu</Link>
               <Link to="/editmenu" onClick={() => setIsOpen(false)} className="hover:text-yellow-300">EditMenu</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-yellow-300">Contact Us</Link>
              <button onClick={() => { setIsOpen(false); handleLogout(); }} className="text-left hover:text-yellow-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/signup" onClick={() => setIsOpen(false)} className="hover:text-yellow-300">Sign Up</Link>
              <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-yellow-300">Login</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
