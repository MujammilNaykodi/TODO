import React from 'react';

const Sidebar = ({ filters, onFilterChange }) => {
  return (
    <div className="sidebar">
      <h3>Filters</h3>
      <div>
        <label>By Tag</label>
        <input type="text" onChange={(e) => onFilterChange('tag', e.target.value)} />
      </div>
      <div>
        <label>By Priority</label>
        <select onChange={(e) => onFilterChange('priority', e.target.value)}>
          <option value="">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
