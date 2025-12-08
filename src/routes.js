const express = require('express');
const router = express.Router();
const Todo = require('./models/todo');

router.get('/health', (req, res) => {
    res.json({ status: 'UP' });
});

router.post('/todos', async (req, res) => {
    const todo = new Todo({ title: req.body.title });
    await todo.save();
    res.status(201).json(todo);
});

router.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

router.put('/todos/:id', async (req, res) => {
    try {
        const updated = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: 'Invalid ID' });
    }
});

router.delete('/todos/:id', async (req, res) => {
    try {
        const deleted = await Todo.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted successfully' });

    } catch (err) {
        res.status(400).json({ message: 'Invalid ID' });
    }
});

module.exports = router;
