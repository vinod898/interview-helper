import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const technologies = [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
    { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
];

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as any)?.from?.pathname || "/dashboard";

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
        <div className="login-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="container-fluid">
                <div className="row align-items-center">
                    {/* Login Form Section */}
                    <div className="col-md-6 d-flex justify-content-center">
                        <div className="login-card shadow p-5 bg-white rounded" style={{ width: '100%', maxWidth: '500px' }}>
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
                                        <Link to="/forgot-password">Forgot Password?</Link>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-login w-100">Login</button>
                            </form>
                            <div className="text-center mt-3">
                                <p className="text-muted mb-2">OR</p>
                                <button type="button" className="btn btn-outline-dark w-100" onClick={handleGoogleLogin}>
                                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px', marginRight: '10px' }} />
                                    Login with Google
                                </button>
                            </div>
                            <div className="text-center mt-4">
                                <p className="small text-muted">Don't have an account? <Link to="/register" style={{ color: '#764ba2', textDecoration: 'none', fontWeight: 600 }}>Sign up</Link></p>
                            </div>
                        </div>
                    </div>

                    {/* Technologies Section */}
                    <div className="col-md-6 d-none d-md-block">
                        <div className="ps-md-5">
                            <h1 className="display-4 fw-bold text-white mb-4">Master Your Tech Interview</h1>
                            <p className="lead mb-5 text-white-50" style={{ fontSize: '1.25rem' }}>
                                Boost your confidence and land your dream job with our all-in-one preparation platform featuring the latest industry standards.
                            </p>
                            <div className="row g-4">
                                {technologies.map((tech) => (
                                    <div key={tech.name} className="col-4">
                                        <div className="card h-100 border-0 shadow-lg text-center py-4" style={{ transition: 'transform 0.2s', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                                            <div className="card-body p-3">
                                                <img src={tech.icon} alt={tech.name} style={{ width: '60px', height: '60px', marginBottom: '1rem' }} />
                                                <h5 className="card-title mb-0 fw-bold" style={{ color: '#333' }}>{tech.name}</h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;