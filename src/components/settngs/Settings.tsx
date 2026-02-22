import React, { useState } from 'react';
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';
import { type Topic } from '../../services/topicService';
import { useTopic } from '../../context/TopicContext';

const findTopicById = (topics: Topic[], id: string): Topic | null => {
    for (const topic of topics) {
        if (topic.id === id) return topic;
        if (topic.childrens.length > 0) {
            const found = findTopicById(topic.childrens, id);
            if (found) return found;
        }
    }
    return null;
};

const TopicRow: React.FC<{ topic: Topic; selectedId: string | null; onSelect: (id: string) => void }> = ({ topic, selectedId, onSelect }) => {
    const [expanded, setExpanded] = useState(false);
    const hasChildren = topic.childrens && topic.childrens.length > 0;
    const isSelected = selectedId === topic.id;

    return (
        <>
            <tr 
                className={isSelected ? "table-active" : ""} 
                onClick={() => onSelect(topic.id)}
                style={{ cursor: 'pointer' }}
            >
                <td className="align-middle text-center" style={{ width: '60px' }}>
                    {hasChildren && (
                        <button 
                            className={`btn btn-sm ${expanded ? 'btn-primary' : 'btn-white border'} rounded-circle p-0 d-inline-flex align-items-center justify-content-center shadow-sm`}
                            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
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
              </tr>
            {expanded && hasChildren && (
                <tr>
                    <td colSpan={3} className="p-0 border-0">
                        <div className="ps-5 py-2 bg-light border-bottom shadow-inner">
                            <table className="table table-hover mb-0 table-borderless bg-transparent">
                                <tbody>
                                    {topic.childrens.map((child) => (
                                        <TopicRow key={child.id} topic={child} selectedId={selectedId} onSelect={onSelect} />
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
    const { topics, updateTopics } = useTopic();
    const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [topicName, setTopicName] = useState('');
    const [topicIcon, setTopicIcon] = useState('');
    const [targetParentId, setTargetParentId] = useState<string | null>(null);

    const handleShowAdd = (parentId: string | null) => {
        setModalMode('add');
        setTargetParentId(parentId);
        setTopicName('');
        setTopicIcon('file');
        setShowModal(true);
    };

    const handleShowEdit = () => {
        if (!selectedTopicId) return;
        const topic = findTopicById(topics, selectedTopicId);
        if (topic) {
            setModalMode('edit');
            setTopicName(topic.topicName);
            setTopicIcon(topic.icon);
            setShowModal(true);
        }
    };

    const handleSave = async () => {
        if (!topicName) return;

        let newTopics = [...topics];

        if (modalMode === 'add') {
            const newTopic: Topic = {
                id: Date.now().toString(),
                topicName: topicName,
                icon: topicIcon || 'file',
                parentId: targetParentId,
                childrens: []
            };

            if (targetParentId === null) {
                newTopics.push(newTopic);
            } else {
                const addNode = (nodes: Topic[]): Topic[] => {
                    return nodes.map(node => {
                        if (node.id === targetParentId) {
                            return { ...node, childrens: [...node.childrens, newTopic], icon: 'folder' };
                        }
                        return { ...node, childrens: addNode(node.childrens) };
                    });
                };
                newTopics = addNode(newTopics);
            }
        } else {
            const editNode = (nodes: Topic[]): Topic[] => {
                return nodes.map(node => {
                    if (node.id === selectedTopicId) {
                        return { ...node, topicName: topicName, icon: topicIcon };
                    }
                    return { ...node, childrens: editNode(node.childrens) };
                });
            };
            newTopics = editNode(newTopics);
        }
        
        try {
            await updateTopics(newTopics);
            setShowModal(false);
        } catch (error) {
            console.error("Failed to save topics:", error);
            alert("Failed to save topic.");
        }
    };

    const handleDeleteTopic = async () => {
        if (!selectedTopicId) return;
        if (!window.confirm("Are you sure you want to delete this topic?")) return;

        const deleteNode = (nodes: Topic[]): Topic[] => {
            return nodes.filter(node => node.id !== selectedTopicId).map(node => ({
                ...node,
                childrens: deleteNode(node.childrens)
            }));
        };

        const newTopics = deleteNode(topics);
        setSelectedTopicId(null);

        try {
            await updateTopics(newTopics);
        } catch (error) {
            console.error("Failed to save topics:", error);
            alert("Failed to save topic.");
        }
    };

    return (
        <div className="container-fluid py-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                    <h2 className="fw-bold text-primary mb-1">Settings</h2>
                    <p className="text-muted mb-0">Manage your interview topics and preferences</p>
                </div>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-actions" className="shadow-sm">
                        Actions
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                        <Dropdown.Item onClick={() => handleShowAdd(null)}>+ Add Root Topic</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleShowAdd(selectedTopicId)} disabled={!selectedTopicId}>+ Add Subtopic</Dropdown.Item>
                        <Dropdown.Item onClick={handleShowEdit} disabled={!selectedTopicId}>Edit</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleDeleteTopic} disabled={!selectedTopicId} className="text-danger">Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
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
                                </tr>
                            </thead>
                            <tbody>
                                {topics.map((topic) => (
                                    <TopicRow key={topic.id} topic={topic} selectedId={selectedTopicId} onSelect={setSelectedTopicId} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer bg-white py-3 px-4 border-top">
                    <small className="text-muted">Showing all topics</small>
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalMode === 'add' ? 'Add Topic' : 'Edit Topic'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Topic Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter topic name" value={topicName} onChange={(e) => setTopicName(e.target.value)} autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Icon URL (or 'file'/'folder')</Form.Label>
                            <Form.Control type="text" placeholder="Enter icon URL" value={topicIcon} onChange={(e) => setTopicIcon(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Settings;