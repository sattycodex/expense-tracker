const express=require('express');
const { addTransaction,getAllTransactions,getTransactionsByCategory,updateTransaction ,deleteTransaction,
    getAllTransactionsInMonth, getAllTransactionsInYear, getAllTransactionsInWeek, getAllTransactionsInDay,
    getAllTransactionsInQuarter, getAllTransactionsInHalfYear, getAllTransactionsInRange,
    getAllTransactionsByDirection
} = require('../controller/transactions.controller');
const router=express.Router();

router.post('/create-transaction', addTransaction);
router.get('/list-transaction', getAllTransactions); // Assuming you want to list transactions as well
router.get('/transactions/:categoryId', getTransactionsByCategory); // Assuming you want to filter by category
router.put('/update-transaction/:id', updateTransaction);
router.delete('/delete-transaction/:id', deleteTransaction);
router.get('/list-transaction/month', getAllTransactionsInMonth);
router.get('/list-transaction/year', getAllTransactionsInYear);
router.get('/list-transaction/week', getAllTransactionsInWeek);
router.get('/list-transaction/day', getAllTransactionsInDay);
router.get('/list-transaction/quarter', getAllTransactionsInQuarter);
router.get('/list-transaction/half-year', getAllTransactionsInHalfYear);
router.get('/list-transaction/custom-range', getAllTransactionsInRange);
router.get('/list-transaction/direction/:direction', getAllTransactionsByDirection);


module.exports=router;