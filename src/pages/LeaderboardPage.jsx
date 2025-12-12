import React, { useState } from 'react';

const LeaderboardPage = () => {
    const [timeFilter, setTimeFilter] = useState('all-time');
    const [categoryFilter, setCategoryFilter] = useState('overall');

    const leaderboardData = [
        { rank: 1, name: 'Alice Johnson', points: 2850, courses: 15, avgScore: 95.2, badge: '🥇', trend: 'up' },
        { rank: 2, name: 'Bob Smith', points: 2720, courses: 14, avgScore: 93.8, badge: '🥈', trend: 'up' },
        { rank: 3, name: 'Carol Williams', points: 2650, courses: 13, avgScore: 92.5, badge: '🥉', trend: 'same' },
        { rank: 4, name: 'David Brown', points: 2480, courses: 12, avgScore: 91.3, badge: '4️⃣', trend: 'down' },
        { rank: 5, name: 'Emma Davis', points: 2350, courses: 11, avgScore: 90.1, badge: '5️⃣', trend: 'up' },
        { rank: 6, name: 'Frank Miller', points: 2200, courses: 10, avgScore: 89.5, badge: '6️⃣', trend: 'up' },
        { rank: 7, name: 'Grace Wilson', points: 2100, courses: 10, avgScore: 88.7, badge: '7️⃣', trend: 'same' },
        { rank: 8, name: 'Henry Moore', points: 1950, courses: 9, avgScore: 87.9, badge: '8️⃣', trend: 'down' },
        { rank: 9, name: 'Ivy Taylor', points: 1850, courses: 9, avgScore: 87.2, badge: '9️⃣', trend: 'up' },
        { rank: 10, name: 'Jack Anderson', points: 1750, courses: 8, avgScore: 86.5, badge: '🔟', trend: 'same' },
        { rank: 11, name: 'Kate Thomas', points: 1650, courses: 8, avgScore: 85.8, badge: '', trend: 'up' },
        { rank: 12, name: 'Liam Jackson', points: 1550, courses: 7, avgScore: 85.1, badge: '', trend: 'down' },
        { rank: 13, name: 'Mia White', points: 1450, courses: 7, avgScore: 84.5, badge: '', trend: 'up' },
        { rank: 14, name: 'Noah Harris', points: 1350, courses: 6, avgScore: 83.8, badge: '', trend: 'same' },
        { rank: 15, name: 'John Doe', points: 1250, courses: 6, avgScore: 83.2, badge: '', trend: 'up', isCurrentUser: true },
    ];

    const topPerformers = leaderboardData.slice(0, 3);

    return (
        <div className="leaderboard-page fade-in">
            <div className="leaderboard-header">
                <h1>🏆 Leaderboard</h1>
                <p>Compete with fellow students and track your progress</p>
            </div>

            {/* Top 3 Podium */}
            <div className="podium-section">
                <div className="podium">
                    {/* 2nd Place */}
                    <div className="podium-item podium-second slide-in-left">
                        <div className="podium-rank-badge">🥈</div>
                        <div className="podium-avatar">{topPerformers[1].name.split(' ').map(n => n[0]).join('')}</div>
                        <h3>{topPerformers[1].name}</h3>
                        <p className="podium-points">{topPerformers[1].points} pts</p>
                        <div className="podium-base podium-base-silver">
                            <span className="podium-number">2</span>
                        </div>
                    </div>

                    {/* 1st Place */}
                    <div className="podium-item podium-first scale-in">
                        <div className="podium-rank-badge pulse">🥇</div>
                        <div className="podium-avatar podium-avatar-gold">{topPerformers[0].name.split(' ').map(n => n[0]).join('')}</div>
                        <h3>{topPerformers[0].name}</h3>
                        <p className="podium-points">{topPerformers[0].points} pts</p>
                        <div className="podium-base podium-base-gold">
                            <span className="podium-number">1</span>
                        </div>
                    </div>

                    {/* 3rd Place */}
                    <div className="podium-item podium-third slide-in-right">
                        <div className="podium-rank-badge">🥉</div>
                        <div className="podium-avatar">{topPerformers[2].name.split(' ').map(n => n[0]).join('')}</div>
                        <h3>{topPerformers[2].name}</h3>
                        <p className="podium-points">{topPerformers[2].points} pts</p>
                        <div className="podium-base podium-base-bronze">
                            <span className="podium-number">3</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="card">
                <div className="leaderboard-filters">
                    <div className="filter-group">
                        <label>Time Period:</label>
                        <select
                            value={timeFilter}
                            onChange={(e) => setTimeFilter(e.target.value)}
                            className="form-control"
                        >
                            <option value="all-time">All Time</option>
                            <option value="this-month">This Month</option>
                            <option value="this-week">This Week</option>
                            <option value="today">Today</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Category:</label>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="form-control"
                        >
                            <option value="overall">Overall</option>
                            <option value="programming">Programming</option>
                            <option value="databases">Databases</option>
                            <option value="web-dev">Web Development</option>
                            <option value="data-science">Data Science</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Leaderboard Table */}
            <div className="card hover-lift">
                <div className="card-header">
                    <h2 className="card-title">Rankings</h2>
                    <span className="badge badge-primary">{leaderboardData.length} Students</span>
                </div>

                <div className="leaderboard-table-container">
                    <table className="table leaderboard-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Student</th>
                                <th>Points</th>
                                <th>Courses</th>
                                <th>Avg Score</th>
                                <th>Trend</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboardData.map((student) => (
                                <tr
                                    key={student.rank}
                                    className={student.isCurrentUser ? 'current-user-row' : ''}
                                >
                                    <td>
                                        <div className="rank-cell">
                                            {student.badge && <span className="rank-badge">{student.badge}</span>}
                                            <span className="rank-number">#{student.rank}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="student-cell">
                                            <div className="student-avatar-small">
                                                {student.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="student-name">
                                                {student.name}
                                                {student.isCurrentUser && <span className="you-badge">You</span>}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="points-value">{student.points}</span>
                                    </td>
                                    <td>{student.courses}</td>
                                    <td>
                                        <span className="score-badge">{student.avgScore}%</span>
                                    </td>
                                    <td>
                                        <span className={`trend-indicator trend-${student.trend}`}>
                                            {student.trend === 'up' && '↑'}
                                            {student.trend === 'down' && '↓'}
                                            {student.trend === 'same' && '→'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Your Stats */}
            <div className="card hover-lift">
                <div className="card-header">
                    <h2 className="card-title">Your Performance</h2>
                </div>
                <div className="your-stats">
                    <div className="stat-card">
                        <div className="stat-icon">🎯</div>
                        <div className="stat-info">
                            <h4>Current Rank</h4>
                            <p className="stat-big">#15</p>
                            <span className="stat-change positive">↑ 3 positions</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⚡</div>
                        <div className="stat-info">
                            <h4>Points to Next Rank</h4>
                            <p className="stat-big">100</p>
                            <div className="progress mt-1">
                                <div className="progress-bar" style={{ width: '75%' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">📈</div>
                        <div className="stat-info">
                            <h4>This Month</h4>
                            <p className="stat-big">+250 pts</p>
                            <span className="stat-change positive">↑ 25% increase</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🎓</div>
                        <div className="stat-info">
                            <h4>Completion Rate</h4>
                            <p className="stat-big">83%</p>
                            <span className="stat-change neutral">Average</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaderboardPage;
