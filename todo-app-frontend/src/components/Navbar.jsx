import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Todo List</div>
      <div className="navbar-links">
        <Link to="/">Todos</Link>
        <Link to="/users">Users</Link>
      </div>
    </nav>
  );
};

export default Navbar;
