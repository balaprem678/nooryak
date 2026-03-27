"use client"


import React, { useState } from 'react';
import './leadingedge.scss';

const technologies = {
  frontend: [
    { name: 'HTML', icon: '🔶', color: '#E34F26' },
    { name: 'CSS3', icon: '🔷', color: '#1572B6' },
    { name: 'JavaScript', icon: '🟨', color: '#F7DF1E' },
    { name: 'Bootstrap', icon: '🅱️', color: '#7952B3' },
    { name: 'Vue', icon: '💚', color: '#41B883' },
    { name: 'Angular', icon: '🔺', color: '#DD0031' },
    { name: 'Flutter', icon: '🔵', color: '#02569B' },
    { name: 'Ionic', icon: '🔵', color: '#3880FF' },
    { name: 'React Native', icon: '⚛️', color: '#61DAFB' },
    { name: 'NPM', icon: '📦', color: '#CB3837' },
    { name: 'jQuery', icon: '🌊', color: '#0769AD' },
    { name: 'TypeScript', icon: '🔷', color: '#3178C6' },
    { name: 'Next.js', icon: '▲', color: '#000000' },
  ],
};

const categories = ['Frontend', 'Backend', 'CMS', 'Infra & DevOps'];

const Leadingedge = () => {
  const [activeCategory, setActiveCategory] = useState('Frontend');

  return (
    <section className="tech-stack">
      <div className="container">
        <div className="header">
          <h2 className="title">Leading-Edge Technology</h2>
          <p className="subtitle">Innovation is our compass; excellence is our path</p>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="tech-grid">
          {technologies.frontend.map((tech, index) => (
            <div 
              key={index} 
              className="tech-card"
             
            >
              <div className="icon-wrapper">
                <span className="icon">{tech.icon}</span>
              </div>
              <p className="tech-name">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadingedge;