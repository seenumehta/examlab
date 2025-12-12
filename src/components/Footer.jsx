
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="row">
          <div className="col-4">
            <h3>ExamLab Portal</h3>
            <p>A comprehensive platform for exams and lab management.</p>
          </div>
          <div className="col-4">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="col-4">
            <h3>Contact Us</h3>
            <p>Email: info@examlab.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ExamLab Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;