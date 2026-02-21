import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/login/AuthContext';
import Login from './components/login/Login';

// Component to protect routes that require authentication
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

const Home = () => {
    const { user, logout } = useAuth();
    return (
        <div className="container mt-5 text-center">
            <h1>Welcome, {user?.email}!</h1>
            <p className="lead">You are now logged in.</p>
            <button className="btn btn-danger" onClick={logout}>Logout</button>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={
                        <RequireAuth><Home /></RequireAuth>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;