
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const LabDetailPage = () => {
  const { id } = useParams();
  const [lab, setLab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate API call to fetch lab details
    setTimeout(() => {
      setLab({
        id: parseInt(id),
        title: 'Introduction to Cybersecurity',
        description: 'Learn the fundamentals of cybersecurity, including threat identification, risk management, and security controls.',
        instructor: 'Dr. John Smith',
        duration: '6 weeks',
        difficulty: 'Beginner',
        enrolled: 1234,
        rating: 4.7,
        modules: [
          { id: 1, title: 'Introduction to Cybersecurity', duration: '1 week', completed: true },
          { id: 2, title: 'Threats and Vulnerabilities', duration: '1 week', completed: true },
          { id: 3, title: 'Risk Management', duration: '1 week', completed: false },
          { id: 4, title: 'Security Controls', duration: '1 week', completed: false },
          { id: 5, title: 'Incident Response', duration: '1 week', completed: false },
          { id: 6, title: 'Final Project', duration: '1 week', completed: false }
        ],
        files: [
          { id: 1, name: 'Lab 1 - Environment Setup.zip', size: '125 MB', downloads: 892 },
          { id: 2, name: 'Lab 2 - Vulnerability Scanner.zip', size: '45 MB', downloads: 756 },
          { id: 3, name: 'Lab 3 - Network Monitor.zip', size: '67 MB', downloads: 623 }
        ],
        announcements: [
          { id: 1, title: 'Welcome to the Course', date: '2023-10-01', content: 'Welcome to Introduction to Cybersecurity! Please review the course syllabus and make sure you have all the prerequisites.' },
          { id: 2, title: 'Lab 1 Deadline Extended', date: '2023-10-15', content: 'The deadline for Lab 1 has been extended to October 20th due to technical issues with the download server.' },
          { id: 3, title: 'Midterm Exam Schedule', date: '2023-10-20', content: 'The midterm exam will be held on November 5th at 10:00 AM. Please make sure to review all materials from modules 1-3.' }
        ],
        faqs: [
          { id: 1, question: 'What software do I need for this course?', answer: 'You will need a virtualization software like VirtualBox or VMware, and a Linux distribution like Ubuntu.' },
          { id: 2, question: 'Are there any prerequisites for this course?', answer: 'Basic knowledge of computer networks and operating systems is recommended.' },
          { id: 3, question: 'How are grades calculated?', answer: 'Grades are based on lab assignments (40%), quizzes (20%), midterm exam (20%), and final project (20%).' }
        ]
      });
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleDownload = (fileId) => {
    // Simulate file download
    alert(`Downloading file with ID: ${fileId}`);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading course details...</p>
      </div>
    );
  }

  if (!lab) {
    return (
      <div className="error-container">
        <h2>Course not found</h2>
        <p>The course you're looking for doesn't exist or has been removed.</p>
        <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
      </div>
    );
  }

  return (
    <div className="lab-detail">
      <div className="lab-header">
        <div className="lab-info">
          <h1 className="lab-title">{lab.title}</h1>
          <p className="lab-description">{lab.description}</p>
          <div className="lab-meta">
            <span className="lab-instructor">Instructor: {lab.instructor}</span>
            <span className="lab-duration">
              <i className="icon-clock"></i> {lab.duration}
            </span>
            <span className="lab-difficulty">
              <i className="icon-signal"></i> {lab.difficulty}
            </span>
            <span className="lab-enrolled">
              <i className="icon-users"></i> {lab.enrolled} enrolled
            </span>
            <span className="lab-rating">
              <i className="icon-star"></i> {lab.rating}
            </span>
          </div>
        </div>
        <div className="lab-actions">
          <Link to={`/task/${lab.id}`} className="btn btn-primary btn-block">Start Learning</Link>
          <button className="btn btn-outline btn-block">Bookmark</button>
        </div>
      </div>

      <div className="lab-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'modules' ? 'active' : ''}`}
          onClick={() => setActiveTab('modules')}
        >
          Modules
        </button>
        <button 
          className={`tab-button ${activeTab === 'files' ? 'active' : ''}`}
          onClick={() => setActiveTab('files')}
        >
          Files
        </button>
        <button 
          className={`tab-button ${activeTab === 'announcements' ? 'active' : ''}`}
          onClick={() => setActiveTab('announcements')}
        >
          Announcements
        </button>
        <button 
          className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          FAQ
        </button>
      </div>

      <div className="lab-content">
        {activeTab === 'overview' && (
          <div className="tab-content">
            <h2>Course Overview</h2>
            <p>{lab.description}</p>
            <h3>What You'll Learn</h3>
            <ul>
              <li>Identify and analyze cybersecurity threats and vulnerabilities</li>
              <li>Implement risk management strategies</li>
              <li>Apply security controls to protect systems and data</li>
              <li>Develop incident response plans</li>
              <li>Understand legal and ethical issues in cybersecurity</li>
            </ul>
            <h3>Prerequisites</h3>
            <ul>
              <li>Basic knowledge of computer networks</li>
              <li>Familiarity with operating systems (Windows/Linux)</li>
              <li>Understanding of basic security concepts</li>
            </ul>
          </div>
        )}

        {activeTab === 'modules' && (
          <div className="tab-content">
            <h2>Course Modules</h2>
            <div className="module-list">
              {lab.modules.map(module => (
                <div key={module.id} className={`module-item ${module.completed ? 'completed' : ''}`}>
                  <div className="module-info">
                    <h3>{module.title}</h3>
                    <span className="module-duration">{module.duration}</span>
                  </div>
                  <div className="module-status">
                    {module.completed ? (
                      <span className="badge badge-success">Completed</span>
                    ) : (
                      <Link to={`/task/${lab.id}/${module.id}`} className="btn btn-primary btn-sm">Start</Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'files' && (
          <div className="tab-content">
            <h2>Lab Files</h2>
            <div className="file-list">
              {lab.files.map(file => (
                <div key={file.id} className="file-item">
                  <div className="file-info">
                    <h3>{file.name}</h3>
                    <span className="file-size">{file.size}</span>
                    <span className="file-downloads">{file.downloads} downloads</span>
                  </div>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => handleDownload(file.id)}
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="tab-content">
            <h2>Course Announcements</h2>
            <div className="announcement-list">
              {lab.announcements.map(announcement => (
                <div key={announcement.id} className="announcement-item">
                  <div className="announcement-header">
                    <h3>{announcement.title}</h3>
                    <span className="announcement-date">{announcement.date}</span>
                  </div>
                  <p>{announcement.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="tab-content">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              {lab.faqs.map(faq => (
                <div key={faq.id} className="faq-item">
                  <h3 className="faq-question">{faq.question}</h3>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabDetailPage;