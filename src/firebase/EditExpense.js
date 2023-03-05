import {db} from './firebaseConfig';
import { doc, updateDoc } from "firebase/firestore";

//actualizando datos en la base de datos
export const editExpense = async ({id, categorie, description, amount, date})=>{
    
    return await updateDoc(doc(db, "expenses", id),{
       categorie,
       description,
       amount: Number(amount),
       date
    })
}

//nota: no actulizamos el uidUser porque ya lo tenemos