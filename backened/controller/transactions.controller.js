const { errorResponse, successResponse } = require('../utils/response');
const Category = require('../models/category.model');
const Transaction = require('../models/transaction.model');
exports.addTransaction = async (req, res) => {
    let { amount, description, date, categoryId, direction } = req.body;
    const userId = req.user.id;
    if (!categoryId) {
        const category=Category.find({'name': 'General', 'createBy': userId})
        categoryId = category.id;
    }
    
    if (!amount || !description || !direction) {
        errorResponse(res, 'All fields are required', 'Validation failed', 400);
    }
    if(!date){
        date = Date.now();
    }
    
    try {
        const newTransaction = new Transaction({
        amount,
        description,
        date,
        categoryId,
        direction,
        userId
        });
    
        await newTransaction.save();
        successResponse(res, newTransaction, 'Transaction added successfully', 201);
    } catch (error) {
        errorResponse(res, error.message, 'Failed to add transaction', 500);
    }
}

exports.getAllTransactions=async (req, res) => {
    const userId = req.user.id;
    try {
        const transactions = await Transaction.find({ userId }).populate('categoryId', 'name');
        successResponse(res, transactions, 'Transactions retrieved successfully', 200);
    } catch (error) {
        errorResponse(res, error.message, 'Failed to retrieve transactions', 500);
    }
}

exports.updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { amount, description, date, categoryId, direction } = req.body;
    const userId = req.user.id;     
    try {
        const transaction = await Transaction.findById(id);
        if (!transaction) {
            errorResponse(res, 'Transaction not found', 'Update failed', 404);
        }

        if (transaction.userId.toString() !== userId.toString()) {
            errorResponse(res, 'Unauthorized to update this transaction', 'Update failed', 403);
        }

        transaction.amount = amount || transaction.amount;
        transaction.description = description || transaction.description;
        transaction.date = date || transaction.date;
        transaction.categoryId = categoryId || transaction.categoryId;
        transaction.direction = direction || transaction.direction;

        await transaction.save();
        successResponse(res, transaction, 'Transaction updated successfully');
    } catch (error) {
        errorResponse(res, error.message, 'Failed to update transaction', 500);
    }
}

exports.deleteTransaction = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;     
    try {
        const transaction = await Transaction.findById(id);
        if (!transaction) {
            return errorResponse(res, 'Transaction not found', 'Delete failed', 404);
        }
        if (transaction.userId.toString() !== userId.toString()) {
            return errorResponse(res, 'Unauthorized to delete this transaction', 'Delete failed', 403);
        }

        await transaction.remove();
        successResponse(res, null, 'Transaction deleted successfully');
    } catch (error) {
        errorResponse(res, error.message, 'Failed to delete transaction', 500);
    }
}

exports.getTransactionsByCategory = async (req, res) => {
    const { categoryId } = req.params;
    const userId = req.user.id;

    try {
        const transactions = await Transaction.find({ userId, categoryId }).populate('categoryId', 'name');
        if (transactions.length === 0) {
            return errorResponse(res, 'No transactions found for this category', 'Retrieval failed', 404);
        }
        successResponse(res, transactions, 'Transactions retrieved successfully', 200);
    } catch (error) {
        errorResponse(res, error.message, 'Failed to retrieve transactions', 500);
    }
}
