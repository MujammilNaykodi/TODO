const db = require('../models');
const { Op } = require('sequelize');
const { Parser } = require('json2csv');

// GET /api/todos?user=username
exports.getTodos = async (req, res) => {
  const username = req.query.user;
  if (!username) return res.status(400).json({ error: 'User query param required' });

  try {
    const user = await db.User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const todos = await db.Todo.findAll({
      where: { creatorId: user.id },
      include: [
        { model: db.Tag },
        { model: db.Note },
        { model: db.User, as: 'assignedUsers', attributes: ['username'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

// POST /api/todos
exports.createTodo = async (req, res) => {
  const { title, description, priority, tags = [], mentions = [], user } = req.body;

  if (!title || !user) return res.status(400).json({ error: 'Title and user are required' });

  try {
    const creator = await db.User.findOne({ where: { username: user } });
    if (!creator) return res.status(404).json({ error: 'Creator user not found' });

    const todo = await db.Todo.create({
      title,
      description,
      priority: priority || 'low',
      creatorId: creator.id
    });

    for (const tagName of tags) {
      const [tag] = await db.Tag.findOrCreate({ where: { name: tagName } });
      await todo.addTag(tag);
    }

    for (const username of mentions) {
      const assignedUser = await db.User.findOne({ where: { username } });
      if (assignedUser) await todo.addAssignedUser(assignedUser);
    }

    res.status(201).json({ message: 'Todo created', todoId: todo.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create todo' });
  }
};

// PUT /api/todos/:id
exports.updateTodo = async (req, res) => {
  const todoId = req.params.id;
  const { title, description, priority, tags = [], mentions = [] } = req.body;

  try {
    const todo = await db.Todo.findByPk(todoId);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    if (title) todo.title = title;
    if (description) todo.description = description;
    if (priority) todo.priority = priority;
    await todo.save();

    if (tags.length > 0) {
      const tagInstances = [];
      for (const tagName of tags) {
        const [tag] = await db.Tag.findOrCreate({ where: { name: tagName } });
        tagInstances.push(tag);
      }
      await todo.setTags(tagInstances);
    }

    if (mentions.length > 0) {
      const userInstances = [];
      for (const username of mentions) {
        const user = await db.User.findOne({ where: { username } });
        if (user) userInstances.push(user);
      }
      await todo.setAssignedUsers(userInstances);
    }

    res.json({ message: 'Todo updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

// DELETE /api/todos/:id
exports.deleteTodo = async (req, res) => {
  const todoId = req.params.id;

  try {
    const todo = await db.Todo.findByPk(todoId);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    await todo.destroy();
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};

// GET /api/todos/:id
exports.getTodoById = async (req, res) => {
  const todoId = req.params.id;

  try {
    const todo = await db.Todo.findByPk(todoId, {
      include: [
        { model: db.Tag },
        { model: db.Note },
        { model: db.User, as: 'assignedUsers', attributes: ['username'] },
        { model: db.User, as: 'creator', attributes: ['username'] }
      ]
    });

    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
};

// POST /api/todos/:id/notes
exports.addNote = async (req, res) => {
  const todoId = req.params.id;
  const { content } = req.body;

  if (!content) return res.status(400).json({ error: 'Note content required' });

  try {
    const todo = await db.Todo.findByPk(todoId);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    const note = await db.Note.create({ content, TodoId: todo.id });

    res.status(201).json({ message: 'Note added', note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add note' });
  }
};

// GET /api/todos/export?user=username&format=json|csv
exports.exportTodos = async (req, res) => {
  const { user, format = 'json' } = req.query;

  if (!user) return res.status(400).json({ error: 'User is required' });

  try {
    const userRecord = await db.User.findOne({ where: { username: user } });
    if (!userRecord) return res.status(404).json({ error: 'User not found' });

    const todos = await db.Todo.findAll({
      where: { creatorId: userRecord.id },
      include: [
        { model: db.Tag },
        { model: db.Note },
        { model: db.User, as: 'assignedUsers', attributes: ['username'] }
      ]
    });

    const result = todos.map(todo => ({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      completed: todo.completed,
      tags: todo.Tags.map(t => t.name).join(', '),
      assignedUsers: todo.assignedUsers.map(u => u.username).join(', '),
      notes: todo.Notes.map(n => n.content).join(' | '),
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt
    }));

    if (format === 'csv') {
      const parser = new Parser();
      const csv = parser.parse(result);
      res.header('Content-Type', 'text/csv');
      res.attachment('todos.csv');
      return res.send(csv);
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to export todos' });
  }
};
