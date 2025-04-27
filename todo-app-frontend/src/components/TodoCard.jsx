import React from 'react';

const TodoCard = ({ todo }) => {
  return (
    <div className="todo-card">
      <h4>{todo.title}</h4>
      <p>{todo.description}</p>
      <div className="tags">
        {todo.tags.map((tag, index) => (
          <span className="tag" key={index}>{tag}</span>
        ))}
      </div>
      <div className="priority">Priority: {todo.priority}</div>
      <div className="mentions">
        {todo.users.map((user, index) => (
          <span key={index}>{user}</span>
        ))}
      </div>
      <div className="card-actions">
        <button>Edit</button>
        <button>Delete</button>
        <button>Notes</button>
      </div>
    </div>
  );
};

export default TodoCard;
