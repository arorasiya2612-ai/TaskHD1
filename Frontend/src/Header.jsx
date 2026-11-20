
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { useAuth } from "./AuthContext";
import LogoutButton from "./route/LogoutButton";
import { useTheme } from "./ThemeContext";

function Header() {
  const { user, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const isAdmin = user?.role === "admin";
  const isLoggedIn = Boolean(user);

  // Close the mobile menu when the page changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar site-header">
      <div className="site-header-inner">

        {/* Website Logo */}
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            DEV@Deakin
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

        {/* Navigation Links */}
        <nav
          id="main-navigation"
          className={`nav-actions site-nav ${
            menuOpen ? "is-open" : ""
          }`}
          aria-label="Main navigation"
        >
          {/* Theme Toggle */}
          <button
            type="button"
            className="post-button theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } theme`}
            title="Toggle light and dark theme"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {/* Available to Everyone */}
          <Link
            to="/browse"
            className="post-button"
            onClick={closeMenu}
          >
            Browse Posts
          </Link>

          {/* Logged-in Regular Users */}
          {!loading && isLoggedIn && !isAdmin && (
            <>
              <Link
                to="/opportunities"
                className="post-button"
                onClick={closeMenu}
              >
                Careers
              </Link>

              <Link
                to="/dashboard"
                className="post-button"
                onClick={closeMenu}
              >
                My Dashboard
              </Link>

              <Link
                to="/post"
                className="post-button"
                onClick={closeMenu}
              >
                Post
              </Link>

              <Link
                to="/pricing"
                className="post-button"
                onClick={closeMenu}
              >
                Pricing
              </Link>
            </>
          )}

          {/* Admin Users */}
          {!loading && isAdmin && (
            <Link
              to="/admin"
              className="post-button"
              onClick={closeMenu}
            >
              Admin Dashboard
            </Link>
          )}

          {/* Login / Logout */}
          {!loading &&
            (isLoggedIn ? (
              <div
                className="nav-logout"
                onClick={closeMenu}
              >
                <LogoutButton />
              </div>
            ) : (
              <Link
                to="/login"
                className="post-button login-link"
                onClick={closeMenu}
              >
                Login
              </Link>
            ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
