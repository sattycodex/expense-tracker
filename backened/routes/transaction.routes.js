const express=require('express');
const { addTransaction,getAllTransactions,getTransactionsByCategory,updateTransaction ,deleteTransaction} = require('../controller/transactions.controller');
const router=express.Router();

router.post('/create-transaction', addTransaction);
router.get('/list-transaction', getAllTransactions); // Assuming you want to list transactions as well
router.get('/list-transaction/:categoryId', getTransactionsByCategory); // Assuming you want to filter by category
router.put('/update-transaction/:id', updateTransaction);
router.delete('/delete-transaction/:id', deleteTransaction);
module.exports=router;