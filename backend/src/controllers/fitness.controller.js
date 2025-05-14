import { sql } from '../lib/db.js';

// Get total calorie intake for today
export const getIntakeForToday = async (req, res) => {
    try {
        const result = await sql.query(
            `SELECT SUM(calories) AS total_intake 
             FROM calorie_intake 
             WHERE DATE(created_at) = CURRENT_DATE`
        );
        res.status(200).json({ totalIntake: result.rows[0].total_intake || 0 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch calorie intake for today' });
    }
};

// Get total calories burnt for today
export const getBurntForToday = async (req, res) => {
    try {
        const result = await sql.query(
            `SELECT SUM(calories) AS total_burnt 
             FROM calorie_burn 
             WHERE DATE(created_at) = CURRENT_DATE`
        );
        res.status(200).json({ totalBurnt: result.rows[0].total_burnt || 0 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch calories burnt for today' });
    }
};

// Get food items logged for today
export const getFoodForToday = async (req, res) => {
    try {
        const result = await sql.query(
            `SELECT food_item, calories, created_at 
             FROM calorie_intake 
             WHERE DATE(created_at) = CURRENT_DATE
             ORDER BY created_at ASC`
        );
        res.status(200).json({ foodForToday: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch food items for today' });
    }
};

// Get exercises logged for today
export const getExcercisesForToday = async (req, res) => {
    try {
        const result = await sql.query(
            `SELECT exercise, calories, created_at 
             FROM calorie_burn 
             WHERE DATE(created_at) = CURRENT_DATE
             ORDER BY created_at ASC`
        );
        res.status(200).json({ exercisesForToday: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch exercises for today' });
    }
};
// Create a new calorie intake record
export const createIntake = async (req, res) => {
    const { user_id, food_item, calories, description } = req.body;

    try {
        // Insert into the fitness table
        const fitnessResult = await sql.query(
            `INSERT INTO fitness (user_id, fitness_type, description, calories) 
             VALUES ($1, $2, $3, $4) RETURNING fitness_id`,
            [user_id, 'intake', description, calories]
        );

        const fitness_id = fitnessResult.rows[0].fitness_id;

        // Insert into the calorie_intake table
        const intakeResult = await sql.query(
            `INSERT INTO calorie_intake (fitness_id, food_item) 
             VALUES ($1, $2) RETURNING *`,
            [fitness_id, food_item]
        );

        res.status(201).json({ intake: intakeResult.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create calorie intake record' });
    }
};

// Create a new calorie burn record
export const createBurnt = async (req, res) => {
    const { user_id, exercise, calories, description } = req.body;

    try {
        // Insert into the fitness table
        const fitnessResult = await sql.query(
            `INSERT INTO fitness (user_id, fitness_type, description, calories) 
             VALUES ($1, $2, $3, $4) RETURNING fitness_id`,
            [user_id, 'burn', description, calories]
        );

        const fitness_id = fitnessResult.rows[0].fitness_id;

        // Insert into the calorie_burn table
        const burnResult = await sql.query(
            `INSERT INTO calorie_burn (fitness_id, exercise) 
             VALUES ($1, $2) RETURNING *`,
            [fitness_id, exercise]
        );

        res.status(201).json({ burnt: burnResult.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create calorie burn record' });
    }
};


// Update an existing calorie intake record
export const updateIntake = async (req, res) => {
    const { id } = req.params;
    const { food_item } = req.body;

    try {
        const result = await sql.query(
            `UPDATE calorie_intake 
             SET food_item = $1 
             WHERE intake_id = $2 RETURNING *`,
            [food_item, id]
        );
        res.status(200).json({ updatedIntake: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update calorie intake record' });
    }
};

// Update an existing calorie burn record
export const updateBurnt = async (req, res) => {
    const { id } = req.params;
    const { exercise } = req.body;

    try {
        const result = await sql.query(
            `UPDATE calorie_burn 
             SET exercise = $1 
             WHERE burn_id = $2 RETURNING *`,
            [exercise, id]
        );
        res.status(200).json({ updatedBurnt: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update calorie burn record' });
    }
};

// Delete a calorie intake record
export const deleteIntake = async (req, res) => {
    const { id } = req.params;

    try {
        await sql.query('DELETE FROM calorie_intake WHERE intake_id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete calorie intake record' });
    }
};

// Delete a calorie burn record
export const deleteBurnt = async (req, res) => {
    const { id } = req.params;

    try {
        await sql.query('DELETE FROM calorie_burn WHERE burn_id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete calorie burn record' });
    }
};