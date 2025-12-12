
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TaskPanel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [activeTab, setActiveTab] = useState('instructions');
  const [flagInput, setFlagInput] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch task details
    setTimeout(() => {
      setTask({
        id: parseInt(id),
        title: 'Network Security Analysis',
        description: 'Analyze network traffic to identify potential security threats and vulnerabilities.',
        type: 'lab', // 'lab', 'mcq', 'assignment'
        points: 100,
        timeLimit: 120, // in minutes
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
      });
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleFlagSubmit = (e) => {
    e.preventDefault();
    
    // Simulate flag submission
    setTimeout(() => {
      const isCorrect = task.flags.some(flag => flag.value === flagInput);
      setSubmissionStatus(isCorrect ? 'correct' : 'incorrect');
      
      if (isCorrect) {
        alert('Correct flag submitted!');
      } else {
        alert('Incorrect flag. Please try again.');
      }
    }, 500);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    
    if (!uploadedFile) {
      alert('Please select a file to upload');
      return;
    }
    
    // Simulate file submission
    setTimeout(() => {
      alert('File submitted successfully!');
      setUploadedFile(null);
    }, 500);
  };

  const handleDownload = (fileId) => {
    // Simulate file download
    alert(`Downloading file with ID: ${fileId}`);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading task details...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="error-container">
        <h2>Task not found</h2>
        <p>The task you're looking for doesn't exist or has been removed.</p>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="task-panel">
      <div className="task-header">
        <div className="task-info">
          <h1 className="task-title">{task.title}</h1>
          <p className="task-description">{task.description}</p>
          <div className="task-meta">
            <span className="task-type">
              <i className="icon-book"></i> {task.type}
            </span>
            <span className="task-points">
              <i className="icon-star"></i> {task.points} points
            </span>
            <span className="task-time">
              <i className="icon-clock"></i> {task.timeLimit} minutes
            </span>
            <span className="task-attempts">
              <i className="icon-refresh"></i> {task.attempts}/{task.maxAttempts} attempts
            </span>
          </div>
        </div>
        <div className="task-actions">
          <button className="btn btn-outline">Save Progress</button>
          <button className="btn btn-danger">Exit Task</button>
        </div>
      </div>

      <div className="task-tabs">
        <button 
          className={`tab-button ${activeTab === 'instructions' ? 'active' : ''}`}
          onClick={() => setActiveTab('instructions')}
        >
          Instructions
        </button>
        <button 
          className={`tab-button ${activeTab === 'hints' ? 'active' : ''}`}
          onClick={() => setActiveTab('hints')}
        >
          Hints
        </button>
        <button 
          className={`tab-button ${activeTab === 'files' ? 'active' : ''}`}
          onClick={() => setActiveTab('files')}
        >
          Files
        </button>
        <button 
          className={`tab-button ${activeTab === 'submit-flag' ? 'active' : ''}`}
          onClick={() => setActiveTab('submit-flag')}
        >
          Submit Flag
        </button>
        <button 
          className={`tab-button ${activeTab === 'upload-file' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload-file')}
        >
          Upload File
        </button>
        <button 
          className={`tab-button ${activeTab === 'submissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('submissions')}
        >
          My Submissions
        </button>
      </div>

      <div className="task-content">
        {activeTab === 'instructions' && (
          <div className="tab-content">
            <div dangerouslySetInnerHTML={{ __html: task.instructions }} />
          </div>
        )}

        {activeTab === 'hints' && (
          <div className="tab-content">
            <h2>Hints</h2>
            <ul className="hint-list">
              {task.hints.map((hint, index) => (
                <li key={index} className="hint-item">
                  {hint}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'files' && (
          <div className="tab-content">
            <h2>Task Files</h2>
            <div className="file-list">
              {task.files.map(file => (
                <div key={file.id} className="file-item">
                  <div className="file-info">
                    <h3>{file.name}</h3>
                    <span className="file-size">{file.size}</span>
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

        {activeTab === 'submit-flag' && (
          <div className="tab-content">
            <h2>Submit Flag</h2>
            <div className="flag-list">
              {task.flags.map(flag => (
                <div key={flag.id} className="flag-item">
                  <p>{flag.description}</p>
                  <form onSubmit={handleFlagSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter flag here..."
                        value={flagInput}
                        onChange={(e) => setFlagInput(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                  {submissionStatus && (
                    <div className={`alert ${submissionStatus === 'correct' ? 'alert-success' : 'alert-danger'}`}>
                      {submissionStatus === 'correct' ? 'Correct flag!' : 'Incorrect flag. Please try again.'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'upload-file' && (
          <div className="tab-content">
            <h2>Upload File</h2>
            <form onSubmit={handleFileSubmit}>
              <div className="form-group">
                <label htmlFor="file-upload" className="form-label">Select File</label>
                <input
                  type="file"
                  id="file-upload"
                  className="form-control"
                  onChange={handleFileUpload}
                />
              </div>
              {uploadedFile && (
                <div className="uploaded-file">
                  <p>Selected file: {uploadedFile.name}</p>
                  <p>Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              )}
              <button type="submit" className="btn btn-primary">Upload</button>
            </form>
          </div>
        )}

        {activeTab === 'submissions' && (
          <div className="tab-content">
            <h2>My Submissions</h2>
            <div className="submission-list">
              {task.submissions.map(submission => (
                <div key={submission.id} className="submission-item">
                  <div className="submission-info">
                    <span className="submission-timestamp">{submission.timestamp}</span>
                    <span className={`submission-status badge ${submission.status === 'correct' ? 'badge-success' : 'badge-danger'}`}>
                      {submission.status}
                    </span>
                  </div>
                  <div className="submission-points">
                    {submission.points} points
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskPanel;