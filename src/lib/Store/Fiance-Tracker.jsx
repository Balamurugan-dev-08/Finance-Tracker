"use client";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { authContext } from "./auth-context";
const { createContext, useState, useEffect, useContext } = require("react");

export const financeContext = createContext({
  income: [],
  AddIncome: async () => {},
  removeIncome: async () => {},
  addExpenseItem: async () => {},
  addCategory: async () => {},
  deleteExpenseItem: async () => {},
  deleteExpenseCategory: async () => {},
});

export default function FinanceContextProvider({ children }) {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const {user}=useContext(authContext);

  const addCategory = async (Category) => {
    try {
      const collectionRef = collection(db, "expenses");
      const docSnap = await addDoc(collectionRef, {
        uid:user.uid,
        ...Category,
        item: [],
      });
      setExpenses((prev) => {
        return [
          ...prev,
          {
            id: docSnap.id,
            uid:user.uid,
            item: [],
            ...Category,
          },
        ];
      });
    } catch (error) {
      throw error;
    }
  };

  const AddIncome = async (newIncome) => {
    const collectionRef = collection(db, "income");
    try {
      const docSnap = await addDoc(collectionRef, newIncome);
      //update State
      setIncome((prev) => {
        return [
          ...prev,
          {
            id: docSnap.id,
            ...newIncome,
          },
        ];
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const addExpenseItem = async (expenseCategoryId, newExpense) => {
    try {
      // Update the expense in Firebase
      const docRef = doc(db, "expenses", expenseCategoryId);
      await updateDoc(docRef, newExpense);

      // Update the local state
      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === expenseCategoryId
            ? { id: expenseCategoryId, ...newExpense }
            : expense
        )
      );
    } catch (error) {
      console.error("Error updating expense:", error);
      throw error;
    }
  };

  const deleteExpenseItem = async (updatedExpense, expenseCategoryId) => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);
      await updateDoc(docRef, {
        ...updatedExpense,
      });

      setExpenses((prev) => {
        const updatedExpenses = [...prev];
        const pos = updatedExpenses.findIndex(
          (ex) => ex.id === expenseCategoryId
        );
        updatedExpenses[pos] = {
          ...updatedExpenses[pos],
          items: [...updatedExpense.items],
          total: updatedExpense.total,
        };
        return updatedExpenses;
      });
    } catch (error) {
      throw error;
    }
  };

  const deleteExpenseCategory = async (expenseCategoryId) => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);
      await deleteDoc(docRef);
      setExpenses((prev) => {
        const updatedExpense = prev.filter(
          (expense) => expense.id !== expenseCategoryId
        );
        return [...updatedExpense];
      });
    } catch (error) {
      throw error;
    }
  };

  const removeIncome = async (incomeId) => {
    const docRef = doc(db, "income", incomeId);
    try {
      await deleteDoc(docRef);

      //Delete State
      setIncome((prev) => {
        return prev.filter((i) => i.id !== incomeId);
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const getIncomeData = async () => {
    const collectionRef = collection(db, "income");
    const q=query(collectionRef,where("uid","==",user.uid))
    const docSnap = await getDocs(q);

    const data = docSnap.docs.map((doc) => {
      const docData = doc.data();
      const createAt = docData.createAt?.toMillis();
      return {
        id: doc.id,
        ...docData,
        createAt,
      };
    });
    setIncome(data);
  };

  const getExpenses = async () => {
    const collectionRef = collection(db, "expenses");
    const q=query(collectionRef,where("uid","==",user.uid))
    const docSnap = await getDocs(q);

    const data = docSnap.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setExpenses(data);
  };

  useEffect(() => {
    if(!user) return; 
    getIncomeData();
    getExpenses();
  }, [user]);

  const values = {
    income,
    expenses,
    AddIncome,
    removeIncome,
    addExpenseItem,
    addCategory,
    deleteExpenseItem,
    deleteExpenseCategory,
  };
  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
}
