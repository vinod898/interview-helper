// /Users/vinodkumar/Documents/My Learnings/interview-helper/interview-helper/src/components/header/Header.tsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
    // Casting to any to ensure logout is accessible if types aren't fully defined
    const { logout } = useAuth() as any;
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/dashboard" style={{ color: '#764ba2' }}>
                    Interview Helper
                </Link>
                <div className="d-flex">
                    <button className="btn btn-outline-danger" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Header;
