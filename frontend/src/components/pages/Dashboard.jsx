import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { useGetTransactions } from "../../hooks/useTransaction";
import Transactions from "./Transactions";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

export default function Dashboard() {
  const { data } = useGetTransactions();
  const transactions = data?.transactions || [];

  const totals = transactions?.reduce(
    (acc, t) => {
      if (t.amount >= 0) acc.income += t.amount;
      else acc.expense += t.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const balance = totals.income + totals.expense;

  const byCategory = Object.values(
    transactions.reduce((acc, t) => {
      const cat = t.category || "Other";
      if (!acc[cat]) acc[cat] = { name: cat, value: 0 };
      acc[cat].value += Math.abs(t.amount);
      return acc;
    }, {})
  );

  const months = {};
  transactions.forEach((t) => {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    months[key] = months[key] || { month: key, income: 0, expense: 0 };
    if (t.amount >= 0) months[key].income += t.amount;
    else months[key].expense += Math.abs(t.amount);
  });
  const monthlyData = Object.values(months).sort((a, b) =>
    a.month.localeCompare(b.month)
  );

  return (
    <div className="mt-20 p-6 space-y-8 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-600">Balance</h3>
            <p className="text-2xl font-bold text-gray-800">
              ₹{balance.toFixed(2)}
            </p>
          </div>
          <Wallet className="w-10 h-10 text-indigo-500" />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-600">Income</h3>
            <p className="text-2xl font-bold text-green-600">
              ₹{totals.income.toFixed(2)}
            </p>
          </div>
          <TrendingUp className="w-10 h-10 text-green-500" />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-600">Expenses</h3>
            <p className="text-2xl font-bold text-red-600">
              ₹{Math.abs(totals.expense).toFixed(2)}
            </p>
          </div>
          <TrendingDown className="w-10 h-10 text-red-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">
            Spending by Category
          </h4>
          <div className="w-full h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={byCategory}
                  dataKey="value"
                  nameKey="name"
                  outerRadius="80%"
                  label
                >
                  {byCategory.map((entry, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg xl:col-span-2">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">
            Monthly Overview
          </h4>
          <div className="w-full h-72">
            <ResponsiveContainer>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" name="Income" fill="#34D399" />
                <Bar dataKey="expense" name="Expense" fill="#F87171" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="">
        <Transactions transactions={transactions} />
      </div>
    </div>
  );
}
