import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import './styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__link">
        <FaHome className="navbar__icon" />
      </Link>
     
    </nav>
  );
}

export default Navbar;