const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');
const Lab = require('./models/Lab');
const Task = require('./models/Task');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected for seeding'))
    .catch(err => console.error(err));

const seedData = async () => {
    try {
        await Course.deleteMany({});
        await Lab.deleteMany({});
        await Task.deleteMany({});

        // Courses
        const courses = [
            {
                id: 1,
                title: 'Introduction to Cybersecurity',
                description: 'Learn the fundamentals of cybersecurity, including threat identification, risk management, and security controls.',
                category: 'Cybersecurity',
                difficulty: 'Beginner',
                duration: '6 weeks',
                enrolled: 1234,
                rating: 4.7,
                image: 'cybersecurity-intro.jpg'
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
                image: 'web-security.jpg'
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
                image: 'pen-testing.jpg'
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
                image: 'network-security.jpg'
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
                image: 'cryptography.jpg'
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
                image: 'malware-analysis.jpg'
            }
        ];

        await Course.insertMany(courses);
        console.log('Courses seeded');

        // Labs
        const lab = {
            id: 1,
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
        };

        await Lab.create(lab);
        console.log('Labs seeded');

        // Tasks (id matches lab module id 1 for example sake, but usually task id would be different)
        const task = {
            id: 1,
            title: 'Network Security Analysis',
            description: 'Analyze network traffic to identify potential security threats and vulnerabilities.',
            type: 'lab',
            points: 100,
            timeLimit: 120,
            attempts: 3,
            maxAttempts: 3,
            instructions: `
        <h3>Objective</h3>
        <p>Your task is to analyze the provided network capture file and identify any security threats or vulnerabilities.</p>
        
        <h3>Steps</h3>
        <ol>
          <li>Download the network capture file from the Files tab.</li>
          <li>Use Wireshark or a similar tool to analyze the traffic.</li>
          <li>Identify any suspicious activities or potential security threats.</li>
          <li>Document your findings in a report.</li>
          <li>Submit your report and the identified flags.</li>
        </ol>
        
        <h3>Deliverables</h3>
        <ul>
          <li>A detailed report of your analysis (PDF format).</li>
          <li>The identified flags (one per line).</li>
        </ul>
        
        <h3>Evaluation Criteria</h3>
        <ul>
          <li>Correct identification of security threats (40 points).</li>
          <li>Quality of analysis and documentation (30 points).</li>
          <li>Correct flag submissions (30 points).</li>
        </ul>
      `,
            hints: [
                'Look for unusual traffic patterns or protocols.',
                'Pay attention to DNS queries and responses.',
                'Check for any data exfiltration attempts.',
                'Analyze the timing and frequency of communications.'
            ],
            files: [
                { id: 1, name: 'network_capture.pcap', size: '25 MB' },
                { id: 2, name: 'analysis_template.docx', size: '1.2 MB' }
            ],
            flags: [
                { id: 1, description: 'Flag 1: Identify the suspicious IP address', value: 'flag{192.168.1.100}' },
                { id: 2, description: 'Flag 2: Identify the protocol used for data exfiltration', value: 'flag{DNS}' }
            ],
            submissions: [
                { id: 1, timestamp: '2023-11-10 14:30:00', status: 'correct', points: 50 },
                { id: 2, timestamp: '2023-11-10 15:45:00', status: 'incorrect', points: 0 }
            ]
        };

        await Task.create(task);
        console.log('Tasks seeded');

        console.log('Data seeding completed');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
