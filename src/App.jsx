
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StudentDashboard from './pages/StudentManagement';
import CourseListingPage from './pages/CourseListingPage';
import LabDetailPage from './pages/LabDetailPage';
import TaskPanel from './pages/TaskPanel';
import MCQTestPage from './pages/MCQTestPage';
import AdminDashboard from './pages/AdminDashboard';
import CreateRoomWizard from './pages/CreateRoomWizard';
import FileManager from './pages/FileManager';
import StudentManagement from './pages/StudentManagement';
import GradingPanel from './pages/GradingPanel';
import CertificatePage from './pages/CertificatePage';
import ProfilePage from './pages/ProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';
import HomePage from './pages/HomePage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'student' or 'instructor'
  const [theme, setTheme] = useState('dark'); // light | dark
  
  useEffect(() => {
    // Check if user is logged in (in a real app, this would check localStorage or cookies)
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('userRole');
    
    setIsAuthenticated(loggedInStatus);
    setUserRole(role);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <Router>
      <div className="app-container">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          userRole={userRole} 
          onLogout={handleLogout} 
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/courses" element={<CourseListingPage />} />
            <Route path="/lab/:id" element={<LabDetailPage />} />
            
            {/* Student Routes */}
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <StudentDashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/task/:id" 
              element={isAuthenticated ? <TaskPanel /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/mcq/:id" 
              element={isAuthenticated ? <MCQTestPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/certificate" 
              element={isAuthenticated ? <CertificatePage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/profile" 
              element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/leaderboard" 
              element={isAuthenticated ? <LeaderboardPage /> : <Navigate to="/login" />} 
            />
            
            {/* Instructor/Admin Routes */}
            <Route 
              path="/admin" 
              element={isAuthenticated && userRole === 'instructor' ? <AdminDashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/create-room" 
              element={isAuthenticated && userRole === 'instructor' ? <CreateRoomWizard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/file-manager" 
              element={isAuthenticated && userRole === 'instructor' ? <FileManager /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/student-management" 
              element={isAuthenticated && userRole === 'instructor' ? <StudentManagement /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/grading" 
              element={isAuthenticated && userRole === 'instructor' ? <GradingPanel /> : <Navigate to="/login" />} 
            />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;