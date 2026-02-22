import React, { useState, useEffect } from 'react';
import { fetchTopics, saveTopics, type Topic } from '../../services/topicService';

const mockData: Topic[] = [
  {
    "id": "1",
    "topicName": "Programming Languages",
    "icon": "folder",
    "childrens": [
      {
        "id": "1-1",
        "topicName": "Java",
        "icon": "folder",
        "childrens": [
          {
            "id": "1-1-1",
            "topicName": "Core Java",
            "icon": "folder",
            "childrens": [
              { "id": "1-1-1-1", "topicName": "OOP Concepts", "icon": "file", "childrens": [] },
              { "id": "1-1-1-2", "topicName": "Collections Framework", "icon": "file", "childrens": [] },
              { "id": "1-1-1-3", "topicName": "Multithreading & Concurrency", "icon": "file", "childrens": [] },
              { "id": "1-1-1-4", "topicName": "Exception Handling", "icon": "file", "childrens": [] },
              { "id": "1-1-1-5", "topicName": "Java I/O & NIO", "icon": "file", "childrens": [] },
              { "id": "1-1-1-6", "topicName": "Generics", "icon": "file", "childrens": [] },
              { "id": "1-1-1-7", "topicName": "Serialization", "icon": "file", "childrens": [] }
            ]
          },
          {
            "id": "1-1-2",
            "topicName": "Java 8+ Features",
            "icon": "folder",
            "childrens": [
              { "id": "1-1-2-1", "topicName": "Lambda Expressions", "icon": "file", "childrens": [] },
              { "id": "1-1-2-2", "topicName": "Stream API", "icon": "file", "childrens": [] },
              { "id": "1-1-2-3", "topicName": "Optional Class", "icon": "file", "childrens": [] },
              { "id": "1-1-2-4", "topicName": "Functional Interfaces", "icon": "file", "childrens": [] },
              { "id": "1-1-2-5", "topicName": "Method References", "icon": "file", "childrens": [] },
              { "id": "1-1-2-6", "topicName": "Default & Static Methods", "icon": "file", "childrens": [] }
            ]
          },
          {
            "id": "1-1-3",
            "topicName": "JVM Internals",
            "icon": "folder",
            "childrens": [
              { "id": "1-1-3-1", "topicName": "Memory Management (Heap/Stack)", "icon": "file", "childrens": [] },
              { "id": "1-1-3-2", "topicName": "Garbage Collection (GC)", "icon": "file", "childrens": [] },
              { "id": "1-1-3-3", "topicName": "Class Loading Subsystem", "icon": "file", "childrens": [] },
              { "id": "1-1-3-4", "topicName": "JIT Compiler", "icon": "file", "childrens": [] },
              { "id": "1-1-3-5", "topicName": "JVM Architecture", "icon": "file", "childrens": [] }
            ]
          },
          {
            "id": "1-1-4",
            "topicName": "Advanced Java",
            "icon": "folder",
            "childrens": [
              { "id": "1-1-4-1", "topicName": "Reflection API", "icon": "file", "childrens": [] },
              { "id": "1-1-4-2", "topicName": "Annotations", "icon": "file", "childrens": [] },
              { "id": "1-1-4-3", "topicName": "JDBC", "icon": "file", "childrens": [] },
              { "id": "1-1-4-4", "topicName": "Networking (Sockets)", "icon": "file", "childrens": [] }
            ]
          },
          {
            "id": "1-1-5",
            "topicName": "Design Patterns in Java",
            "icon": "folder",
            "childrens": [
              { "id": "1-1-5-1", "topicName": "Singleton Pattern", "icon": "file", "childrens": [] },
              { "id": "1-1-5-2", "topicName": "Factory Pattern", "icon": "file", "childrens": [] },
              { "id": "1-1-5-3", "topicName": "Observer Pattern", "icon": "file", "childrens": [] },
              { "id": "1-1-5-4", "topicName": "Builder Pattern", "icon": "file", "childrens": [] },
              { "id": "1-1-5-5", "topicName": "Decorator Pattern", "icon": "file", "childrens": [] }
            ]
          }
        ]
      },
      { "id": "1-2", "topicName": "Python", "icon": "file", "childrens": [] },
      { "id": "1-3", "topicName": "JavaScript", "icon": "file", "childrens": [] },
      { "id": "1-4", "topicName": "TypeScript", "icon": "file", "childrens": [] },
      { "id": "1-5", "topicName": "C#", "icon": "file", "childrens": [] },
      { "id": "1-6", "topicName": "C++", "icon": "file", "childrens": [] },
      { "id": "1-7", "topicName": "Go", "icon": "file", "childrens": [] },
      { "id": "1-8", "topicName": "Rust", "icon": "file", "childrens": [] },
      { "id": "1-9", "topicName": "Kotlin", "icon": "file", "childrens": [] },
      { "id": "1-10", "topicName": "Swift", "icon": "file", "childrens": [] }
    ]
  },
  {
    "id": "2",
    "topicName": "Frontend",
    "icon": "folder",
    "childrens": [
      { "id": "2-1", "topicName": "HTML", "icon": "file", "childrens": [] },
      { "id": "2-2", "topicName": "CSS", "icon": "file", "childrens": [] },
      { "id": "2-3", "topicName": "React", "icon": "file", "childrens": [] },
      { "id": "2-4", "topicName": "Angular", "icon": "file", "childrens": [] },
      { "id": "2-5", "topicName": "Vue", "icon": "file", "childrens": [] },
      { "id": "2-6", "topicName": "Next.js", "icon": "file", "childrens": [] }
    ]
  },
  {
    "id": "3",
    "topicName": "Backend",
    "icon": "folder",
    "childrens": [
      { "id": "3-1", "topicName": "Node.js", "icon": "file", "childrens": [] },
      { "id": "3-2", "topicName": "Spring Boot", "icon": "file", "childrens": [] },
      { "id": "3-3", "topicName": "Django", "icon": "file", "childrens": [] },
      { "id": "3-4", "topicName": ".NET Core", "icon": "file", "childrens": [] },
      { "id": "3-5", "topicName": "Express.js", "icon": "file", "childrens": [] }
    ]
  },
  {
    "id": "4",
    "topicName": "Databases",
    "icon": "folder",
    "childrens": [
      { "id": "4-1", "topicName": "MySQL", "icon": "file", "childrens": [] },
      { "id": "4-2", "topicName": "PostgreSQL", "icon": "file", "childrens": [] },
      { "id": "4-3", "topicName": "MongoDB", "icon": "file", "childrens": [] },
      { "id": "4-4", "topicName": "Oracle", "icon": "file", "childrens": [] },
      { "id": "4-5", "topicName": "Redis", "icon": "file", "childrens": [] }
    ]
  },
  {
    "id": "5",
    "topicName": "DevOps & Cloud",
    "icon": "folder",
    "childrens": [
      { "id": "5-1", "topicName": "AWS", "icon": "file", "childrens": [] },
      { "id": "5-2", "topicName": "Azure", "icon": "file", "childrens": [] },
      { "id": "5-3", "topicName": "Google Cloud", "icon": "file", "childrens": [] },
      { "id": "5-4", "topicName": "Docker", "icon": "file", "childrens": [] },
      { "id": "5-5", "topicName": "Kubernetes", "icon": "file", "childrens": [] },
      { "id": "5-6", "topicName": "CI/CD", "icon": "file", "childrens": [] }
    ]
  },
  {
    "id": "6",
    "topicName": "Data & AI",
    "icon": "folder",
    "childrens": [
      { "id": "6-1", "topicName": "Machine Learning", "icon": "file", "childrens": [] },
      { "id": "6-2", "topicName": "Deep Learning", "icon": "file", "childrens": [] },
      { "id": "6-3", "topicName": "Data Science", "icon": "file", "childrens": [] },
      { "id": "6-4", "topicName": "TensorFlow", "icon": "file", "childrens": [] },
      { "id": "6-5", "topicName": "PyTorch", "icon": "file", "childrens": [] }
    ]
  }
];

const TopicRow: React.FC<{ topic: Topic; onAdd: (parentId: string) => void }> = ({ topic, onAdd }) => {
    const [expanded, setExpanded] = useState(false);
    const hasChildren = topic.childrens && topic.childrens.length > 0;

    return (
        <>
            <tr className={expanded ? "table-active" : ""}>
                <td className="align-middle text-center" style={{ width: '60px' }}>
                    {hasChildren && (
                        <button 
                            className={`btn btn-sm ${expanded ? 'btn-primary' : 'btn-white border'} rounded-circle p-0 d-inline-flex align-items-center justify-content-center shadow-sm`}
                            onClick={() => setExpanded(!expanded)}
                            style={{ width: '24px', height: '24px', transition: 'all 0.2s ease' }}
                        >
                            <span style={{ lineHeight: 1, fontSize: '14px' }}>{expanded ? '−' : '+'}</span>
                        </button>
                    )}
                </td>
                <td className="align-middle">
                    <div className="d-flex align-items-center">
                        <div className={`d-flex align-items-center justify-content-center rounded p-2 me-3 ${topic.icon === 'folder' ? 'bg-warning-subtle' : 'bg-primary-subtle'}`} style={{ width: '40px', height: '40px' }}>
                            <span className="fs-5">{topic.icon === 'folder' ? '📁' : '📄'}</span>
                        </div>
                        <div>
                            <div className="fw-bold text-dark">{topic.topicName}</div>
                            {hasChildren && <div className="small text-muted">{topic.childrens.length} items</div>}
                        </div>
                    </div>
                </td>
                <td className="align-middle">
                    <span className="badge bg-light text-dark border font-monospace">{topic.id}</span>
                </td>
                <td className="align-middle text-end pe-4">
                    <button className="btn btn-sm btn-outline-primary rounded-pill px-3" onClick={() => onAdd(topic.id)}>
                        + Add Subtopic
                    </button>
                </td>
            </tr>
            {expanded && hasChildren && (
                <tr>
                    <td colSpan={4} className="p-0 border-0">
                        <div className="ps-5 py-2 bg-light border-bottom shadow-inner">
                            <table className="table table-hover mb-0 table-borderless bg-transparent">
                                <tbody>
                                    {topic.childrens.map((child) => (
                                        <TopicRow key={child.id} topic={child} onAdd={onAdd} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

const Settings: React.FC = () => {
    const [topics, setTopics] = useState<Topic[]>([]);

    useEffect(() => {
        const loadTopics = async () => {
            const data = await fetchTopics();
            console.log("Fetched topics:", data);
            if (data && data.length > 0) {
                setTopics(data);
            } else {
                setTopics(mockData);
            }
        };
        loadTopics();
    }, []);

    const handleAddTopic = async (parentId: string | null) => {
        const name = window.prompt("Enter topic name:");
        if (!name) return;

        const newTopic: Topic = {
            id: Date.now().toString(),
            topicName: name,
            icon: 'file',
            childrens: []
        };

        let newTopics: Topic[] = [];
        if (parentId === null) {
            newTopics = [...topics, newTopic];
        } else {
            const addNode = (nodes: Topic[]): Topic[] => {
                return nodes.map(node => {
                    if (node.id === parentId) {
                        return { ...node, childrens: [...node.childrens, newTopic], icon: 'folder' };
                    }
                    return { ...node, childrens: addNode(node.childrens) };
                });
            };
            newTopics = addNode(topics);
        }
        
        const previousTopics = topics;
        setTopics(newTopics);
        try {
            await saveTopics(newTopics);
        } catch (error) {
            console.error("Failed to save topics:", error);
            setTopics(previousTopics);
            alert("Failed to save topic. Missing or insufficient permissions.");
        }
    };

    return (
        <div className="container-fluid py-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                    <h2 className="fw-bold text-primary mb-1">Settings</h2>
                    <p className="text-muted mb-0">Manage your interview topics and preferences</p>
                </div>
                <button className="btn btn-primary shadow-sm" onClick={() => handleAddTopic(null)}>
                    <span className="me-2">+</span> Add New Topic
                </button>
            </div>
            
            <div className="card shadow border-0 rounded-3 overflow-hidden">
                <div className="card-header bg-white py-3 px-4 border-bottom">
                    <div className="d-flex align-items-center">
                        <h5 className="mb-0 fw-bold text-dark">Topics Hierarchy</h5>
                        <span className="badge bg-primary-subtle text-primary ms-3 rounded-pill">{topics.length} Root Topics</span>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0 align-middle">
                            <thead className="bg-light">
                                <tr>
                                    <th className="py-3 ps-4 text-uppercase text-muted small fw-bold" style={{ width: '60px' }}></th>
                                    <th className="py-3 text-uppercase text-muted small fw-bold">Topic Name</th>
                                    <th className="py-3 text-uppercase text-muted small fw-bold">ID</th>
                                    <th className="py-3 text-uppercase text-muted small fw-bold text-end pe-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topics.map((topic) => (
                                    <TopicRow key={topic.id} topic={topic} onAdd={handleAddTopic} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer bg-white py-3 px-4 border-top">
                    <small className="text-muted">Showing all topics</small>
                </div>
            </div>
        </div>
    );
};

export default Settings;