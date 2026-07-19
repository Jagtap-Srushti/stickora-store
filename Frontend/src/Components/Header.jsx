import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faTags,
  faSun,
  faMoon,
  faAngleDown,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../store/cart-context";
import { useAuth } from "../store/auth-context";
import { toast } from "react-toastify";

export default function Header() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  });

  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const userMenuRef = useRef();
  const navigate = useNavigate();

  const toggleAdminMenu = () => setAdminMenuOpen((prev) => !prev);
  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const { totalQuantity } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const isAdmin = user?.roles?.includes("ROLE_ADMIN");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setAdminMenuOpen(false);
    setUserMenuOpen(false);
    setIsMobileMenuOpen(false);

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
        setAdminMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [theme, location.pathname]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    toast.success("Logged out successfully!");
    navigate("/home");
  };

  // NavLink layout configurations with explicit active state transitions
  const navLinkClass =
    "relative px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 text-gray-600 dark:text-lighter/80 hover:text-primary dark:hover:text-light rounded-xl hover:bg-lighter dark:hover:bg-cardbg-dark/50 hover:-translate-y-0.5";

  const activeNavLinkClass =
    "relative px-4 py-2 text-sm font-bold tracking-wide transition-all duration-300 text-primary dark:text-light rounded-xl bg-lighter dark:bg-primary/20 shadow-xs scale-102";

  const dropdownLinkClass =
    "block w-full text-left px-4 py-2.5 text-sm font-semibold transition-all duration-200 text-gray-700 dark:text-lighter/90 hover:bg-lighter dark:hover:bg-cardbg-dark hover:text-primary dark:hover:text-light first:rounded-t-xl last:rounded-b-xl transform hover:pl-5";

  return (
    <header className="sticky top-0 z-50 border-b border-light/40 dark:border-border-dark bg-cardbg-light/80 dark:bg-darkbg/80 backdrop-blur-md transition-all duration-300 shadow-premium">
      <div className="relative flex items-center justify-between mx-auto max-w-[1152px] px-4 sm:px-6 py-3 font-primary">

        {/* Brand Identity / Logo */}
        <Link to="/" className="flex items-center gap-2 group z-10">
          <div className="p-2.5 bg-gradient-to-tr from-primary to-primary-hover rounded-xl shadow-md transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-premium-hover">
            <FontAwesomeIcon icon={faTags} className="h-4 w-4 text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-dark dark:text-white transition-all duration-300 group-hover:translate-x-1 bg-gradient-to-r from-dark to-primary dark:from-white dark:to-light bg-clip-text">
            Stickora
          </span>
        </Link>

        {/* Desktop Navigation Links - ABSOLUTE CENTERED */}
        <nav className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2 z-0">
          <ul className="flex items-center gap-1">
            <li>
              <NavLink to="/home" className={({ isActive }) => (isActive ? activeNavLinkClass : navLinkClass)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? activeNavLinkClass : navLinkClass)}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? activeNavLinkClass : navLinkClass)}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Action Controls Side Wrapper */}
        <div className="flex items-center gap-2.5 z-10">
          
          {/* Dark Mode Switcher */}
          <button
            className="group relative overflow-hidden flex items-center justify-center w-10 h-10 rounded-xl border border-light/60 dark:border-border-dark text-gray-500 dark:text-lighter/60 transition-all duration-300 hover:bg-lighter dark:hover:bg-cardbg-dark hover:text-primary dark:hover:text-light hover:-translate-y-0.5 cursor-pointer active:scale-90"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <div className="transition-transform duration-500 ease-out group-hover:rotate-45">
              <FontAwesomeIcon icon={theme === "dark" ? faMoon : faSun} className="w-4 h-4" />
            </div>
          </button>

          {/* Shopping Cart Indicator */}
          <Link
            to="/cart"
            className="group relative flex items-center justify-center w-10 h-10 rounded-xl border border-light/60 dark:border-border-dark text-gray-500 dark:text-lighter/60 transition-all duration-300 hover:bg-lighter dark:hover:bg-cardbg-dark hover:text-primary dark:hover:text-light hover:-translate-y-0.5 active:scale-95"
          >
            <div className="transition-transform duration-300 ease-out group-hover:scale-110">
              <FontAwesomeIcon icon={faShoppingBasket} className="w-4 h-4" />
            </div>

            {totalQuantity > 0 && (
              <span
                key={`cart-badge-${totalQuantity}`}
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-black text-white ring-4 ring-cardbg-light dark:ring-darkbg shadow-md animate-ui-pop"
              >
                <span className="leading-none block transform translate-y-[0.5px]">
                  {totalQuantity}
                </span>
              </span>
            )}
          </Link>

          {/* User Dropdown Gate */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center gap-2.5 pl-2.5 pr-3.5 py-1.5 rounded-xl border border-light/60 dark:border-border-dark text-gray-700 dark:text-lighter bg-lighter/40 dark:bg-cardbg-dark/40 hover:bg-lighter dark:hover:bg-cardbg-dark hover:border-light dark:hover:border-gray-600 transition-all duration-300 text-sm font-semibold cursor-pointer active:scale-95"
                >
                  <div className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center text-[11px] font-extrabold transition-transform duration-300 group-hover:rotate-12 shadow-sm">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="tracking-wide max-w-[90px] truncate">
                    {user?.name || "User"}
                  </span>
                  <FontAwesomeIcon icon={faAngleDown} className={`w-3 h-3 text-gray-400/80 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu Box */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-cardbg-light dark:bg-cardbg-dark border border-light/50 dark:border-border-dark rounded-xl shadow-premium z-50 origin-top-right animate-ui-pop">
                    <div className="py-1">
                      <Link to="/profile" className={dropdownLinkClass}>Profile</Link>
                      <Link to="/orders" className={dropdownLinkClass}>Orders</Link>

                      {isAdmin && (
                        <div className="border-t border-b border-light/30 dark:border-border-dark/60 my-1 bg-lighter/20 dark:bg-darkbg/40 overflow-hidden">
                          <button
                            onClick={toggleAdminMenu}
                            className={`${dropdownLinkClass} flex items-center justify-between font-bold text-primary dark:text-light`}
                          >
                            <span>Admin Panel</span>
                            <FontAwesomeIcon icon={faAngleDown} className={`w-3 h-3 transition-transform duration-300 ${isAdminMenuOpen ? 'rotate-180' : ''}`} />
                          </button>

                          <div className={`transition-all duration-300 ease-in-out pl-3 pr-1 space-y-0.5 overflow-hidden ${isAdminMenuOpen ? 'max-h-40 opacity-100 py-1' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                            <Link to="/admin/orders" className={dropdownLinkClass}>Admin Orders</Link>
                            <Link to="/admin/messages" className={dropdownLinkClass}>Admin Messages</Link>
                          </div>
                        </div>
                      )}

                      <Link to="/home" onClick={handleLogout} className={`${dropdownLinkClass} text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20`}>
                        Logout
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="flex items-center justify-center px-5 py-2 text-sm font-bold text-white bg-primary hover:bg-primary-hover active:scale-95 rounded-xl transition-all duration-300 shadow-sm shadow-primary/20 hover:shadow-premium-hover transform hover:-translate-y-0.5">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Nav Toggle Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-light/60 dark:border-border-dark text-gray-500 dark:text-lighter/60 hover:bg-lighter dark:hover:bg-cardbg-dark cursor-pointer transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <div className="transition-transform duration-300 ease-out active:scale-75">
              <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>

      {/* Adaptive Mobile Full Dropdown Menu Container */}
      <div className={`md:hidden border-t border-light/40 dark:border-border-dark bg-cardbg-light dark:bg-darkbg px-4 shadow-2xl font-primary overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[500px] py-4 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'}`}>
        <nav className="flex flex-col space-y-1">
          <NavLink to="/home" className={({ isActive }) => `${isActive ? activeNavLinkClass : navLinkClass} block w-full`}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => `${isActive ? activeNavLinkClass : navLinkClass} block w-full`}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${isActive ? activeNavLinkClass : navLinkClass} block w-full`}>Contact</NavLink>
        </nav>

        <div className="pt-3 mt-3 border-t border-light/40 dark:border-border-dark">
          {isAuthenticated ? (
            <div className="space-y-1">
              <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-lighter/40">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                Account ({user?.name || "User"})
              </div>
              <Link to="/profile" className={navLinkClass + " block w-full"}>Profile</Link>
              <Link to="/orders" className={navLinkClass + " block w-full"}>Orders</Link>
              {isAdmin && (
                <>
                  <div className="px-3 pt-3 text-xs font-bold uppercase tracking-wider text-primary dark:text-light">Admin Workspace</div>
                  <Link to="/admin/orders" className={navLinkClass + " block w-full text-primary dark:text-light"}>Admin Orders</Link>
                  <Link to="/admin/messages" className={navLinkClass + " block w-full text-primary dark:text-light"}>Admin Messages</Link>
                </>
              )}
              <Link to="/home" onClick={handleLogout} className={navLinkClass + " block w-full text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20"}>
                Logout
              </Link>
            </div>
          ) : (
            <Link to="/login" className="block text-center w-full px-4 py-2.5 font-bold text-white bg-primary hover:bg-primary-hover rounded-xl transition-all duration-200 shadow-md">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}