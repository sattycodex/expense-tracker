const { errorResponse, successResponse } = require('../utils/response');
const Category = require('../models/category.model');
const Transaction = require('../models/transaction.model');
const {monthNumber}=require('../utils/month-number')
exports.addTransaction = async (req, res) => {
    let { amount, description, date, status, type } = req.body;
    const userId = req.user.id;
    
    if (!amount || !description || !status || !date || !type) {
        errorResponse(res, 'All fields are required', 'Validation failed', 400);
    }
    
    try {
        const newTransaction = new Transaction({
        amount,
        description,
        date,
        status,
        type,
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
        const transactions = await Transaction.find({ userId }).sort({ date: -1 });;
        successResponse(res, transactions, 'Transactions retrieved successfully', 200);
    } catch (error) {
        errorResponse(res, error.message, 'Failed to retrieve transactions', 500);
    }
}

exports.getIncomeTransaction=async (req,res)=>{
    const userId = req.user.id;
    try {
        const transactions = await Transaction.find({ userId,type:'salary' }).sort({ date: -1 });;
        successResponse(res, transactions, 'Transactions retrieved successfully', 200);
    } catch (error) {
        errorResponse(res, error.message, 'Failed to retrieve transactions', 500);
    }
}
exports.getExpenseTransaction=async (req,res)=>{
    const userId = req.user.id;
    try {
        const transactions = await Transaction.find({ userId,type:'expense' }).sort({ date: -1 });;
        successResponse(res, transactions, 'Transactions retrieved successfully', 200);
    } catch (error) {
        errorResponse(res, error.message, 'Failed to retrieve transactions', 500);
    }
}

exports.updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { amount, description, date, status, type } = req.body;
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
        transaction.status = status || transaction.status;
        transaction.type = type || transaction.type;

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

        await transaction.deleteOne();
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


exports.getAllTransactionsInMonth = async (req, res) => {
    const { year, month } = req.query;
    console.log(year,month);
    const userId = req.user.id;

    try {
        const start=new Date(`${Number(year)}-${monthNumber(month)}-01`);
        const end=new Date(`${Number(year)}-${monthNumber(month) + 1}-01`);
        const transactions = await Transaction.find({
            userId,
            date: {
                $gte: start,
                $lt: end
            }
        });
        if (transactions.length === 0) {
            return errorResponse(res, 'No transactions found for this month', 'Retrieval failed', 404);
        }
        successResponse(res, transactions, 'Transactions retrieved successfully', 200);
    } catch (error) {
        errorResponse(res, error.message, 'Failed to retrieve transactions', 500);
    }
}
exports.getAllTransactionsInDay = async (req, res) => {
    const { year, month, day } = req.query;
    const userId = req.user.id;
    try {
        const transactions = await Transaction.find({
            userId,
            date: {
                $gte: new Date(`${Number(year)}-${Number(month)}-${Number(day)}-00:00:00`),
                $lt: new Date(`${Number(year)}-${Number(month)}-${Number(day)}-23:59:59`)
            }
        });
        successResponse(res, transactions, 'Transactions retrieved successfully', 200);
    } catch (error) {
        console.log(error)
        errorResponse(res, error.message, 'Failed to retrieve transactions', 500);
    }
}
exports.getAllTransactionsInWeek = async (req, res) => {
    const { year, week } = req.query;
    const userId = req.user.id;

    try {
        const startOfWeek = new Date(Number(year), 0, 1 + (Number(week) - 1) * 7);
        const endOfWeek = new Date(Number(year), 0, 1 + Number(week) * 7);

        const transactions = await Transaction.find({
            userId,
            date: {
                $gte: startOfWeek,
                $lt: endOfWeek
            }
        });
        if (transactions.length === 0) {
            return errorResponse(res, 'No transactions found for this week', 'Retrieval failed', 404);
        }
        successResponse(res, transactions, 'Transactions retrieved successfully', 200);
    } catch (error) {
        errorResponse(res, error.message, 'Failed to retrieve transactions', 500);
    }
}
exports.getAllTransactionsInQuarter = async (req, res) => {
    const { year, quarter } = req.query;
    const userId = req.user.id;

    try {
        const startMonth = (Number(quarter) - 1) * 3;
        const startOfQuarter = new Date(Number(year), startMonth, 1);
        const endOfQuarter = new Date(Number(year), startMonth + 3, 0);

        const transactions = await Transaction.find({
            userId,
            date: {
                $gte: startOfQuarter,
                $lt: endOfQuarter
            }
        });
        if (transactions.length === 0) {
            return errorResponse(res, 'No transactions found for this quarter', 'Retrieval failed', 404);
        }
        successResponse(res, transactions, 'Transactions retrieved successfully', 200);
    } catch (error) {
        errorResponse(res, error.message, 'Failed to retrieve transactions', 500);
    }
}
exports.getAllTransactionsInHalfYear = async (req, res) => {
    const { year, half } = req.query;
    const userId = req.user.id;     
    try {
        const startMonth = half === '1' ? 0 : 6; // January to June or July to December
        const startOfHalfYear = new Date(Number(year), startMonth, 1);
        const endOfHalfYear = new Date(Number(year), startMonth + 6, 0); // End of June or December 
        const transactions = await Transaction.find({
            userId,
            date: {
                $gte: startOfHalfYear,
                $lt: endOfHalfYear  
            }
        });
        if (transactions.length === 0) {
            return errorResponse(res, 'No transactions found for this half year', 'Retrieval failed     ', 404);
        }
        successResponse(res, transactions, 'Transactions retrieved successfully', 200);
    } catch (error) {
        errorResponse(res, error.message, 'Failed to retrieve transactions', 500);
    }
}

exports.getAllTransactionsInYear = async (req, res) => {
    const { year } = req.query;
    const userId = req.user.id;

    try {
        
        const startOfYear = new Date(Number(year), 0, 1);
        const endOfYear = new Date(Number(year) + 1, 0, 1);

        const transactions = await Transaction.find({
            userId,
            date: {
                $gte: startOfYear,
                $lt: endOfYear
            }
        });
        successResponse(res, transactions, 'Transactions retrieved successfully', 200);
    } catch (error) {
        errorResponse(res, error.message, 'Failed to retrieve transactions', 500);
    }
}
exports.getAllTransactionsInRange = async (req, res) => {
    const { startDate, endDate } = req.query;
    const userId = req.user.id;

    try {
        const transactions = await Transaction.find({
            userId,
            date: {
                $gte: new Date(`${startDate}-00:00:00`),
                $lte: new Date(`${endDate}-23:59:59`)
            }
        });
        if (transactions.length === 0) {
            return errorResponse(res, 'No transactions found in this range', 'Retrieval failed', 404);
        }
        successResponse(res, transactions, 'Transactions retrieved successfully', 200);
    } catch (error) {
        errorResponse(res, error.message, 'Failed to retrieve transactions', 500);
    }
}
exports.getAllTransactionsByDirection = async (req, res) => {
    const { direction } = req.query;
    const userId = req.user.id;

    try {
        const transactions = await Transaction.find({ userId, direction });
        if (transactions.length === 0) {
            return errorResponse(res, `No transactions found for direction: ${direction}`, 'Retrieval failed', 404);
        }
        successResponse(res, transactions, 'Transactions retrieved successfully', 200);
    } catch (error) {
        errorResponse(res, error.message, 'Failed to retrieve transactions', 500);
    }
}
