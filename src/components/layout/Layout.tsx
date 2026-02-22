import React from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css';
import Header from '../header/Header';
import SideMenu from '../sidemenu/SideMenu';

const Layout: React.FC = () => {
    return (
        <div className="dashboard-root">
            <div className="dashboard-header-overlay">
                <Header />
            </div>
            <div className="dashboard-flex">
                <SideMenu />
                <div className="dashboard-content mt-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;