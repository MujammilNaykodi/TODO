import React, { useEffect, useState } from 'react';
import { getTodos, createTodo, deleteTodo } from '../services/api'; // Update path if necessary

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch todos for a specific user
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const fetchedTodos = await getTodos('username'); // Replace with actual username
        setTodos(fetchedTodos);
      } catch (error) {
        console.error('Error fetching todos', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Handle creating a new todo
  const handleCreateTodo = async () => {
    if (newTodo.trim()) {
      const todoData = {
        title: newTodo,
        user: 'username', // Replace with actual username
      };

      try {
        // Create the todo
        const response = await createTodo(todoData);
        console.log('Todo created:', response);  // Log the response

        setNewTodo('');
        // Optionally, add the new todo to the list directly
        setTodos(prevTodos => [...prevTodos, response.todo]);
        // Or refetch the todos from the backend
        // const fetchedTodos = await getTodos('username');
        // setTodos(fetchedTodos);
      } catch (error) {
        console.error('Error creating todo', error);
      }
    }
  };

  // Handle deleting a todo
  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(todoId);
      setTodos(todos.filter(todo => todo.id !== todoId));
    } catch (error) {
      console.error('Error deleting todo', error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.title}
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New Todo"
      />
      <button onClick={handleCreateTodo}>Add Todo</button>
    </div>
  );
};

export default TodoList;
