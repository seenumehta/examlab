
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CourseListingPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  useEffect(() => {
    // Simulate API call to fetch courses
    const mockCourses = [
      { 
        id: 1, 
        title: 'Introduction to Cybersecurity', 
        description: 'Learn the fundamentals of cybersecurity, including threat identification, risk management, and security controls.',
        category: 'Cybersecurity',
        difficulty: 'Beginner',
        duration: '6 weeks',
        enrolled: 1234,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop'
      },
      { 
        id: 2, 
        title: 'Web Application Security', 
        description: 'Master the techniques to secure web applications against common vulnerabilities like XSS, CSRF, and SQL injection.',
        category: 'Web Security',
        difficulty: 'Intermediate',
        duration: '8 weeks',
        enrolled: 856,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop'
      },
      { 
        id: 3, 
        title: 'Penetration Testing Basics', 
        description: 'Learn how to identify and exploit vulnerabilities in systems through hands-on penetration testing techniques.',
        category: 'Penetration Testing',
        difficulty: 'Intermediate',
        duration: '10 weeks',
        enrolled: 642,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop'
      },
      { 
        id: 4, 
        title: 'Network Security Fundamentals', 
        description: 'Understand network protocols, security architectures, and defense mechanisms to protect network infrastructure.',
        category: 'Network Security',
        difficulty: 'Beginner',
        duration: '6 weeks',
        enrolled: 987,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop'
      },
      { 
        id: 5, 
        title: 'Advanced Cryptography', 
        description: 'Dive deep into cryptographic algorithms, protocols, and their applications in modern security systems.',
        category: 'Cryptography',
        difficulty: 'Advanced',
        duration: '12 weeks',
        enrolled: 324,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1639322537504-6427a16b9a6b?w=800&h=400&fit=crop'
      },
      { 
        id: 6, 
        title: 'Malware Analysis', 
        description: 'Learn techniques to analyze, understand, and defend against various types of malware and malicious software.',
        category: 'Malware Analysis',
        difficulty: 'Advanced',
        duration: '10 weeks',
        enrolled: 445,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop'
      }
    ];
    
    setCourses(mockCourses);
    setFilteredCourses(mockCourses);
  }, []);

  useEffect(() => {
    // Filter courses based on search term, category, and difficulty
    let filtered = courses;
    
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }
    
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(course => course.difficulty === selectedDifficulty);
    }
    
    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory, selectedDifficulty, courses]);

  const categories = ['all', 'Cybersecurity', 'Web Security', 'Penetration Testing', 'Network Security', 'Cryptography', 'Malware Analysis'];
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="course-listing">
      <h1 className="page-title">Course Catalog</h1>
      
      <div className="course-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>
        
        <div className="filter-options">
          <div className="filter-group">
            <label>Category</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-control"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Difficulty</label>
            <select 
              value={selectedDifficulty} 
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="form-control"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Levels' : difficulty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="course-grid">
        {filteredCourses.map(course => (
          <div key={course.id} className="course-card">
            <div className="course-image">
              <img src={course.image} alt={course.title} />
            </div>
            <div className="course-content">
              <div className="course-meta">
                <span className="badge badge-primary">{course.category}</span>
                <span className="badge badge-secondary">{course.difficulty}</span>
              </div>
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description}</p>
              <div className="course-stats">
                <span className="course-duration">
                  <i className="icon-clock"></i> {course.duration}
                </span>
                <span className="course-enrolled">
                  <i className="icon-users"></i> {course.enrolled} enrolled
                </span>
                <span className="course-rating">
                  <i className="icon-star"></i> {course.rating}
                </span>
              </div>
              <Link to={`/lab/${course.id}`} className="btn btn-primary btn-block">
                View Course
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="no-results">
          <h3>No courses found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default CourseListingPage;