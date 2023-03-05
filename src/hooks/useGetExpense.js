import {useEffect, useState} from 'react'
import { db } from '../firebase/firebaseConfig';
import {  doc, getDoc } from "firebase/firestore";
import {useNavigate} from 'react-router-dom';

// cargar un solo gasto o documento, al montar este componente
export const useGetExpense = (id)=>{
    const [expense, setExpense] = useState("");
    
    const navigate = useNavigate()

    useEffect( ()=>{
            //funcion para editar
        const getExpenses = async ()=>{
            // una vez el gasto esta agregado en la base de dato
            // traemos el gasto de la bd con el id. 
            // una vez obtenemos el gasto lo importamos al componente editExpense.
            //todo esto ocurre al presionar el boton editar en el formulario. 

          const expenseData = await getDoc(doc(db, "expenses", id))
            // si el gasto existe en la base datos entonces lo establecemos en el stado.
            if(expenseData.exists()){
                setExpense(expenseData)
            // si no existe, lo mandamos a la lista, por si  modifique la ruta del id.    
            }else{
                navigate("/lista")
            }
            }
            
            getExpenses()
        },[navigate, id])   


    return [expense] // al cargar por primera vez este componente, primero se
    // renderiza el componente, en ese momento mi estado expense tiene el valor ""
    // y returna mi expense como " ", luego se ejecuta el useEfect y se vuelve 
    // a producir un nuevo renderizado con el valor actulizado.

} 