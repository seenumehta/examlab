import React from 'react';
import { Link } from 'react-router-dom';

const highlights = [
  { title: 'Live Attack Labs', text: 'Practice real-world exploits in safe, isolated sandboxes.' },
  { title: 'Red & Blue Team Paths', text: 'Pick your track and unlock curated missions that level up with you.' },
  { title: 'Instant Skill Reports', text: 'AI-assisted grading with actionable insights and remediation steps.' },
  { title: 'Job-Ready Portfolio', text: 'Ship proof of work badges and verifiable certificates to recruiters.' },
];

const labTracks = [
  { name: 'Web Exploitation', badge: 'OWASP Top 10', difficulty: 'Intermediate', desc: 'Bypass auth, abuse injections, and chain logic flaws.' },
  { name: 'Cloud Defense', badge: 'AWS / Azure', difficulty: 'Beginner', desc: 'Harden IAM, detect misconfig, and automate guardrails.' },
  { name: 'Malware Analysis', badge: 'Reverse', difficulty: 'Advanced', desc: 'Unpack binaries, trace behaviors, and craft YARA rules.' },
  { name: 'SOC Analyst', badge: 'Blue Team', difficulty: 'All Levels', desc: 'Hunt threats with SIEM detections and live incident drills.' },
];

const stats = [
  { label: 'Labs Deployed', value: '320+' },
  { label: 'Avg. Placement Boost', value: '42%' },
  { label: 'Global Learners', value: '58k' },
  { label: 'Completion Rate', value: '91%' },
];

const testimonials = [
  { name: 'Sara, SOC L1', quote: 'The blue team drills felt like a real war room. The instant feedback cut my ramp-up time in half.' },
  { name: 'Dev, Security Engineer', quote: 'Red team labs mapped to OWASP and MITRE ATT&CK—perfect for interviews and on-call prep.' },
  { name: 'Lena, Student', quote: 'Animations and narrative missions kept me hooked. Certificates helped me land my internship.' },
];

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="pill">Cybersecurity · Labs · Certifications</p>
            <h1>
              Master breaches before
              <span className="accent"> they happen.</span>
            </h1>
            <p className="subtitle">
              ExamLab is a modern cyber range: immersive attack & defense labs,
              adaptive quizzes, and guided missions with cinematic visuals and buttery-smooth transitions.
            </p>
            <div className="hero-actions">
              <Link to="/signup" className="btn btn-primary btn-lg">Start Free</Link>
              <Link to="/courses" className="btn btn-outline btn-lg">Explore Labs</Link>
              <span className="note">No credit card · Dark/Light ready</span>
            </div>
            <div className="hero-stats">
              {stats.map((item) => (
                <div key={item.label} className="stat-card">
                  <span className="stat-value">{item.value}</span>
                  <span className="stat-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="glow orb orb-one" />
            <div className="glow orb orb-two" />
            <div className="cyber-card glassy">
              <div className="signal" />
              <div className="mesh" />
              <div className="terminal">
                <div className="terminal-header">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                  <span className="title">live-scan.sh</span>
                  <span className="status">secure</span>
                </div>
                <div className="terminal-body">
                  <p>$ nmap -sC -sV examlab.cloud</p>
                  <p className="success">✓ Ports hardened · MFA enforced</p>
                  <p>$ python exploit.py --dry-run</p>
                  <p className="warning">→ sandboxed | rollback ready</p>
                  <p className="muted"># immersive labs with cinematic transitions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-header">
          <p className="pill">Why ExamLab</p>
          <h2>Designed for modern security teams and learners.</h2>
          <p className="section-subtitle">Motion-first UI, tactile interactions, and human-friendly progress tracking.</p>
        </div>
        <div className="features-grid">
          {highlights.map((feature) => (
            <div className="feature-card hover-lift" key={feature.title}>
              <div className="feature-icon" />
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="lab-tracks-section">
        <div className="section-header">
          <p className="pill">Adaptive Missions</p>
          <h2>Choose your path. Level up fast.</h2>
          <p className="section-subtitle">Animated modules with checkpoints, hints, and cinematic feedback.</p>
        </div>
        <div className="tracks-grid">
          {labTracks.map((track) => (
            <div className="track-card glassy" key={track.name}>
              <div className="track-top">
                <span className="badge badge-primary">{track.badge}</span>
                <span className="badge badge-warning">{track.difficulty}</span>
              </div>
              <h3>{track.name}</h3>
              <p>{track.desc}</p>
              <div className="track-footer">
                <span className="pulse-dot" />
                <span>Live guided labs</span>
                <Link to="/courses" className="link">Enter track →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-section">
        <div className="section-header">
          <p className="pill">What learners say</p>
          <h2>Motion-rich experiences that feel like a game.</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <div className="testimonial-card" key={item.name}>
              <p className="quote">“{item.quote}”</p>
              <p className="author">— {item.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section glassy">
        <div>
          <p className="pill">Ready?</p>
          <h3>Ship secure code. Simulate attacks. Earn proof.</h3>
          <p className="section-subtitle">Join teams practicing safer software with immersive labs.</p>
        </div>
        <div className="cta-actions">
          <Link to="/signup" className="btn btn-primary btn-lg">Create account</Link>
          <Link to="/login" className="btn btn-outline btn-lg">I already have one</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;