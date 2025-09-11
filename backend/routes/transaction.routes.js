const { Router } = require("express");
const isAuthenticated = require("../middleware/isAuthenticated.middleware");
const {
  createTransaction,
  allTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transaction.controller");

const router = Router();

router.route("/").post(isAuthenticated, createTransaction);
router.route("/").get(isAuthenticated, allTransactions);
router.route("/:id").put(isAuthenticated, updateTransaction);
router.route("/:id").delete(isAuthenticated, deleteTransaction);

module.exports = router;
