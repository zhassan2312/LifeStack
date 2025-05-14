import express from 'express';
import {
    getExpensesForToday,
    getIncomeForToday,
    createExpense,
    updateExpense,
    deleteExpense,
    getEarningsForToday,
    getExpendituresForToday,
    getPast10DaysData,
    getPast10WeeksData,
    getPast10MonthsData,
} from '../controllers/expense.controller.js';

const router=express.Router();

router.get('/getExpensesForToday/:user_id', getExpensesForToday);
router.get('/getEarningsForToday/:user_id', getEarningsForToday);
router.get('/getExpendituresForToday/:user_id', getExpendituresForToday);
router.get('/getIncomeForToday/:user_id', getIncomeForToday);
router.post('/createExpense/:user_id', createExpense);
router.put('/updateExpense/:user_id/:expense_id', updateExpense);
router.delete('/deleteExpense/:user_id/:expense_id', deleteExpense);
router.get('/getPast10DaysData/:user_id', getPast10DaysData);
router.get('/getPast10WeeksData/:user_id', getPast10WeeksData);
router.get('/getPast10MonthsData/:user_id', getPast10MonthsData);


export default router;