import { currencyFormatter } from '@/lib/utils'
import React, { useState } from 'react'
import ShowExpense from './models/ShowExpense'


const ExpenseItem = ({expense}) =>{
  const [modelExpenseCategory, SetModelExpenseCategory] = useState(false); 
 
  return (
  <>
  <button>
  <div onClick={()=>SetModelExpenseCategory(true)} className='flex items-center justify-between bg-slate-700 p-4 rounded-3xl'>
      <div className='flex gap-3'>
        <div className=' rounded-full w-[25px] h-[25px]' style={{backgroundColor:expense.color}} />
            <h1>{expense.title}</h1>
      </div>
      <p>{currencyFormatter(expense.total)}</p>
    </div>
  </button>
  <ShowExpense show={modelExpenseCategory} onClose={SetModelExpenseCategory} expense={expense}/>
  </>
  )
}
  
export default ExpenseItem;
