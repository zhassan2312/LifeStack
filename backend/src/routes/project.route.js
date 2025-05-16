import express from 'express';
import {
    getCompletedProjectNumber,
    getTotalProjectNumber,
    getPendingProjectNumber,
    getOngoingProjects,
    createProject,
    updateProject,
    deleteProject,
} from '../controllers/project.controller.js';


const router=express.Router();


router.get('/getCompletedProjectNumber', getCompletedProjectNumber);
router.get('/getTotalProjectNumber', getTotalProjectNumber);
router.get('/getPendingProjectNumber', getPendingProjectNumber);
router.get('/getOngoingProjects/:user_id', getOngoingProjects);
router.post('/createProject', createProject);
router.put('/updateProject/:id', updateProject);
router.delete('/deleteProject/:id', deleteProject);



export default router;