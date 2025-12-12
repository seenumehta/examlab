
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudentManagement = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [stats, setStats] = useState({
    completedCourses: 0,
    certificatesEarned: 0,
    averageScore: 0,
    totalTimeSpent: 0
  });

  useEffect(() => {
    setEnrolledCourses([
      { id: 1, title: 'Introduction to Cybersecurity', progress: 75, nextTask: 'Lab 3 · Network Security' },
      { id: 2, title: 'Web Application Security', progress: 40, nextTask: 'Quiz 2 · XSS Prevention' },
      { id: 3, title: 'Penetration Testing Basics', progress: 20, nextTask: 'Lab 1 · Reconnaissance' }
    ]);
    
    setRecentActivities([
      { id: 1, type: 'completed', title: 'Lab 2 · Cryptography', course: 'Introduction to Cybersecurity', date: 'Nov 10' },
      { id: 2, type: 'submitted', title: 'Assignment · SQL Injection', course: 'Web Application Security', date: 'Nov 09' },
      { id: 3, type: 'started', title: 'Module 3 · Network Security', course: 'Introduction to Cybersecurity', date: 'Nov 08' }
    ]);
    
    setUpcomingExams([
      { id: 1, title: 'Midterm Exam', course: 'Introduction to Cybersecurity', date: 'Nov 20', time: '10:00 AM' },
      { id: 2, title: 'Quiz 3', course: 'Web Application Security', date: 'Nov 15', time: '2:00 PM' }
    ]);
    
    setStats({
      completedCourses: 2,
      certificatesEarned: 1,
      averageScore: 85,
      totalTimeSpent: 42
    });
  }, []);

  return (
    <div className="dashboard-portal">
      <div className="portal-hero glassy">
        <div>
          <p className="pill">Your portal</p>
          <h1>Welcome back, Defender.</h1>
          <p className="subtitle">Track progress, jump into labs, and manage everything from one mission control.</p>
          <div className="portal-actions">
            <Link to="/courses" className="btn btn-primary btn-lg">Resume learning</Link>
            <Link to="/leaderboard" className="btn btn-outline btn-lg">View leaderboard</Link>
          </div>
        </div>
        <div className="portal-kpi">
          <div className="kpi">
            <span className="kpi-label">Avg score</span>
            <span className="kpi-value">{stats.averageScore}%</span>
          </div>
          <div className="kpi">
            <span className="kpi-label">Certificates</span>
            <span className="kpi-value">{stats.certificatesEarned}</span>
          </div>
          <div className="kpi">
            <span className="kpi-label">Hours trained</span>
            <span className="kpi-value">{stats.totalTimeSpent}h</span>
          </div>
        </div>
      </div>

      <div className="portal-grid">
        <div className="portal-left">
          <div className="card glassy">
            <div className="card-header">
              <h2 className="card-title">Enrolled courses</h2>
              <Link to="/courses" className="btn btn-outline btn-sm">Browse all</Link>
            </div>
            <div className="portal-list">
              {enrolledCourses.map(course => (
                <div key={course.id} className="portal-item">
                  <div>
                    <div className="item-title">{course.title}</div>
                    <div className="item-sub">{course.nextTask}</div>
                    <div className="progress compact">
                      <div className="progress-bar" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                  <div className="item-meta">
                    <span className="badge badge-primary">{course.progress}%</span>
                    <Link to={`/task/${course.id}`} className="btn btn-primary btn-sm">Continue</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card glassy">
            <div className="card-header">
              <h2 className="card-title">Recent activity</h2>
            </div>
            <div className="portal-list activity">
              {recentActivities.map(activity => (
                <div key={activity.id} className="portal-item">
                  <div className={`activity-dot ${activity.type}`} />
                  <div>
                    <div className="item-title">{activity.title}</div>
                    <div className="item-sub">{activity.course}</div>
                  </div>
                  <span className="item-date">{activity.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="portal-right">
          <div className="card glassy">
            <div className="card-header">
              <h2 className="card-title">Upcoming exams</h2>
            </div>
            <div className="portal-list">
              {upcomingExams.map(exam => (
                <div key={exam.id} className="portal-item">
                  <div>
                    <div className="item-title">{exam.title}</div>
                    <div className="item-sub">{exam.course}</div>
                  </div>
                  <div className="exam-meta">
                    <span className="badge badge-warning">{exam.date}</span>
                    <span className="badge badge-primary">{exam.time}</span>
                    <Link to={`/mcq/${exam.id}`} className="btn btn-outline btn-sm">View</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card glassy">
            <div className="card-header">
              <h2 className="card-title">Quick actions</h2>
            </div>
            <div className="quick-actions-grid">
              <Link to="/courses" className="btn btn-outline btn-block">Browse courses</Link>
              <Link to="/leaderboard" className="btn btn-outline btn-block">Leaderboard</Link>
              <Link to="/certificate" className="btn btn-outline btn-block">Certificates</Link>
              <Link to="/profile" className="btn btn-outline btn-block">Profile</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;