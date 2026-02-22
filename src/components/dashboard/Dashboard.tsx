import React, { useState } from 'react';

import Carousel from 'react-bootstrap/Carousel';
import './Dashboard.css';

const technologies = [
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
];

// Helper to chunk array into groups of 3
function chunkArray<T>(arr: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

const Dashboard: React.FC = () => {

    const techChunks = chunkArray(technologies, 5);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelect = (selectedIndex: number) => {
        setActiveIndex(selectedIndex);
    };


        return (
                <>
                                        <div className=" p-4 rounded text-white shadow" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                                <p className="lead opacity-75">Select a technology to prepare for your interview</p>
                                        </div>
                                               {/* Bootstrap Carousel for technologies (3 per slide) */}
                                               <div className="mt-4 w-100">
                                                   <Carousel
                                                       indicators={false}
                                                       controls={true}
                                                       interval={null}
                                                       className="w-100"
                                                       activeIndex={activeIndex}
                                                       onSelect={handleSelect}
                                                   >
                                                       {techChunks.map((chunk, idx) => (
                                                           <Carousel.Item key={idx} style={{ minHeight: 400 }}>
                                                               <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 400 }}>
                                                               <div className="d-flex flex-row justify-content-center align-items-stretch w-100 gap-4">
                                                                   {chunk.map((tech) => (
                                                                       <div key={tech.name} className="d-flex flex-column align-items-center justify-content-center p-4" style={{ background: 'linear-gradient(135deg, #fff 70%, #e9e4f0 100%)', borderRadius: 24, minWidth: 200, minHeight: 300, boxShadow: '0 4px 16px rgba(118, 75, 162, 0.10)' }}>
                                                                           <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '50%', padding: 18, marginBottom: 18, boxShadow: '0 2px 8px #764ba233' }}>
                                                                               <img src={tech.icon} alt={tech.name} style={{ width: 64, height: 64, filter: 'drop-shadow(0 2px 8px #764ba244)' }} />
                                                                           </div>
                                                                           <span className="fw-bold" style={{ color: '#764ba2', fontSize: '1.25rem', letterSpacing: 0.5 }}>{tech.name}</span>
                                                                       </div>
                                                                   ))}
                                                               </div>
                                                               </div>
                                                           </Carousel.Item>
                                                       ))}
                                                   </Carousel>
                                               </div>
                </>
        );
};

export default Dashboard;