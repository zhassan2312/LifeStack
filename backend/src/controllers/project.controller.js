import { sql } from '../lib/db.js';

// Get the total number of projects for 
export const getTotalProjectNumber = async (req, res) => {
    try {
        const result = await sql.query(`
            SELECT COUNT(*) AS total_projects
            FROM projects
        `);
        res.json({ totalProjects: result.rows[0].total_projects_ });
    } catch (err) {
        console.error('Error fetching total projects for :', err);
        res.status(500).json({ error: 'Failed to fetch total projects for ' });
    }
};

// Get the number of completed projects for 
export const getCompletedProjectNumber = async (req, res) => {
    try {
        const result = await sql.query(`
            SELECT COUNT(*) AS completed_projects
            FROM projects 
            WHERE status = 'Completed'
        `);
        res.json({ completedProjects: result.rows[0].completed_projects_ });
    } catch (err) {
        console.error('Error fetching completed projects for :', err);
        res.status(500).json({ error: 'Failed to fetch completed projects for ' });
    }
};

// Get the number of pending projects for 
export const getPendingProjectNumber = async (req, res) => {
    try {
        const result = await sql.query(`
            SELECT COUNT(*) AS pending_projects_ 
            FROM projects 
            WHERE status = 'Pending' OR status = 'In Progress'
        `);
        res.json({ pendingProjects: result.rows[0].pending_projects_ });
    } catch (err) {
        console.error('Error fetching pending projects for :', err);
        res.status(500).json({ error: 'Failed to fetch pending projects for ' });
    }
};

// Get ongoing projects (In Progress first, then Pending)
export const getOngoingProjects = async (req, res) => {
    try {
        const result = await sql.query(`
            SELECT 
                p.project_id,
                p.name AS title,
                p.description,
                p.status,
                p.created_at,
                CASE 
                    WHEN p.project_type = 'hourly' THEN hbp.total_hours
                    ELSE NULL
                END AS total_hours,
                CASE 
                    WHEN p.project_type = 'hourly' THEN hbp.hourly_rate
                    ELSE NULL
                END AS hourly_rate,
                CASE 
                    WHEN p.project_type = 'project_based' THEN pbp.progress_percentage
                    ELSE NULL
                END AS progress_percentage,
                CASE 
                    WHEN p.project_type = 'project_based' THEN pbp.project_rate
                    ELSE NULL
                END AS total_cost
            FROM projects p
            LEFT JOIN hourly_based_projects hbp ON p.project_id = hbp.project_id
            LEFT JOIN project_based_projects pbp ON p.project_id = pbp.project_id
            WHERE p.status IN ('In Progress', 'Pending')
            ORDER BY 
                CASE 
                    WHEN p.status = 'In Progress' THEN 1
                    WHEN p.status = 'Pending' THEN 2
                END, 
                p.created_at
        `);

        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching ongoing projects:', err);
        res.status(500).json({ error: 'Failed to fetch ongoing projects' });
    }
};

// Create a new project
export const createProject = async (req, res) => {
    const { user_id, name, description, priority, image_url, status, project_type } = req.body;
    try {
        const result = await sql.query(`
            INSERT INTO projects (user_id, name, description, priority, image_url, status, project_type)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `, [user_id, name, description, priority, image_url, status, project_type]);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating project:', err);
        res.status(500).json({ error: 'Failed to create project' });
    }
};

// Update an existing project
export const updateProject = async (req, res) => {
    const { id } = req.params;
    const { name, description, priority, image_url, status, project_type } = req.body;
    try {
        const result = await sql.query(`
            UPDATE projects 
            SET name = $1, description = $2, priority = $3, image_url = $4, status = $5, project_type = $6
            WHERE project_id = $7
            RETURNING *
        `, [name, description, priority, image_url, status, project_type, id]);

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating project:', err);
        res.status(500).json({ error: 'Failed to update project' });
    }
};

// Delete a project
export const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        await sql.query(`
            DELETE FROM projects 
            WHERE project_id = $1
        `, [id]);

        res.status(204).send();
    } catch (err) {
        console.error('Error deleting project:', err);
        res.status(500).json({ error: 'Failed to delete project' });
    }
};