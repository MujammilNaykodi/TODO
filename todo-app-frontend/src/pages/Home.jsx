import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TodoList from '../components/TodoList';
import AddTodoModal from '../components/AddTodoModal';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({});

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div className="home">
      <Sidebar filters={filters} onFilterChange={handleFilterChange} />
      <TodoList filters={filters} />
      <button className="add-todo-btn" onClick={() => setShowModal(true)}>+ Add Todo</button>
      {showModal && <AddTodoModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Home;
