import { sql } from './db.js';

async function addDummyData() {
    try {
        // Insert dummy users
        await sql.query(`
            INSERT INTO users (name, email, password)
            VALUES 
                ('John Doe', 'john.doe@example.com', 'password123'),
                ('Jane Smith', 'jane.smith@example.com', 'password456')
            ON CONFLICT (email) DO NOTHING;
        `);

        // Insert dummy tasks
        await sql.query(`
            INSERT INTO tasks (user_id, name, description, status, start_time, prioiryt, end_time)
            VALUES 
                (1, 'Task 1', 'Description for Task 1', 'Pending', NOW(), 'High', NOW() + INTERVAL '1 hour'),
                (1, 'Task 2', 'Description for Task 2', 'Completed', NOW() - INTERVAL '1 day', 'Medium', NOW() - INTERVAL '23 hours'),
                (2, 'Task 3', 'Description for Task 3', 'Pending', NOW(), 'Low', NOW() + INTERVAL '2 hours')
            ON CONFLICT DO NOTHING;
        `);

        // Insert dummy projects
        await sql.query(`
            INSERT INTO projects (user_id, name, description, priority, image_url, status, project_type)
            VALUES 
                (1, 'Project 1', 'Description for Project 1', 'High', 'https://via.placeholder.com/150', 'In Progress', 'hourly'),
                (2, 'Project 2', 'Description for Project 2', 'Medium', 'https://via.placeholder.com/150', 'Pending', 'project_based')
            ON CONFLICT DO NOTHING;
        `);

        // Insert dummy expenses
        await sql.query(`
            INSERT INTO expenses (user_id, expense_type, amount, description)
            VALUES 
                (1, 'income', 5000.00, 'Salary'),
                (1, 'expense', 200.00, 'Groceries'),
                (2, 'expense', 150.00, 'Utilities')
            ON CONFLICT DO NOTHING;
        `);

        // Insert dummy fitness data
        await sql.query(`
            INSERT INTO fitness (user_id, fitness_type, description, calories)
            VALUES 
                (1, 'intake', 'Breakfast', 300.00),
                (1, 'burn', 'Running', 500.00),
                (2, 'intake', 'Lunch', 600.00)
            ON CONFLICT DO NOTHING;
        `);

        console.log('Dummy data added successfully');
    } catch (err) {
        console.error('Error adding dummy data:', err);
    }
}

addDummyData();