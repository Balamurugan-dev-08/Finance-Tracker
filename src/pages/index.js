import React, { useContext, useEffect, useState } from "react";
import ExpenseItem from "@/components/ExpenseItem";
import Navigation from "@/components/Navigation";
import { currencyFormatter } from "@/lib/utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import AddIncome from "@/components/models/AddIncome";
import { financeContext } from "@/lib/Store/Fiance-Tracker";
import AddExpense from "@/components/models/AddExpense";
import { authContext } from "@/lib/Store/auth-context";
import Signin from "@/components/Signin";

ChartJS.register(ArcElement, Tooltip, Legend);
const index = () => {
  const [modelIncomeOpen, SetModelIncomeOpen] = useState(false);  
  const [modelExpenseOpen, SetModelExpenseOpen] = useState(false); 
  const {expenses,income}=useContext(financeContext);
  const [balance,setBalance]=useState([])
  const {user}=useContext(authContext)

  useEffect(()=>{
    const newBalance=
    income.reduce((total,i)=>{
      return total+i.Amount;
    },0)
    -expenses.reduce((total,e)=>{
      return total+e.total;
    },0)
    setBalance(newBalance)
  },[expenses,income])
  if(!user){
    return <Signin/>
  }
  
  return (
    <>
      <div className="container mx-auto max-w-2xl p-6">
        <Navigation />
        <section>
          <div className="py-2">
            <small className="text-gray-400 text-md">My Balance</small>
            <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
          </div>
        </section>

        <section className="flex items-center py-3 gap-3">
          <button className="btn btn-primary" onClick={() => SetModelExpenseOpen(true)}>
            +Expense
          </button>
          <button
            className="btn btn-primary-outline"
            onClick={() => {
              SetModelIncomeOpen(true);
            }}
          >
            {" "}
            -Income
          </button>
        </section>
        
        <div  className="flex flex-col gap-3 mt-5">
          {expenses.map((expense) => (
            <ExpenseItem
            key={expense.id}
              id={expense.id}
              expense={expense}
            />
          ))}
        </div>

        {/* Chart Section  */}
        <div className="py-6">
          <div>
            <p className="text-2xl ">Status</p>
            <div className="w-1/2 mx-auto">
              <Doughnut
                data={{
                  labels: expenses.map((expense) => expense.title),
                  datasets: [
                    {
                      label: "Expense",
                      data: expenses.map((expense) => expense.total),
                      backgroundColor: expenses.map((expense) => expense.color),
                      borderColor: ["#18181b"],
                      borderWidth: 5,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Model */}
      <AddIncome show={modelIncomeOpen} onClose={SetModelIncomeOpen}></AddIncome>
      <AddExpense show={modelExpenseOpen} onClose={SetModelExpenseOpen}></AddExpense>
     
    </>
  );
};

export default index;
