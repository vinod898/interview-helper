import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const Header: React.FC = () => {
    // Casting to any to ensure logout is accessible if types aren't fully defined
    const { logout, user } = useAuth() as any;
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        setImageError(false);
    }, [user?.photoURL]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="container-fluid px-5">
                <Link className="navbar-brand fw-bold fs-3" to="/dashboard">
                    <img src={logo} alt="Logo" className="me-2 bg-grey " style={{ width: '150px', height: '100px' }} />
                    Interview Helper
                </Link>
                <div className="d-flex align-items-center position-relative">
                    <div className="dropdown">
                        <button
                            className="btn btn-link text-decoration-none dropdown-toggle border-0 shadow-none"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <div className="d-flex align-items-center justify-content-center bg-white rounded-circle shadow-sm me-2 fw-bold fs-4" style={{ width: '45px', height: '45px', color: '#764ba2', overflow: 'hidden' }}>
                                {user?.photoURL && !imageError ? (
                                    <img src={user.photoURL} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={() => setImageError(true)} />
                                ) : (
                                    user?.email?.charAt(0).toUpperCase() || 'U'
                                )}
                            </div>
                        </button>
                        <ul className={`dropdown-menu dropdown-menu-end mt-2 ${showDropdown ? 'show' : ''}`} style={{ right: 0, left: 'auto' }}>
                            <li><span className="dropdown-item-text text-muted small">{user?.email}</span></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;