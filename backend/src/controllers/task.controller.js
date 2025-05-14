import { sql } from '../lib/db.js';

export const getTotalTaskNumberToday = async (req, res) => {
    const { user_id } = req.params; // Get user ID from route params
    try {
        const result = await sql.query(
            'SELECT COUNT(*) AS total_tasks_today FROM tasks WHERE DATE(start_time) = CURRENT_DATE AND user_id = $1',
            [user_id]
        );
        res.status(200).json({ totalTasksToday: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch total tasks for today' });
    }
};

export const getCompletedTaskNumberToday = async (req, res) => {
    const { user_id } = req.params; // Get user ID from route params
    try {
        const result = await sql.query(
            'SELECT COUNT(*) AS completed_tasks_today FROM tasks WHERE DATE(start_time) = CURRENT_DATE AND status = $1 AND user_id = $2',
            ['Completed', user_id]
        );
        res.status(200).json({ completedTasksToday: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch completed tasks for today' });
    }
};

export const getPendingTaskNumberToday = async (req, res) => {
    const { user_id } = req.params; // Get user ID from route params
    try {
        const result = await sql.query(
            'SELECT COUNT(*) AS pending_tasks_today FROM tasks WHERE DATE(start_time) = CURRENT_DATE AND status = $1 AND user_id = $2',
            ['Pending', user_id]
        );
        res.status(200).json({ pendingTasksToday: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch pending tasks for today' });
    }
};

export const getTasksForToday = async (req, res) => {
    const { user_id } = req.params; // Get user ID from route params
    try {
        const result = await sql.query(
            `SELECT 
                name AS title, 
                TO_CHAR(start_time, 'HH12:MI AM') AS start_time, 
                TO_CHAR(end_time, 'HH12:MI AM') AS end_time, 
                priority
             FROM tasks 
             WHERE DATE(start_time) = CURRENT_DATE AND user_id = $1
             ORDER BY start_time ASC`,
            [user_id] // Pass the user_id as a parameter
        );
        res.status(200).json({ tasksForToday: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch tasks for today' });
    }
};

export const createTask = async (req, res) => {
    const { user_id } = req.params;
    const { name, status, start_time,description, prioirty, end_time } = req.body;

    try {
        const result = await sql.query(
            'INSERT INTO tasks (user_id, name, description, status, start_time, prioirty, end_time) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [user_id, name, description, status, start_time, prioirty, end_time]
        );
        res.status(201).json({ task: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create task' });
    }
};

export const updateTask = async (req, res) => {
    const { task_id,user_id } = req.params;
    const { name, status, start_time, prioirty, end_time } = req.body;

    try {
        const result = await sql.query(
            'UPDATE tasks SET name = $1, status = $2, start_time = $3, prioirty = $4, end_time = $5 WHERE task_id = $6 AND user_id=$7 RETURNING *',
            [name, status, start_time, prioirty, end_time, task_id,user_id]
        );
        res.status(200).json({ task: result});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update task' });
    }
};


export const deleteTask = async (req, res) => {
    const { task_id,user_id } = req.params;

    try {
        await sql.query('DELETE FROM tasks WHERE task_id = $1 AND user_id=$2', [task_id,user_id]);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete task' });
    }
};