import { sql } from '../lib/db.js';

export const getExpensesForToday = async (req, res) => {
    const { user_id } = req.params; // Get user ID from route params
    try {
        const result = await sql.query(
            `SELECT COUNT(*) AS total_expenses
             FROM expenses 
             WHERE DATE(expense_time) = CURRENT_DATE AND expense_type = 'expense' AND user_id = $1`,
            [user_id]
        );
        res.status(200).json({ expensesForToday: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch expenses for today' });
    }
};

export const getIncomeForToday = async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await sql.query(
            `SELECT COUNT(*) AS total_income
             FROM expenses 
             WHERE DATE(expense_time) = CURRENT_DATE AND expense_type = 'income' AND user_id = $1`,
            [user_id]
        );
        res.status(200).json({ incomeForToday: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch income for today' });
    }
};

export const createExpense = async (req, res) => {
    const { user_id } = req.params; // User ID from route params
    const { expense_type, amount, description, expense_time } = req.body;

    try {
        const result = await sql.query(
            `INSERT INTO expenses (user_id, expense_type, amount, description, expense_time) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [user_id, expense_type, amount, description, expense_time || new Date()]
        );
        res.status(201).json({ expense: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create expense' });
    }
};

export const updateExpense = async (req, res) => {
    const { expense_id,user_id } = req.params; // Expense ID
    const { expense_type, amount, description, expense_time } = req.body;

    try {
        const result = await sql.query(
            `UPDATE expenses 
             SET expense_type = $1, amount = $2, description = $3, expense_time = $4 
             WHERE expense_id = $5 AND user_id=$6 RETURNING *`,
            [expense_type, amount, description, expense_time, expense_id,user_id]
        );
        res.status(200).json({ expense: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update expense' });
    }
};

export const deleteExpense = async (req, res) => {
    const { expense_id,user_id } = req.params; // Expense ID

    try {
        await sql.query('DELETE FROM expenses WHERE expense_id = $1 AND user_id=$2', [expense_id,user_id]);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete expense' });
    }
};

export const getEarningsForToday = async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await sql.query(
            `SELECT 
                expense_id, 
                amount, 
                description
             FROM expenses 
             WHERE DATE(expense_time) = CURRENT_DATE AND expense_type = 'income' AND user_id = $1
             ORDER BY expense_time ASC`,
            [user_id]
        );
        res.status(200).json({ earningsForToday: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch earnings for today' });
    }
};

export const getExpendituresForToday = async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await sql.query(
            `SELECT 
                expense_id, 
                amount, 
                description
             FROM expenses 
             WHERE DATE(expense_time) = CURRENT_DATE AND expense_type = 'expense' AND user_id = $1
             ORDER BY expense_time ASC`,
            [user_id]
        );
        res.status(200).json({ expendituresForToday: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch expenditures for today' });
    }
};

export const getPast10DaysData = async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await sql.query(
            `SELECT 
                TO_CHAR(expense_time, 'YYYY-MM-DD') AS day,
                SUM(CASE WHEN expense_type = 'income' THEN amount ELSE 0 END) AS total_income,
                SUM(CASE WHEN expense_type = 'expense' THEN amount ELSE 0 END) AS total_expense
             FROM expenses
             WHERE expense_time >= CURRENT_DATE - INTERVAL '10 days' AND user_id = $1
             GROUP BY day
             ORDER BY day ASC`,
            [user_id]
        );

        console.log(result);

        const formattedData = result.map((row, index) => ({
            name: `Day ${index + 1}`,
            compare1: row.total_income,
            compare2: row.total_expense,
        }));

        res.status(200).json(formattedData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch data for the past 10 days' });
    }
};

export const getPast10WeeksData = async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await sql.query(
            `SELECT 
                TO_CHAR(DATE_TRUNC('week', expense_time), 'YYYY-WW') AS week,
                SUM(CASE WHEN expense_type = 'income' THEN amount ELSE 0 END) AS total_income,
                SUM(CASE WHEN expense_type = 'expense' THEN amount ELSE 0 END) AS total_expense
             FROM expenses
             WHERE expense_time >= CURRENT_DATE - INTERVAL '10 weeks' AND user_id = $1
             GROUP BY week
             ORDER BY week ASC`,
            [user_id]
        );

        const formattedData = result.map((row, index) => ({
            name: `Week ${index + 1}`,
            compare1: row.total_income,
            compare2: row.total_expense,
        }));

        res.status(200).json(formattedData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch data for the past 10 weeks' });
    }
};

export const getPast10MonthsData = async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await sql.query(
            `SELECT 
                TO_CHAR(DATE_TRUNC('month', expense_time), 'YYYY-MM') AS month,
                SUM(CASE WHEN expense_type = 'income' THEN amount ELSE 0 END) AS total_income,
                SUM(CASE WHEN expense_type = 'expense' THEN amount ELSE 0 END) AS total_expense
             FROM expenses
             WHERE expense_time >= CURRENT_DATE - INTERVAL '10 months' AND user_id = $1
             GROUP BY month
             ORDER BY month ASC`,
            [user_id]
        );

        const formattedData = result.map((row, index) => ({
            name: `Month ${index + 1}`,
            compare1: row.total_income,
            compare2: row.total_expense,
        }));

        res.status(200).json(formattedData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch data for the past 10 months' });
    }
};