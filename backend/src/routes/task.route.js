import express from 'express';
import {
    getCompletedTaskNumberToday,
    getTotalTaskNumberToday,
    getPendingTaskNumberToday,
    getTasksForToday,
    createTask,
    updateTask,
    deleteTask,
    getPast10DaysData,
    getPast10WeeksData,
    getPast10MonthsData,
} from '../controllers/task.controller.js';

const router = express.Router();

router.get('/getCompletedTaskNumberToday/:user_id', getCompletedTaskNumberToday);
router.get('/getTotalTaskNumberToday/:user_id', getTotalTaskNumberToday);
router.get('/getPendingTaskNumberToday/:user_id', getPendingTaskNumberToday);
router.get('/getTasksForToday/:user_id', getTasksForToday);
router.post('/createTask/:user_id', createTask);
router.put('/updateTask/:user_id/:task_id', updateTask);
router.delete('/deleteTask/:user_id/:task_id', deleteTask);
router.get('/getPast10DaysData/:user_id', getPast10DaysData);
router.get('/getPast10WeeksData/:user_id', getPast10WeeksData);
router.get('/getPast10MonthsData/:user_id', getPast10MonthsData);

export default router;