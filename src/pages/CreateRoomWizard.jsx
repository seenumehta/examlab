
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateRoomWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    duration: '',
    maxStudents: '',
    startDate: '',
    endDate: '',
    tasks: [],
    files: [],
    flags: [],
    evaluationMethod: 'automatic'
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    alert('Course created successfully!');
    navigate('/admin');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="wizard-step">
            <h2>Basic Information</h2>
            <div className="form-group">
              <label htmlFor="title" className="form-label">Course Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                id="category"
                name="category"
                className="form-control"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Web Security">Web Security</option>
                <option value="Penetration Testing">Penetration Testing</option>
                <option value="Network Security">Network Security</option>
                <option value="Cryptography">Cryptography</option>
                <option value="Malware Analysis">Malware Analysis</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="difficulty" className="form-label">Difficulty</label>
              <select
                id="difficulty"
                name="difficulty"
                className="form-control"
                value={formData.difficulty}
                onChange={handleInputChange}
                required
              >
                <option value="">Select difficulty</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="wizard-step">
            <h2>Schedule & Capacity</h2>
            <div className="form-group">
              <label htmlFor="duration" className="form-label">Duration (weeks)</label>
              <input
                type="number"
                id="duration"
                name="duration"
                className="form-control"
                value={formData.duration}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="maxStudents" className="form-label">Maximum Students</label>
              <input
                type="number"
                id="maxStudents"
                name="maxStudents"
                className="form-control"
                value={formData.maxStudents}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDate" className="form-label">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="form-control"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate" className="form-label">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="form-control"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="wizard-step">
            <h2>Tasks & Files</h2>
            <div className="form-group">
              <label className="form-label">Tasks</label>
              <div className="task-list">
                {formData.tasks.map((task, index) => (
                  <div key={index} className="task-item">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Task title"
                      value={task.title}
                      onChange={(e) => {
                        const updatedTasks = [...formData.tasks];
                        updatedTasks[index].title = e.target.value;
                        setFormData({ ...formData, tasks: updatedTasks });
                      }}
                    />
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Points"
                      value={task.points}
                      onChange={(e) => {
                        const updatedTasks = [...formData.tasks];
                        updatedTasks[index].points = e.target.value;
                        setFormData({ ...formData, tasks: updatedTasks });
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        const updatedTasks = formData.tasks.filter((_, i) => i !== index);
                        setFormData({ ...formData, tasks: updatedTasks });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      tasks: [...formData.tasks, { title: '', points: '' }]
                    });
                  }}
                >
                  Add Task
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Files</label>
              <div className="file-list">
                {formData.files.map((file, index) => (
                  <div key={index} className="file-item">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="File name"
                      value={file.name}
                      onChange={(e) => {
                        const updatedFiles = [...formData.files];
                        updatedFiles[index].name = e.target.value;
                        setFormData({ ...formData, files: updatedFiles });
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        const updatedFiles = formData.files.filter((_, i) => i !== index);
                        setFormData({ ...formData, files: updatedFiles });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      files: [...formData.files, { name: '' }]
                    });
                  }}
                >
                  Add File
                </button>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="wizard-step">
            <h2>Evaluation & Flags</h2>
            <div className="form-group">
              <label htmlFor="evaluationMethod" className="form-label">Evaluation Method</label>
              <select
                id="evaluationMethod"
                name="evaluationMethod"
                className="form-control"
                value={formData.evaluationMethod}
                onChange={handleInputChange}
              >
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Flags</label>
              <div className="flag-list">
                {formData.flags.map((flag, index) => (
                  <div key={index} className="flag-item">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Flag description"
                      value={flag.description}
                      onChange={(e) => {
                        const updatedFlags = [...formData.flags];
                        updatedFlags[index].description = e.target.value;
                        setFormData({ ...formData, flags: updatedFlags });
                      }}
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Flag value"
                      value={flag.value}
                      onChange={(e) => {
                        const updatedFlags = [...formData.flags];
                        updatedFlags[index].value = e.target.value;
                        setFormData({ ...formData, flags: updatedFlags });
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        const updatedFlags = formData.flags.filter((_, i) => i !== index);
                        setFormData({ ...formData, flags: updatedFlags });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      flags: [...formData.flags, { description: '', value: '' }]
                    });
                  }}
                >
                  Add Flag
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="create-room-wizard">
      <h1 className="page-title">Create New Course</h1>
      
      <div className="wizard-progress">
        <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <div className="step-title">Basic Info</div>
        </div>
        <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <div className="step-title">Schedule</div>
        </div>
        <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <div className="step-title">Tasks & Files</div>
        </div>
        <div className={`progress-step ${currentStep >= 4 ? 'active' : ''}`}>
          <div className="step-number">4</div>
          <div className="step-title">Evaluation</div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="wizard-form">
        {renderStepContent()}
        
        <div className="wizard-actions">
          {currentStep > 1 && (
            <button type="button" className="btn btn-outline" onClick={handlePrevStep}>
              Previous
            </button>
          )}
          {currentStep < 4 ? (
            <button type="button" className="btn btn-primary" onClick={handleNextStep}>
              Next
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Create Course
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateRoomWizard;