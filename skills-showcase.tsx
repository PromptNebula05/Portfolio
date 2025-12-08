// =========================================
// REACT SKILLS SHOWCASE COMPONENT
// =========================================

import React, { useState, useEffect } from 'react';

// TypeScript interfaces for type safety
interface Skill {
    id: number;
    name: string;
    category: string;
    proficiency: number;
    icon: string;
    description: string;
}

interface SkillsShowcaseProps {
    title?: string;
    showFilters?: boolean;
}

// Sample skills data
const SKILLS_DATA: Skill[] = [
    {
        id: 1,
        name: 'HTML5',
        category: 'Frontend',
        proficiency: 90,
        icon: '🌐',
        description: 'Semantic markup, accessibility, modern HTML5 APIs'
    },
    {
        id: 2,
        name: 'CSS3',
        category: 'Frontend',
        proficiency: 90,
        icon: '🎨',
        description: 'Flexbox, Grid, animations, responsive design'
    },
    {
        id: 3,
        name: 'JavaScript',
        category: 'Frontend',
        proficiency: 85,
        icon: '⚡',
        description: 'ES6+, DOM manipulation, async programming'
    },
    {
        id: 4,
        name: 'React',
        category: 'Frontend',
        proficiency: 80,
        icon: '⚛️',
        description: 'Components, hooks, state management'
    },
    {
        id: 5,
        name: 'TypeScript',
        category: 'Frontend',
        proficiency: 75,
        icon: '📘',
        description: 'Type safety, interfaces, typed components'
    },
    {
        id: 6,
        name: 'Python',
        category: 'Backend',
        proficiency: 85,
        icon: '🐍',
        description: 'Scripting, automation, data structures'
    },
    {
        id: 7,
        name: 'Node.js',
        category: 'Backend',
        proficiency: 70,
        icon: '🟢',
        description: 'Server-side JavaScript, APIs'
    },
    {
        id: 1,
        name: 'Linux',
        category: 'Systems',
        proficiency: 90,
        icon: '🐧',
        description: 'System administration, bash scripting'
    },
    {
        id: 9,
        name: 'Active Directory',
        category: 'Systems',
        proficiency: 88,
        icon: '🔐',
        description: 'User management, Group Policy, PowerShell'
    },
    {
        id: 10,
        name: 'Docker',
        category: 'DevOps',
        proficiency: 75,
        icon: '🐳',
        description: 'Containerization, deployment'
    },
    {
        id: 11,
        name: 'Network Security',
        category: 'Security',
        proficiency: 82,
        icon: '🛡️',
        description: 'Penetration testing, security analysis'
    },
    {
        id: 12,
        name: 'Git',
        category: 'DevOps',
        proficiency: 85,
        icon: '📚',
        description: 'Version control, collaboration'
    }
];

const SkillsShowcase: React.FC<SkillsShowcaseProps> = ({
    title = 'Technical Skills',
    showFilters = true
}) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [filteredSkills, setFilteredSkills] = useState<Skill[]>(SKILLS_DATA);
    const [sortBy, setSortBy] = useState<'name' | 'proficiency'>('proficiency');
    const [animationTrigger, setAnimationTrigger] = useState<boolean>(false);

    // Get unique categories
    const categories = ['All', ...Array.from(new Set(SKILLS_DATA.map(skill => skill.category)))];

    // Filter and sort skills
    useEffect(() => {
        let filtered = selectedCategory === 'All'
            ? SKILLS_DATA
            : SKILLS_DATA.filter(skill => skill.category === selectedCategory);

        // Sort skills
        filtered = [...filtered].sort((a, b) => {
            if (sortBy === 'proficiency') {
                return b.proficiency - a.proficiency;
            }
            return a.name.localeCompare(b.name);
        });

        setFilteredSkills(filtered);
        setAnimationTrigger(true);

        // Reset animation trigger
        setTimeout(() => setAnimationTrigger(false), 500);
    }, [selectedCategory, sortBy]);

    // Calculate average proficiency
    const averageProficiency = filteredSkills.length > 0
        ? Math.round(filteredSkills.reduce((sum, skill) => sum + skill.proficiency, 0) / filteredSkills.length)
        : 0;

    return (
        <div className="skills-showcase">
            <div className="skills-header">
                <h2>{title}</h2>
                <div className="skills-stat">
                    <div className="stat-item">
                        <span className="stat-value">{filteredSkills.length}</span>
                        <span className="stat-label">Skills</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{averageProficiency}%</span>
                        <span className="stat-label">Avg. Proficiency</span>
                    </div>
                </div>
            </div>

            {showFilters && (
                <div className="skills-controls">
                    <div className="filter-group">
                        <label>Category</label>
                        <div className="category-buttons">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="sory-group">
                        <label>Sort by:</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'name' | 'proficiency')}
                            className="sort-select"
                        >
                            <option value="proficiency">Proficiency</option>
                            <option value="name">Name</option>
                        </select>
                    </div>
                </div>
            )}

            <div className={`skills-grid ${animationTrigger ? 'animating' : ''}`}>
                {filteredSkills.map((skill, index) => (
                    <SkillCard
                        key={skill.id}
                        skill={skill}
                        delay={index * 50}
                    />
                ))}
            </div>

            {filteredSkills.length === 0 && (
                <div className="no-skills">
                    <p>No skills found in this category.</p>
                </div>
            )}
        </div>
    );
};

// Skill Card Component
interface SkillCardProps {
    skill: Skill;
    delay: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, delay }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [animateProgress, setAnimateProgress] = useState<boolean>(false);

    useEffect(() => {
        // Trigger progress bar animation after component mounts
        const timer = setTimeout(() => setAnimateProgress(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    const getProficiencyColor = (proficiency: number): string => {
        if (proficiency >= 85) return '#10b981'; // Green
        if (proficiency >= 70) return '#3b82f6'; // Bluee
        if (proficiency >= 50) return '#f59e0b'; // Orange
        return '#ef4444'; // Red
    };

    return (
        <div
            className="skill-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ animationDelay: `${delay}ms`}}
        >
            <div className="skill-icon">{skill.icon}</div>
            <div className="skill-content">
                <div className="skill-header">
                    <h3>{skill.name}</h3>
                    <span className="skill-category">{skill.category}</span>
                </div>
                <p className="skill-description">
                    {isHovered ? skill.description : skill.description.substring(0, 40) + '...'}
                </p>
                <div className="skill-progress-container">
                    <div className="progress-info">
                        <span>Proficiency</span>
                        <span className="proficiency-value">{skill.proficiency}%</span>
                    </div>
                    <div className="progress-bar-bg">
                        <div
                            className="progress-bar-fill"
                            style={{
                                width: animateProgress ? `${skill.proficiency}%` : '0%',
                                backgroundColor: getProficiencyColor(skill.proficiency)
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Export components
export default SkillsShowcase;
export { SkillCard};

// CSS Styles
const styles = `
.skills-showcase {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;    
}

.skills-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flexwrap: wrap
    gap: 1rem;
}

.skills-header h2 {
    color: #2563eb;
    font-size: 2rem
}

.skill-stats {
    display: flex;
    gap: 2rem;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #2563eb;
}

.stat-label {
    font-size: 0.875rem;
    color: #64748b;
}

.skills-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background-color: #f8fafc;
    border-radius: 0.75rem;
    flex-wrap: wrap;
    gap: 1.5rem;
}

.filter-group,
.sort-group {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.filter-group label,
.sort-group label {
    font-weight: 600;
    color: #334155;
}

.category-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.categroy-btn {
    padding: 0.5rem 1rem;
    background-color: #fff;
    color: #64748b;
    border: 2px solid #e2e8f0;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.category-btn:hover {
    border-color: #2563eb;
    color: #2563eb;
}

.category-btn.active {
    background-color: #2563eb;
    color: #fff;
    border-color: #2563eb;
}

.sort-select {
    padding: 0.5rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    background: white;
}

.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

.skills-grid.animating .skill-card {
    animation: fadeInUp 0.5s ease forwards;
    opacity: 0;
}

.skill-card {
    background: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

skill-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
}

.skill-icon {
    font-size: 3rem;
    margin-bottom; 1rem;
}

.skill-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.skill-header {
    dislplay: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.skill-header h3 {
    color: #0f172a;
    font-size: 1.25rem;
    margin: 0;
}

.skill-category {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    background-color: #e0e7ff;
    color: #2563eb;
    border-radius: 0.375rem;
    font-weight: 600;
}

.skill-description {
    color: #64748b;
    font-size: 0.875rem;
    line-height: 1.6rem;
    min-height: 2.5rem;
}

.skill-progress-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.progress-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: #64748b;
}

.proficiency-value {
    font-weight: 700;
    color: #0f172a;
}

.progress-bar-bg {
    width: 100%;
    height: 8px;
    background-color: #e2e8f0;
    border-radius: 0.375rem;
    overflow: hidden;
}

.progress-bar-fill {
    height: 100%;
    transition: width 1s ease;
    border-radius: 0.375rem;
}

.no-skills {
    text-align: center;
    padding: 3rem;
    color: #64749b;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .skills-header {
        flex-direction: column;
        text-align: center;
    }

    .skills-controls {
        flex-direction: column;
        align-items: stretch;
    }

    .filter-group,
    .sort-group {
        flex-direction: column;
        align-items: stretch;
    }

    .skills-grid {
        grid-template-columns: 1fr;
    }
}
`;
