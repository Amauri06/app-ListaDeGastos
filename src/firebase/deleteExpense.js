import { db } from "./firebaseConfig";
import {doc, deleteDoc } from 'firebase/firestore';

export const deleteExpense = async (id)=>{
    await deleteDoc(doc(db, "expenses", id))
}

