import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Register.css';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            await register(email, password);
            navigate("/dashboard");
        } catch (err: any) {
            setError('Failed to create an account. ' + (err.message || ''));
            console.error(err);
        }
    };

    return (
        <div className="register-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <div className="container d-flex justify-content-center">
                <div className="register-card shadow p-4 bg-white rounded">
                    <div className="register-header">
                        <h2>Sign Up</h2>
                        <p className="text-muted">Create your account</p>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                placeholder="name@example.com" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="Enter your password" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="confirmPassword" 
                                placeholder="Confirm your password" 
                                required 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-register w-100">Sign Up</button>
                    </form>
                    <div className="text-center mt-4">
                        <p className="small text-muted">Already have an account? <Link to="/login" style={{ color: '#764ba2', textDecoration: 'none', fontWeight: 600 }}>Log in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;