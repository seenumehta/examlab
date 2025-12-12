import React, { useState } from 'react';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [activeSetting, setActiveSetting] = useState(null);
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        studentId: 'STU-2024-001',
        phone: '+1 (555) 123-4567',
        department: 'Computer Science',
        semester: '6th Semester',
        enrollmentDate: '2022-09-01',
        bio: 'Passionate about learning and technology. Focused on web development and data science.',
    });

    const [settings, setSettings] = useState({
        notifications: {
            email: true,
            push: false,
            sms: false,
        },
        language: 'en',
        theme: 'dark',
    });

    const [stats] = useState({
        coursesCompleted: 12,
        coursesInProgress: 3,
        totalPoints: 1250,
        certificatesEarned: 8,
        averageScore: 87.5,
        rank: 15,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically save to backend
        console.log('Profile saved:', profile);
    };

    const handleSettingClick = (setting) => {
        setActiveSetting(setting);
    };

    const handleCloseSetting = () => {
        setActiveSetting(null);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        // Handle password change
        alert('Password change functionality will be implemented');
        handleCloseSetting();
    };

    const handleNotificationToggle = (type) => {
        setSettings({
            ...settings,
            notifications: {
                ...settings.notifications,
                [type]: !settings.notifications[type],
            },
        });
    };

    const handleLanguageChange = (lang) => {
        setSettings({ ...settings, language: lang });
    };

    const handleThemeChange = (theme) => {
        setSettings({ ...settings, theme });
        // You can also trigger the theme change in App.jsx here
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    return (
        <div className="profile-page fade-in">
            <div className="profile-header">
                <h1>My Profile</h1>
                <p>Manage your account information and track your progress</p>
            </div>

            <div className="row">
                {/* Profile Information Card */}
                <div className="col-8">
                    <div className="card hover-lift">
                        <div className="card-header">
                            <h2 className="card-title">Profile Information</h2>
                            {!isEditing ? (
                                <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>
                                    Edit Profile
                                </button>
                            ) : (
                                <div>
                                    <button className="btn btn-secondary btn-sm mr-1" onClick={handleSave}>
                                        Save Changes
                                    </button>
                                    <button className="btn btn-outline btn-sm" onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="profile-info">
                            <div className="profile-avatar-section">
                                <div className="profile-avatar">
                                    <div className="avatar-placeholder">
                                        {profile.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    {isEditing && (
                                        <button className="btn btn-sm btn-outline mt-1">Change Photo</button>
                                    )}
                                </div>
                            </div>

                            <div className="profile-fields">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="form-label">Full Name</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={profile.name}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            ) : (
                                                <p className="profile-value">{profile.name}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="form-label">Student ID</label>
                                            <p className="profile-value">{profile.studentId}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="form-label">Email</label>
                                            {isEditing ? (
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={profile.email}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            ) : (
                                                <p className="profile-value">{profile.email}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="form-label">Phone</label>
                                            {isEditing ? (
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={profile.phone}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            ) : (
                                                <p className="profile-value">{profile.phone}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="form-label">Department</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="department"
                                                    value={profile.department}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            ) : (
                                                <p className="profile-value">{profile.department}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="form-label">Semester</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="semester"
                                                    value={profile.semester}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            ) : (
                                                <p className="profile-value">{profile.semester}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Bio</label>
                                    {isEditing ? (
                                        <textarea
                                            name="bio"
                                            value={profile.bio}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            rows="4"
                                        />
                                    ) : (
                                        <p className="profile-value">{profile.bio}</p>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Enrollment Date</label>
                                    <p className="profile-value">
                                        {new Date(profile.enrollmentDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Sidebar */}
                <div className="col-4">
                    <div className="card hover-lift">
                        <div className="card-header">
                            <h2 className="card-title">Statistics</h2>
                        </div>
                        <div className="stats-grid">
                            <div className="stat-item scale-in">
                                <div className="stat-icon stat-icon-primary">📚</div>
                                <div className="stat-content">
                                    <h3 className="stat-value">{stats.coursesCompleted}</h3>
                                    <p className="stat-label">Courses Completed</p>
                                </div>
                            </div>
                            <div className="stat-item scale-in">
                                <div className="stat-icon stat-icon-warning">⏳</div>
                                <div className="stat-content">
                                    <h3 className="stat-value">{stats.coursesInProgress}</h3>
                                    <p className="stat-label">In Progress</p>
                                </div>
                            </div>
                            <div className="stat-item scale-in">
                                <div className="stat-icon stat-icon-success">⭐</div>
                                <div className="stat-content">
                                    <h3 className="stat-value">{stats.totalPoints}</h3>
                                    <p className="stat-label">Total Points</p>
                                </div>
                            </div>
                            <div className="stat-item scale-in">
                                <div className="stat-icon stat-icon-secondary">🏆</div>
                                <div className="stat-content">
                                    <h3 className="stat-value">{stats.certificatesEarned}</h3>
                                    <p className="stat-label">Certificates</p>
                                </div>
                            </div>
                            <div className="stat-item scale-in">
                                <div className="stat-icon stat-icon-primary">📊</div>
                                <div className="stat-content">
                                    <h3 className="stat-value">{stats.averageScore}%</h3>
                                    <p className="stat-label">Average Score</p>
                                </div>
                            </div>
                            <div className="stat-item scale-in">
                                <div className="stat-icon stat-icon-danger">🥇</div>
                                <div className="stat-content">
                                    <h3 className="stat-value">#{stats.rank}</h3>
                                    <p className="stat-label">Global Rank</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card hover-lift mt-2">
                        <div className="card-header">
                            <h2 className="card-title">Account Settings</h2>
                        </div>
                        <div className="settings-list">
                            <button 
                                className="settings-item"
                                onClick={() => handleSettingClick('password')}
                            >
                                <span>🔒 Change Password</span>
                                <span className="arrow">→</span>
                            </button>
                            <button 
                                className="settings-item"
                                onClick={() => handleSettingClick('notifications')}
                            >
                                <span>🔔 Notifications</span>
                                <span className="arrow">→</span>
                            </button>
                            <button 
                                className="settings-item"
                                onClick={() => handleSettingClick('language')}
                            >
                                <span>🌐 Language</span>
                                <span className="arrow">→</span>
                            </button>
                            <button 
                                className="settings-item"
                                onClick={() => handleSettingClick('theme')}
                            >
                                <span>🎨 Theme</span>
                                <span className="arrow">→</span>
                            </button>
                        </div>
                    </div>

                    {/* Settings Modals */}
                    {activeSetting === 'password' && (
                        <div className="modal-overlay" onClick={handleCloseSetting}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-header">
                                    <h2>Change Password</h2>
                                    <button className="modal-close" onClick={handleCloseSetting}>×</button>
                                </div>
                                <form onSubmit={handlePasswordChange}>
                                    <div className="form-group">
                                        <label className="form-label">Current Password</label>
                                        <input type="password" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">New Password</label>
                                        <input type="password" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Confirm New Password</label>
                                        <input type="password" className="form-control" required />
                                    </div>
                                    <div className="modal-actions">
                                        <button type="submit" className="btn btn-primary">Change Password</button>
                                        <button type="button" className="btn btn-outline" onClick={handleCloseSetting}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {activeSetting === 'notifications' && (
                        <div className="modal-overlay" onClick={handleCloseSetting}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-header">
                                    <h2>Notification Settings</h2>
                                    <button className="modal-close" onClick={handleCloseSetting}>×</button>
                                </div>
                                <div className="settings-options">
                                    <div className="setting-option">
                                        <div>
                                            <h3>Email Notifications</h3>
                                            <p>Receive notifications via email</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input 
                                                type="checkbox" 
                                                checked={settings.notifications.email}
                                                onChange={() => handleNotificationToggle('email')}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div className="setting-option">
                                        <div>
                                            <h3>Push Notifications</h3>
                                            <p>Receive push notifications in browser</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input 
                                                type="checkbox" 
                                                checked={settings.notifications.push}
                                                onChange={() => handleNotificationToggle('push')}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div className="setting-option">
                                        <div>
                                            <h3>SMS Notifications</h3>
                                            <p>Receive notifications via SMS</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input 
                                                type="checkbox" 
                                                checked={settings.notifications.sms}
                                                onChange={() => handleNotificationToggle('sms')}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>
                                <div className="modal-actions">
                                    <button className="btn btn-primary" onClick={handleCloseSetting}>Save Changes</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSetting === 'language' && (
                        <div className="modal-overlay" onClick={handleCloseSetting}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-header">
                                    <h2>Language Settings</h2>
                                    <button className="modal-close" onClick={handleCloseSetting}>×</button>
                                </div>
                                <div className="settings-options">
                                    {['en', 'es', 'fr', 'de', 'zh'].map(lang => (
                                        <button
                                            key={lang}
                                            className={`language-option ${settings.language === lang ? 'active' : ''}`}
                                            onClick={() => handleLanguageChange(lang)}
                                        >
                                            <span>{lang === 'en' ? '🇺🇸 English' : lang === 'es' ? '🇪🇸 Español' : lang === 'fr' ? '🇫🇷 Français' : lang === 'de' ? '🇩🇪 Deutsch' : '🇨🇳 中文'}</span>
                                            {settings.language === lang && <span className="check">✓</span>}
                                        </button>
                                    ))}
                                </div>
                                <div className="modal-actions">
                                    <button className="btn btn-primary" onClick={handleCloseSetting}>Save Changes</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSetting === 'theme' && (
                        <div className="modal-overlay" onClick={handleCloseSetting}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-header">
                                    <h2>Theme Settings</h2>
                                    <button className="modal-close" onClick={handleCloseSetting}>×</button>
                                </div>
                                <div className="settings-options">
                                    <button
                                        className={`theme-option ${settings.theme === 'light' ? 'active' : ''}`}
                                        onClick={() => handleThemeChange('light')}
                                    >
                                        <span>☀️ Light Theme</span>
                                        {settings.theme === 'light' && <span className="check">✓</span>}
                                    </button>
                                    <button
                                        className={`theme-option ${settings.theme === 'dark' ? 'active' : ''}`}
                                        onClick={() => handleThemeChange('dark')}
                                    >
                                        <span>🌙 Dark Theme</span>
                                        {settings.theme === 'dark' && <span className="check">✓</span>}
                                    </button>
                                </div>
                                <div className="modal-actions">
                                    <button className="btn btn-primary" onClick={handleCloseSetting}>Done</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
