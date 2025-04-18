import React, { useContext, useRef, useState } from "react";
import Model from "../Model";
import { financeContext } from "@/lib/Store/Fiance-Tracker";
import { v4 as uuidv4 } from "uuid";

const AddExpense = ({ show, onClose }) => {
  const [expenseAmount, setExpensesAmount] = useState("");
  const [seletedCategory, setSeletedCategory] = useState(null);
  const { expenses, addExpenseItem ,addCategory} = useContext(financeContext);
  const [showExpense, setShowExpense] = useState(false);
  const titleRef = useRef();
  const colorRef = useRef();

  const addExpenseHandler = async () => {
    const expense = expenses.find((e) => {
      return e.id === seletedCategory;
    });
    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + +expenseAmount,
      items: [
        ...(expense?.items || []), // ✅ fallback to empty array
        {
          Amount: +expenseAmount,
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };
    await addExpenseItem(seletedCategory, newExpense);

    setExpensesAmount("");
    setSeletedCategory(null);
    onClose();
  };

  const addCategoryHandler = async () => {
    const title=titleRef.current.value;
    const color=colorRef.current.value;
    try {
      await addCategory({title,color,total:0})
      
    } catch (error) {
      
    }
  }

  return (
    <div>
      <Model show={show} onClose={onClose}>
        <div className="flex flex-col gap-4">
          <label>Enter The Expense Amount</label>
          <input
            className="bg-slate-600 rounded-2xl p-2"
            min={0.01}
            step={0.01}
            placeholder="Enter the Expense Amount"
            type="number"
            value={expenseAmount}
            onChange={(e) => {
              setExpensesAmount(e.target.value);
            }}
            required
          />
        </div>

        {/* Model Categories */}
        {expenseAmount > 0 && (
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex justify-between">
              <h3 className="capitalize text-xl">Selected Expense Category </h3>
              <button
                className="text-lime-400"
                onClick={() => setShowExpense(true)}
              >
                {" "}
                +New Category
              </button>
            </div>

            {showExpense && (
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Enter Title"
                  className="bg-slate-700 p-2 rounded-xl"
                  ref={titleRef}
                />
                <label>Pick Color</label>
                <input
                  type="color"
                  className="w-24 h-10 p-2 bg-slate-700"
                  ref={colorRef}
                />
                <button onClick={addCategoryHandler} className="btn btn-primary-outline">Create</button>
                <button
                  onClick={() => setShowExpense(true)}
                  className="btn btn-danger"
                >
                  Cancel
                </button>
              </div>
            )}

            {expenses &&
              expenses.length > 0 &&
              expenses.map((expense) => (
                <button
                  id={expense.id}
                  onClick={() => {
                    setSeletedCategory(expense.id);
                  }}
                >
                  <div
                    style={{
                      boxShadow:
                        expense.id === seletedCategory ? "1px 1px 4px" : "None",
                    }}
                    className="flex items-center justify-between p-3 bg-slate-700 rounded-3xl "
                  >
                    <div className="flex gap-2">
                      {/* Circle Color */}
                      <div
                        style={{ backgroundColor: expense.color }}
                        className="w-[25px] h-[25px] rounded-full"
                      ></div>
                      <h3>{expense.title}</h3>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        )}
        <div className="mt-4">
          {expenseAmount > 0 && seletedCategory && (
            <button className="btn btn-primary" onClick={addExpenseHandler}>
              Add Expense
            </button>
          )}
        </div>
      </Model>
    </div>
  );
};

export default AddExpense;
