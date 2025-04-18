import React, { useContext } from "react";
import Model from "../Model";
import { currencyFormatter } from "@/lib/utils";
import { MdDeleteOutline } from "react-icons/md";
import { financeContext } from "@/lib/Store/Fiance-Tracker";

const ShowExpense = ({ show, onClose, expense }) => {
  const {deleteExpenseItem,deleteExpenseCategory}=useContext(financeContext);

  const expenseDeleteHandler=async(item)=>{
    try {
      const updatedItems=expense.items.filter((i)=> i.id !== item.id)
      const updatedExpense = {
        items: [...updatedItems],
        total: expense.total - item.Amount, 
      };  
      await deleteExpenseItem(updatedExpense,expense.id)}
       catch (error) {
      console.log(error.message,"error"); 
    }
  }
  const deleteCategoryHandler=async()=>{
    try{
      await deleteExpenseCategory(expense.id)
    }
    catch(error){
      console.log(error.message);
    }
  }

  return (
    <div>
      <Model show={show} onClose={onClose}>
        <div className="flex items-center justify-between">
          <h2 className="text-4xl">{expense.title}</h2>
          <button onClick={deleteCategoryHandler} className="btn btn-danger"> Delete</button>
        </div>
        <div>
          <h3 className="my-4 text-xl">Expense History</h3>
          {expense?.items?.map((item) => {
            return (
              <div key={item.id} className="flex items-center justify-between">
                <small>
                  {item?.createdAt?.toMillis
                    ? new Date(item.createdAt.toMillis()).toLocaleString()
                    : item?.createdAt?.toLocaleString?.()
                    ? item.createdAt.toLocaleString()
                    : "Unknown date"}
                </small>
                <p className="flex items-center gap-2">
                  {currencyFormatter(item?.Amount)}
                  <button onClick={()=>expenseDeleteHandler(item)}><MdDeleteOutline/></button>
                </p>
              </div>
            );
          })}
        </div>
      </Model>
    </div>
  );
};

export default ShowExpense;
