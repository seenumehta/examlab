
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats] = useState({
    totalStudents: 1250,
    activeCourses: 12,
    totalSubmissions: 3420,
    pendingGrading: 45
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulated API calls
    setTimeout(() => {
      setRecentActivities([
        { id: 1, type: 'submission', title: 'Lab 3 submitted by John Doe', course: 'Introduction to Cybersecurity', time: '5 minutes ago' },
        { id: 2, type: 'enrollment', title: '15 new students enrolled', course: 'Web Application Security', time: '1 hour ago' },
        { id: 3, type: 'grade', title: 'Graded 10 submissions', course: 'Penetration Testing Basics', time: '2 hours ago' },
        { id: 4, type: 'announcement', title: 'Posted new announcement', course: 'Network Security Fundamentals', time: '3 hours ago' }
      ]);

      setUpcomingExams([
        { id: 1, title: 'Midterm Exam', course: 'Introduction to Cybersecurity', date: '2023-11-20', time: '10:00 AM', enrolled: 234 },
        { id: 2, title: 'Quiz 3', course: 'Web Application Security', date: '2023-11-15', time: '2:00 PM', enrolled: 156 },
        { id: 3, title: 'Final Exam', course: 'Penetration Testing Basics', date: '2023-11-25', time: '9:00 AM', enrolled: 89 }
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h1 className="page-title">Admin Dashboard</h1>

      <div className="stats-container">
        <div className="stat-card">
          <h3>{stats.totalStudents}</h3>
          <p>Total Students</p>
          <Link to="/student-management" className="btn btn-outline btn-sm">Manage</Link>
        </div>

        <div className="stat-card">
          <h3>{stats.activeCourses}</h3>
          <p>Active Courses</p>
          <Link to="/create-room" className="btn btn-outline btn-sm">Manage</Link>
        </div>

        <div className="stat-card">
          <h3>{stats.totalSubmissions}</h3>
          <p>Total Submissions</p>
          <Link to="/grading" className="btn btn-outline btn-sm">View</Link>
        </div>

        <div className="stat-card">
          <h3>{stats.pendingGrading}</h3>
          <p>Pending Grading</p>
          <Link to="/grading" className="btn btn-outline btn-sm">Grade</Link>
        </div>
      </div>

      <div className="row">
        <div className="col-8">

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Recent Activities</h2>
            </div>
            <div className="activity-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon ${activity.type}`}></div>
                  <div className="activity-details">
                    <h4>{activity.title}</h4>
                    <p>{activity.course}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Upcoming Exams</h2>
            </div>
            <div className="exam-list">
              {upcomingExams.map(exam => (
                <div key={exam.id} className="exam-item">
                  <div className="exam-info">
                    <h4>{exam.title}</h4>
                    <p>{exam.course}</p>
                    <div className="exam-meta">
                      <span>{exam.date}</span>
                      <span>{exam.time}</span>
                      <span>{exam.enrolled} enrolled</span>
                    </div>
                  </div>
                  <div className="exam-actions">
                    <button className="btn btn-primary btn-sm">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="col-4">

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Quick Actions</h2>
            </div>
            <div className="quick-actions">
              <Link to="/create-room" className="btn btn-outline btn-block">Create New Course</Link>
              <Link to="/file-manager" className="btn btn-outline btn-block">Upload Files</Link>
              <Link to="/student-management" className="btn btn-outline btn-block">Manage Students</Link>
              <Link to="/grading" className="btn btn-outline btn-block">Grade Submissions</Link>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">System Status</h2>
            </div>
            <div className="system-status">
              <div className="status-item">
                <span>Server Status</span>
                <span className="status-ok">Operational</span>
              </div>
              <div className="status-item">
                <span>Database</span>
                <span className="status-ok">Operational</span>
              </div>
              <div className="status-item">
                <span>File Storage</span>
                <span className="status-warning">75% Used</span>
              </div>
              <div className="status-item">
                <span>API Response</span>
                <span className="status-ok">120ms</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
