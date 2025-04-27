import React, { useState } from 'react';

const AddTodoModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    priority: 'Medium',
    users: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Todo Added:', formData);
    onClose(); // Close modal after save
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Add Todo</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
          <textarea name="description" placeholder="Description" onChange={handleChange} required />
          <input type="text" name="tags" placeholder="Tags (comma separated)" onChange={handleChange} />
          <div className="priority-section">
            <label>Priority:</label>
            <label><input type="radio" name="priority" value="High" onChange={handleChange} /> High</label>
            <label><input type="radio" name="priority" value="Medium" defaultChecked onChange={handleChange} /> Medium</label>
            <label><input type="radio" name="priority" value="Low" onChange={handleChange} /> Low</label>
          </div>
          <input type="text" name="users" placeholder="Mention Users (@username)" onChange={handleChange} />
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodoModal;
