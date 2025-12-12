
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, userRole, onLogout, theme, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="navbar glassy">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand-mark">
            <span className="brand-dot" />
            ExamLab
          </Link>
        </div>
        
        <button 
          className="navbar-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav className={`navbar-menu ${isMenuOpen ? 'is-open' : ''}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/courses" className="nav-link">Courses</Link>
            </li>
            <li className="nav-item">
              <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
            </li>
            
            {isAuthenticated && userRole === 'student' && (
              <>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/certificate" className="nav-link">Certificates</Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">Profile</Link>
                </li>
              </>
            )}
            
            {isAuthenticated && userRole === 'instructor' && (
              <>
                <li className="nav-item">
                  <Link to="/admin" className="nav-link">Admin</Link>
                </li>
                <li className="nav-item">
                  <Link to="/create-room" className="nav-link">Create Room</Link>
                </li>
                <li className="nav-item">
                  <Link to="/file-manager" className="nav-link">Files</Link>
                </li>
                <li className="nav-item">
                  <Link to="/student-management" className="nav-link">Students</Link>
                </li>
                <li className="nav-item">
                  <Link to="/grading" className="nav-link">Grading</Link>
                </li>
              </>
            )}
            
            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link highlight">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
          <div className="navbar-actions">
            <button 
              className="theme-toggle" 
              onClick={onToggleTheme} 
              aria-label="Toggle theme"
            >
              <span className="icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
              <span className="label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
            </button>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="nav-link btn-logout">
                Logout
              </button>
            ) : (
              <Link to="/signup" className="btn btn-primary btn-sm">Get Started</Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;