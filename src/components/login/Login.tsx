import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as any)?.from?.pathname || "/";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError('Failed to login. Please check your credentials.');
            console.error(err);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate(from, { replace: true });
        } catch (err) {
            setError('Failed to login with Google.');
            console.error(err);
        }
    };

    return (
        <div className="login-container">
            <div className="container d-flex justify-content-center">
                <div className="login-card">
                    <div className="login-header">
                        <h2>Log in</h2>
                        <p className="text-muted">Please login to your account</p>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
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
                    <div className="text-center mt-3">
                        <p className="text-muted mb-2">OR</p>
                        <button type="button" className="btn btn-outline-dark w-100" onClick={handleGoogleLogin}>
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px', marginRight: '10px' }} />
                            Login with Google
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <p className="small text-muted">Don't have an account? <a href="#" style={{ color: '#764ba2', textDecoration: 'none', fontWeight: 600 }}>Sign up</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;