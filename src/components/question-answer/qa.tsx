import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTopic } from '../../context/TopicContext';
import { type Topic } from '../../services/topicService';
import { addQuestion, fetchQuestions, type QueAns } from '../../services/questionService';
import './qa.css';

interface TopicTreeNodeProps {
    node: Topic;
    selectedId: string | undefined;
    onSelect: (node: Topic) => void;
}

const TopicTreeNode: React.FC<TopicTreeNodeProps> = ({ node, selectedId, onSelect }) => {
    const [expanded, setExpanded] = useState(false);
    const hasChildren = node.childrens && node.childrens.length > 0;
    const isSelected = selectedId === node.id;

    return (
        <li className="list-unstyled">
            <div 
                className={`topic-tree-item ${isSelected ? 'selected' : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(node);
                }}
            >
                {hasChildren && (
                    <span 
                        className="topic-toggle-icon" 
                        onClick={(e) => {
                            e.stopPropagation();
                            setExpanded(!expanded);
                        }}
                    >
                        {expanded ? '▼' : '▶'}
                    </span>
                )}
                {!hasChildren && <span className="topic-toggle-icon"></span>}
                <span className="fw-medium">{node.topicName}</span>
            </div>
            {hasChildren && expanded && (
                <ul className="ps-3 border-start ms-2">
                    {node.childrens.map(child => (
                        <TopicTreeNode 
                            key={child.id} 
                            node={child} 
                            selectedId={selectedId}
                            onSelect={onSelect}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

const QuestionCard: React.FC<{ data: QueAns }> = ({ data }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className={`question-card ${expanded ? 'expanded' : ''}`}>
            <div 
                className="question-header" 
                onClick={() => setExpanded(!expanded)}
            >
                <div className="d-flex align-items-center">
                    {data.imp && <span className="badge bg-warning text-dark me-2">Imp</span>}
                    <h6 className="question-title">{data.question}</h6>
                </div>
                <span className="fs-4" style={{ lineHeight: 0, color: expanded ? '#764ba2' : '#cbd5e0' }}>{expanded ? '−' : '+'}</span>
            </div>
            {expanded && (
                <div className="question-body">
                    <div className="mb-2" style={{ whiteSpace: 'pre-wrap' }}>{data.answer}</div>
                    {data.exp && (
                        <div className="mt-3 p-3 bg-light rounded border-start border-4 border-info">
                            <small className="text-muted d-block mb-1 fw-bold">Explanation:</small>
                            {data.exp}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const QAPage: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const { topics } = useTopic();
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
    const [selectedSubTopic, setSelectedSubTopic] = useState<Topic | null>(null);
    const [questions, setQuestions] = useState<QueAns[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newQuestion, setNewQuestion] = useState({ question: '', answer: '', imp: false, exp: '' });

    const findTopic = (nodes: Topic[], id: string): Topic | null => {
        for (const node of nodes) {
            if (node.id === id) return node;
            if (node.childrens.length > 0) {
                const found = findTopic(node.childrens, id);
                if (found) return found;
            }
        }
        return null;
    };

    useEffect(() => {
        if (topicId && topics.length > 0) {
            const topic = findTopic(topics, topicId);
            setSelectedTopic(topic);
        }
    }, [topicId, topics]);

    useEffect(() => {
        if (selectedSubTopic) {
            fetchQuestions(selectedSubTopic.id)
                .then(setQuestions)
                .catch(console.error);
        } else {
            setQuestions([]);
        }
    }, [selectedSubTopic]);

    const handleSaveQuestion = async () => {
        if (!selectedSubTopic || !newQuestion.question || !newQuestion.answer) return;

        try {
            const savedQuestion = await addQuestion({
                topicId: selectedSubTopic.id,
                question: newQuestion.question,
                answer: newQuestion.answer,
                imp: newQuestion.imp,
                exp: newQuestion.exp
            });
            setQuestions([...questions, savedQuestion]);
            setShowAddModal(false);
            setNewQuestion({ question: '', answer: '', imp: false, exp: '' });
        } catch (error) {
            console.error("Failed to save question:", error);
            alert("Failed to save question. Please try again.");
        }
    };

    if (!selectedTopic) {
        return <div className="p-5 text-center">Select a topic from the dashboard to view details.</div>;
    }

    return (
        <div className="container-fluid qa-page-container">
            <div className="row h-100">
                <div className="col-md-4 col-lg-3 qa-sidebar-col py-4">
                    <h5 className="mb-4 px-2 fw-bold text-primary border-bottom pb-2">{selectedTopic.topicName}</h5>
                    <ul className="ps-0">
                        {selectedTopic.childrens.map(child => (
                            <TopicTreeNode 
                                key={child.id} 
                                node={child} 
                                selectedId={selectedSubTopic?.id}
                                onSelect={setSelectedSubTopic}
                            />
                        ))}
                    </ul>
                </div>
                <div className="col-md-8 col-lg-9 qa-main-col py-4">
                    {selectedSubTopic ? (
                        <div className="px-4">
                            <h3 className="mb-4 fw-bold text-dark">{selectedSubTopic.topicName} <span className="text-muted fs-5 fw-normal">Interview Questions</span></h3>
                            {questions.length === 0 && <p className="text-muted">No questions added yet.</p>}
                            {questions.map(q => (
                                <QuestionCard key={q.id} data={q} />
                            ))}
                            
                            <button className="fab-btn" onClick={() => setShowAddModal(true)}>
                                +
                            </button>
                        </div>
                    ) : (
                        <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted opacity-50">
                            <div style={{ fontSize: '4rem' }}>👈</div>
                            <h4>Select a subtopic to view questions</h4>
                        </div>
                    )}
                </div>
            </div>

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add New Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Question</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={2} 
                                value={newQuestion.question} 
                                onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})} 
                                placeholder="Enter the question"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Answer</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={5} 
                                value={newQuestion.answer} 
                                onChange={(e) => setNewQuestion({...newQuestion, answer: e.target.value})} 
                                placeholder="Enter the answer"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Explanation (Optional)</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                value={newQuestion.exp} 
                                onChange={(e) => setNewQuestion({...newQuestion, exp: e.target.value})} 
                                placeholder="Additional explanation or context"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check 
                                type="checkbox" 
                                label="Mark as Important" 
                                checked={newQuestion.imp}
                                onChange={(e) => setNewQuestion({...newQuestion, imp: e.target.checked})}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleSaveQuestion}>Save Question</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default QAPage;