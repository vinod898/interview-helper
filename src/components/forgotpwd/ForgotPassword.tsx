import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    // Casting to any to avoid TypeScript errors if AuthContext type isn't updated yet
    const { resetPassword } = useAuth() as any;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(email);
            setMessage('Check your inbox for further instructions');
        } catch (err) {
            setError('Failed to reset password');
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <div className="card shadow p-4 bg-white rounded">
                    <div className="card-body">
                        <h2 className="text-center mb-4">Password Reset</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {message && <div className="alert alert-success">{message}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <button disabled={loading} className="btn btn-primary w-100" type="submit">
                                Reset Password
                            </button>
                        </form>
                        <div className="w-100 text-center mt-3">
                            <Link to="/login" style={{ color: '#764ba2', textDecoration: 'none', fontWeight: 600 }}>Login</Link>
                        </div>
                    </div>
                </div>
                <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/register" style={{ color: '#764ba2', textDecoration: 'none', fontWeight: 600 }}>Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
