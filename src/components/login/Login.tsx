import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            login({ email });
            navigate(from, { replace: true });
        }
    };

    return (
        <div className="login-container">
            <div className="container d-flex justify-content-center">
                <div className="login-card">
                    <div className="login-header">
                        <h2>Welcome Back</h2>
                        <p className="text-muted">Please login to your account</p>
                    </div>
                    <form onSubmit={handleLogin}>
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
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="rememberMe" />
                                <label className="form-check-label small" htmlFor="rememberMe">Remember me</label>
                            </div>
                            <div className="forgot-password">
                                <a href="#">Forgot Password?</a>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-login">Login</button>
                    </form>
                    <div className="text-center mt-4">
                        <p className="small text-muted">Don't have an account? <a href="#" style={{ color: '#764ba2', textDecoration: 'none', fontWeight: 600 }}>Sign up</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;