import { currencyFormatter } from "@/lib/utils";
import React, { useContext, useEffect, useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";
import Model from "../Model";
import { financeContext } from "@/lib/Store/Fiance-Tracker";
import { authContext } from "@/lib/Store/auth-context";

const AddIncome = ({ show, onClose }) => {
  const amountRef = useRef();
  const discriptionRef = useRef();
  const collectionRef = useRef();
  const {income ,AddIncome,removeIncome}=useContext(financeContext);
  const {user}=useContext(authContext)

  //Handler Functions

  const handleSumbit = async (e) => {
    e.preventDefault();

    const newIncome = {
      Amount:+amountRef.current.value,
      Discription: discriptionRef.current.value,
      createAt: new Date(),
      uid:user.uid,
    };
    try {
      await AddIncome(newIncome);
      discriptionRef.current.value="";
       amountRef.current.value="";
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteIncome = async (incomeId) => {
    try {
      await removeIncome(incomeId);
    } catch (error) {
      console.log(error.message);
    }
    
  };

 

  return (
    <div>
      <Model show={show} onClose={onClose}>
        <form onSubmit={handleSumbit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <label>Amount</label>
            <input
              className="bg-slate-600 rounded-2xl p-2"
              min={0.01}
              step={0.01}
              ref={amountRef}
              placeholder="Enter the Amount"
              name="Amount"
              type="number"
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <label>Description</label>
            <input
              className="bg-slate-600 p-2 rounded-2xl"
              ref={discriptionRef}
              placeholder="Enter the Amount Description"
              name="Description"
              type="text"
              required
            />
          </div>
          <button className="btn btn-primary">Add Entry</button>
        </form>
        <div>
          {income &&
            income.length > 0 &&
            income.map((data, i) => (
              <div className="flex items-center justify-between mt-2" key={i}>
                <div>
                  <p>{data.Discription}</p>
                  <small className="text-xs">
                    {data.createAt
                      ? new Date(data.createAt).toLocaleString()
                      : "No Date"}
                  </small>
                </div>
                <div className="flex items-center gap-2 ">
                  <p className="">{currencyFormatter(data.Amount)}</p>
                  <button
                    onClick={() => {
                      deleteIncome(data.id);
                    }}
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </Model>
    </div>
  );
};

export default AddIncome;
