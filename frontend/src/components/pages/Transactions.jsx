import { useState, useEffect } from "react";
import { Edit, Trash, Plus } from "lucide-react";
import AddTransaction from "./AddTransaction";
import UpdateTransaction from "./UpdateTransaction";
import { useDeleteTransaction } from "../../hooks/useTransaction";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Transactions = ({ transactions }) => {
  const [search, setSearch] = useState("");
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [isAddTransaction, setIsAddTransaction] = useState(false);
  const [isUpdateTransaction, setIsUpdateTransaction] = useState(false);
  const [selectToUpdate, setSelectToUpdate] = useState(null);
  const { mutate: deleteTransaction } = useDeleteTransaction();
  const queryClient = useQueryClient();

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setFilteredTransactions(
      transactions.filter(
        (transaction) =>
          transaction.title
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          transaction.category
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleDelete = (id) => {
    deleteTransaction(id, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        toast.success(data?.message);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      },
    });
  };

  const handleEdit = (transaction) => {
    setIsUpdateTransaction(true);
    setSelectToUpdate(transaction);
  };

  return (
    <div className="p-6 ">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by title or category"
          className="p-2 border border-gray-300 rounded-lg w-full sm:w-1/2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={() => setIsAddTransaction(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-all w-full sm:w-auto"
        >
          <Plus className="h-5 w-5" />
          Add Transaction
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredTransactions && filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{transaction.title}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {transaction.category || "Other"}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 font-semibold ${
                      transaction.amount < 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {transaction.amount < 0
                      ? `- ₹${Math.abs(transaction.amount)}`
                      : `+ ₹${transaction.amount}`}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 flex justify-center items-center gap-3">
                    <button
                      onClick={() => handleEdit(transaction)}
                      className="text-yellow-600 hover:text-yellow-800 transition-colors"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(transaction?._id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-6 text-center text-gray-500">
                  No transactions available 🚫
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isAddTransaction && (
        <AddTransaction onClose={() => setIsAddTransaction(false)} />
      )}
      {isUpdateTransaction && (
        <UpdateTransaction
          transaction={selectToUpdate}
          onClose={() => {
            setIsUpdateTransaction(false);
            setSelectToUpdate(null);
          }}
        />
      )}
    </div>
  );
};

export default Transactions;
