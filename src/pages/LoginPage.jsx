
import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Simple validation for demo
      if (email && password) {
        onLogin(role);
        navigate(role === 'instructor' ? '/admin' : '/dashboard');
      } else {
        setError('Please enter valid credentials');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login to Your Account</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Login As</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === 'student'}
                  onChange={() => setRole('student')}
                />
                Student
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="role"
                  value="instructor"
                  checked={role === 'instructor'}
                  onChange={() => setRole('instructor')}
                />
                Instructor
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          <p><Link to="/forgot-password">Forgot password?</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;