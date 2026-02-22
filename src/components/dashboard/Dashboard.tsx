import React, { useState } from 'react';

import Carousel from 'react-bootstrap/Carousel';
import './Dashboard.css';
import { useTopic } from '../../context/TopicContext';
import type { Topic } from '../../services/topicService';

// Helper to chunk array into groups of 3
function chunkArray<T>(arr: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

const Dashboard: React.FC = () => {

    const { topics } = useTopic();
    const technologies = topics.reduce((acc: Topic[], topic) => {
        if (topic.childrens.length > 0) {
            acc.push(...topic.childrens);
        }
        return acc;
    }, []);
    console.log("Technologies for carousel:", technologies);
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
                                        <div key={tech.id} className="d-flex flex-column align-items-center justify-content-center p-4" style={{ background: 'linear-gradient(135deg, #fff 70%, #e9e4f0 100%)', borderRadius: 24, minWidth: 200, minHeight: 300, boxShadow: '0 4px 16px rgba(118, 75, 162, 0.10)' }}>
                                            <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '50%', padding: 18, marginBottom: 18, boxShadow: '0 2px 8px #764ba233', width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {tech.icon.startsWith('http') ? (
                                                    <img src={tech.icon} alt={tech.topicName} style={{ width: 64, height: 64, filter: 'drop-shadow(0 2px 8px #764ba244)' }} />
                                                ) : (
                                                    <span style={{ fontSize: '2.5rem' }}>{tech.icon === 'folder' ? '📁' : '📄'}</span>
                                                )}
                                            </div>
                                            <span className="fw-bold" style={{ color: '#764ba2', fontSize: '1.25rem', letterSpacing: 0.5 }}>{tech.topicName}</span>
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