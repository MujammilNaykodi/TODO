import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos'; // Backend API base URL

// GET todos for a user
export const getTodos = async (username) => {
  try {
    const response = await axios.get(`${API_URL}?user=${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos', error);
    throw error;
  }
};

// POST create a new todo
export const createTodo = async (todoData) => {
  try {
    const response = await axios.post(API_URL, todoData);
    return response.data;
  } catch (error) {
    console.error('Error creating todo', error);
    throw error;
  }
};

// PUT update a todo
export const updateTodo = async (todoId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${todoId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating todo', error);
    throw error;
  }
};

// DELETE a todo
export const deleteTodo = async (todoId) => {
  try {
    const response = await axios.delete(`${API_URL}/${todoId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting todo', error);
    throw error;
  }
};
