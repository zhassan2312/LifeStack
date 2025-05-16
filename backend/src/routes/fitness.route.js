import express from 'express';
import {
    getBurntForToday,
    getIntakeForToday,
    getFoodForToday,
    getExcercisesForToday,
    createIntake,
    createBurnt,
    updateIntake,
    updateBurnt,
    deleteIntake,
    deleteBurnt,
    getPast10DaysData,
    getPast10WeeksData,
    getPast10MonthsData,
} from '../controllers/fitness.controller.js';

const router=express.Router();

router.get('/getIntakeForToday', getIntakeForToday);
router.get('/getBurntForToday', getBurntForToday);
router.get('/getFoodForToday', getFoodForToday);
router.get('/getExcercisesForToday', getExcercisesForToday);
router.post('/createIntake/:user_id', createIntake);
router.post('/createBurnt/:user_id', createBurnt);
router.put('/updateIntake/:id', updateIntake);
router.put('/updateBurnt/:id', updateBurnt);
router.delete('/deleteIntake/:id', deleteIntake);
router.delete('/deleteBurnt/:id', deleteBurnt);
router.get('/getPast10DaysData/:user_id', getPast10DaysData);
router.get('/getPast10WeeksData/:user_id', getPast10WeeksData);
router.get('/getPast10MonthsData/:user_id', getPast10MonthsData);




export default router;