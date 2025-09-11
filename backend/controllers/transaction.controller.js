const asyncHandler = require("../utils/asyncHandler");
const Transaction = require("../models/transaction.model");

const createTransaction = asyncHandler(async (req, res) => {
  const { title, amount, date, category } = req.body;
  const userId = req.user.id;
  if (!title || !amount || !category) {
    return res.status(400).json({
      message: "title,amount and category are required fields",
      success: false,
    });
  }
  const transaction = await Transaction.create({
    user: userId,
    title,
    amount,
    date: date || new Date(),
    category,
  });

  res
    .status(201)
    .json({ message: "Transaction Added", transaction, success: true });
});

const allTransactions = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const transactions = await Transaction.find({ user: userId }).sort({
    date: -1,
  });
  if (!transactions) {
    return res
      .status(404)
      .json({ message: "Transaction not found", success: true });
  }
  return res
    .status(200)
    .json({ message: "Transactions", transactions, success: true });
});

const updateTransaction = asyncHandler(async (req, res) => {
  const { title, amount, date, category } = req.body;
  const { id } = req.params;
  const userId = req.user.id;
  if (!id || !userId) {
    return res
      .status(400)
      .json({ message: "Transaction id and userId Required!" });
  }

  const transaction = await Transaction.findById(id);
  if (!transaction)
    return res
      .status(404)
      .json({ message: "Transaction not found", success: false });
  if (transaction.user.toString() !== userId)
    return res.status(401).json({ message: "Not authorized", success: false });

  transaction.title = title ?? transaction.title;
  transaction.amount = amount ?? transaction.amount;
  transaction.date = date ?? transaction.date;
  transaction.category = category ?? transaction.category;
  await transaction.save();
  res.json({ message: "Transaction Updated", transaction, success: true });
});

const deleteTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  if (!id || !userId) {
    return res
      .status(400)
      .json({ message: "Transaction id and userId Required!" });
  }
  const transaction = await Transaction.findById(id);
  if (!transaction)
    return res
      .status(404)
      .json({ message: "Transaction not found", success: false });
  if (transaction.user.toString() !== userId)
    return res.status(401).json({ message: "Not authorized", success: false });

  await transaction.deleteOne();
  res.json({ message: "Transaction deleted", success: true });
});

module.exports = {
  createTransaction,
  allTransactions,
  updateTransaction,
  deleteTransaction,
};
