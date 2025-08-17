import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" style={{ padding: '1rem 2rem' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home" style={{ 
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700, 
            fontSize: '1.5rem',
            color: 'var(--primary-color)' 
        }}>
          Socially
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/mybookings" style={{ fontWeight: 500 }}>
                    My Registrations
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  {/* --- THIS IS THE CORRECTED ELEMENT --- */}
                  {/* Changed from <a> to <button> for accessibility and to resolve the warning */}
                  <button 
                    className="nav-link dropdown-toggle btn btn-link" 
                    id="navbarDropdown" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false" 
                    style={{ fontWeight: 500, textDecoration: 'none' }}
                  >
                     Welcome, {user.name}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    {user.isAdmin && (
                      <li><Link className="dropdown-item" to="/admin">Admin Panel</Link></li>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register" style={{ fontWeight: 500 }}>
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

