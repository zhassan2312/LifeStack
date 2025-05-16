import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser'; 
import { sql } from './lib/db.js';
import morgan from 'morgan'; 
import helmet from 'helmet'; 
import taskRoutes from './routes/task.route.js'
import authRoutes from './routes/auth.route.js'
import projectRoutes from './routes/project.route.js'
import fitnessRoutes from './routes/fitness.route.js'
import expenseRoutes from './routes/expense.route.js'
import bodyParser from "body-parser";

dotenv.config();
const app = express();

app.use(express.json()); 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev')); 

app.use(cors({ 
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/fitness", fitnessRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}


async function initDB() {
    try {
        
        // Create tables one by one
        await sql.query(`
            CREATE TABLE IF NOT EXISTS users (
                user_id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await sql.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                task_id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                status VARCHAR(20) CHECK (status IN ('Pending', 'Completed')) DEFAULT 'Pending',
                start_time TIMESTAMP NOT NULL,
                priority VARCHAR(20) CHECK (priority IN ('Low', 'Medium', 'High')) DEFAULT 'Low', -- Fix the typo here
                end_time TIMESTAMP NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await sql.query(`
            CREATE TABLE IF NOT EXISTS projects (
                project_id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                priority VARCHAR(20) CHECK (priority IN ('Low', 'Medium', 'High')) DEFAULT 'Low',
                image_url VARCHAR(255),
                status VARCHAR(20) CHECK (status IN ('Pending', 'In Progress', 'Completed')) DEFAULT 'Pending',
                project_type VARCHAR(20) CHECK (project_type IN ('hourly', 'project_based')),
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await sql.query(`
            CREATE TABLE IF NOT EXISTS hourly_based_projects (
                hourly_id SERIAL PRIMARY KEY,
                project_id INTEGER REFERENCES projects(project_id) ON DELETE CASCADE,
                hourly_rate DECIMAL(10, 2) NOT NULL,
                work_sessions JSONB DEFAULT '[]',
                total_hours DECIMAL(10, 2) DEFAULT 0
            );
        `);

        await sql.query(`
            CREATE TABLE IF NOT EXISTS project_based_projects (
                project_based_id SERIAL PRIMARY KEY,
                project_id INTEGER REFERENCES projects(project_id) ON DELETE CASCADE,
                progress_percentage DECIMAL(5, 2) DEFAULT 0,
                project_rate DECIMAL(10, 2) NOT NULL,
                milestone_count INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await sql.query(`
            CREATE TABLE IF NOT EXISTS project_milestones (
                milestone_id SERIAL PRIMARY KEY,
                project_based_id INTEGER REFERENCES project_based_projects(project_based_id) ON DELETE CASCADE,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                is_completed BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await sql.query(`
            CREATE TABLE IF NOT EXISTS expenses (
                expense_id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
                expense_type VARCHAR(20) CHECK (expense_type IN ('income', 'expense')) NOT NULL,
                amount DECIMAL(10, 2) NOT NULL,
                description TEXT,
                expense_time TIMESTAMP DEFAULT NOW(),
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await sql.query(`
            CREATE TABLE IF NOT EXISTS fitness (
                fitness_id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
                fitness_type VARCHAR(20) CHECK (fitness_type IN ('intake', 'burn')) NOT NULL,
                description TEXT,
                calories DECIMAL(10, 2) NOT NULL,
                fitness_time TIMESTAMP DEFAULT NOW(),
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await sql.query(`
            CREATE TABLE IF NOT EXISTS calorie_intake (
                intake_id SERIAL PRIMARY KEY,
                fitness_id INTEGER REFERENCES fitness(fitness_id) ON DELETE CASCADE,
                food_item VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await sql.query(`
            CREATE TABLE IF NOT EXISTS calorie_burn (
                burn_id SERIAL PRIMARY KEY,
                fitness_id INTEGER REFERENCES fitness(fitness_id) ON DELETE CASCADE,
                exercise VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        // Create indexes
        await sql.query(`CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);`);
        await sql.query(`CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);`);
        await sql.query(`CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON expenses(user_id);`);
        await sql.query(`CREATE INDEX IF NOT EXISTS idx_fitness_user_id ON fitness(user_id);`);
        console.log('Database initialized successfully');
    } catch (err) {
        console.error('Database initialization error:', err);
    }
}


initDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Error initializing database:', err);
});