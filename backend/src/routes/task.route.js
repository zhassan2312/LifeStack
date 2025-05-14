import express from 'express';
import {
    getCompletedTaskNumberToday,
    getTotalTaskNumberToday,
    getPendingTaskNumberToday,
    getTasksForToday,
    createTask,
    updateTask,
    deleteTask,
} from '../controllers/task.controller.js';

const router = express.Router();

router.get('/getCompletedTaskNumberToday/:user_id', getCompletedTaskNumberToday);
router.get('/getTotalTaskNumberToday/:user_id', getTotalTaskNumberToday);
router.get('/getPendingTaskNumberToday/:user_id', getPendingTaskNumberToday);
router.get('/getTasksForToday/:user_id', getTasksForToday);
router.post('/createTask/:user_id', createTask);
router.put('/updateTask/:user_id/:task_id', updateTask);
router.delete('/deleteTask/:user_id/:task_id', deleteTask);

export default router;