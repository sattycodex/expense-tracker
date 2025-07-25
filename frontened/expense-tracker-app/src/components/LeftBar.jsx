import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Leftbar.css'; // We'll add styling here

const LeftBar = () => {
  return (
    <div className="sidebar d-flex flex-column justify-content-between p-3">
      {/* Top - Profile & Navigation */}
      <div>
        {/* 🧭 Navigation */}
        <ul className="nav flex-column">
          <li className="nav-item">
            <a href="#" className="nav-link text-dark">🏠 Dashboard</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-dark">💰 Transactions</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-dark">📊 Reports</a>
          </li>
        </ul>
      </div>

      {/* ⚙️ Settings (Bottom) */}
      <div className='settings-icon'>
        <hr />
        <a href="#" className="nav-link text-dark">
          ⚙️ Settings
        </a>
      </div>
    </div>
  );
};

export default LeftBar;
