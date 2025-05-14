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
} from '../controllers/fitness.controller.js';

const router=express.Router();

router.get('/getIntakeForToday', getIntakeForToday);
router.get('/getBurntForToday', getBurntForToday);
router.get('/getFoodForToday', getFoodForToday);
router.get('/getExcercisesForToday', getExcercisesForToday);
router.post('/createIntake', createIntake);
router.post('/createBurnt', createBurnt);
router.put('/updateIntake/:id', updateIntake);
router.put('/updateBurnt/:id', updateBurnt);
router.delete('/deleteIntake/:id', deleteIntake);
router.delete('/deleteBurnt/:id', deleteBurnt);



export default router;