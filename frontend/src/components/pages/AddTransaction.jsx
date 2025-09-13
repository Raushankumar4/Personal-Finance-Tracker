import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useAddTransaction } from "../../hooks/useTransaction";

const AddTransaction = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate: addTransaction, isPending } = useAddTransaction();
  const queryClient = useQueryClient();

  const onSubmit = (formData) => {
    formData.amount =
      formData.type === "expense"
        ? -Math.abs(formData.amount)
        : Math.abs(formData.amount);

    addTransaction(formData, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        toast.success(data.message || "Transaction added successfully!");
        reset();
        onClose();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <h2 className="text-2xl font-bold text-center text-[#1F41BB] mb-6">
          Add Transaction
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F41BB]"
              placeholder="e.g. Salary, Shopping"
            />
            {errors.title && (
              <p className="text-red-600 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              {...register("category", { required: "Category is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F41BB]"
              placeholder="e.g. Food, Bills, Rent"
            />
            {errors.category && (
              <p className="text-red-600 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              {...register("amount", { required: "Amount is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F41BB]"
              placeholder="Enter amount"
            />
            {errors.amount && (
              <p className="text-red-600 text-xs mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Transaction Type
            </label>
            <select
              {...register("type", {
                required: "Transaction type is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F41BB]"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            {errors.type && (
              <p className="text-red-600 text-xs mt-1">{errors.type.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2 bg-[#1F41BB] text-white font-medium rounded-lg hover:bg-[#162c8a] transition disabled:opacity-50"
            >
              {isPending ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
