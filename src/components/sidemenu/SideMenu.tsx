import React, { useState } from 'react';


const SideMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      label: 'Dashboard',
      icon: (
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z" fill="currentColor"/></svg>
      ),
    },
    {
      label: 'Profile',
      icon: (
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 12c2.7 0 8 1.34 8 4v4H4v-4c0-2.66 5.3-4 8-4zm0-2a4 4 0 100-8 4 4 0 000 8z" fill="currentColor"/></svg>
      ),
    },
    {
      label: 'Settings',
      icon: (
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-2a6 6 0 11-12 0 6 6 0 0112 0zm-6-8a2 2 0 100-4 2 2 0 000 4zm6-2a6 6 0 11-12 0 6 6 0 0112 0z" fill="currentColor"/></svg>
      ),
    },
    {
      label: 'Logout',
      icon: (
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M16 13v-1a4 4 0 00-8 0v1H4v7h16v-7h-4zm-6-1a2 2 0 014 0v1h-4v-1zm6 7H8v-5h8v5zm-2-14a2 2 0 100-4 2 2 0 000 4z" fill="currentColor"/></svg>
      ),
    },
  ];

  return (
    <nav className={`text-white d-flex flex-column align-items-stretch position-relative ${collapsed ? 'px-2' : 'px-3'}`}
      style={{
        minWidth: collapsed ? 60 : 220,
        maxWidth: 320,
        minHeight: 'calc(100vh - 64px)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontSize: '1.35rem',
        fontWeight: 600
      }}>
      <button
        className="btn btn-light btn-sm rounded-circle position-absolute top-0 end-0 m-2"
        style={{ zIndex: 2 }}
        onClick={() => setCollapsed((prev) => !prev)}
        aria-label={collapsed ? 'Expand menu' : 'Collapse menu'}
      >
        {collapsed ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 19L18 12L6 5V19Z" fill="currentColor" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="6" width="16" height="2" rx="1" fill="currentColor" />
            <rect x="4" y="11" width="16" height="2" rx="1" fill="currentColor" />
            <rect x="4" y="16" width="16" height="2" rx="1" fill="currentColor" />
          </svg>
        )}
      </button>
      <div className="pt-5 mt-4">
        <ul className="nav flex-column gap-2">
          {menuItems.map((item) => (
            <li key={item.label} className="nav-item d-flex align-items-center gap-2 py-2 px-1 rounded nav-link text-white" style={{ fontWeight: 600, fontSize: '1.35rem' }}>
              <span>{item.icon}</span>
              {!collapsed && item.label}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SideMenu;
