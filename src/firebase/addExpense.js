import {db} from './firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

//agregar los datos introducidos por el usuario a nuestra base de datos
export const addExpense = ({categorie, description, amount, date, uidUser})=>{
    //ejecutamos la funcion addDoc para agregar un documento.
    // esta funcion recibe otra funcion que sera la collecion
    // la collecion recibe la base de datos y el nombre de la collecion
    // Nota: si la colecion no esta greada agregara esa en la db de firestore
    // el segundo parametro sera un objeto.
    // agregamos el return para devolver el documento que estamos agregando
    // nos devuelve una promesa, que nos sirve para saber si los datos fueron enviados.
    return addDoc(collection(db, "expenses"),{
       categorie,
       description,
       amount: Number(amount),
       date,
       uidUser
    })
}

//esto se ejecuta del lado del servidor y es una funcion asyncrona
