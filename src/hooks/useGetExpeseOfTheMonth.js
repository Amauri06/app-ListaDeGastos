import {useState, useEffect} from 'react';
import {db} from '../firebase/firebaseConfig';
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { startOfMonth, endOfMonth, getUnixTime } from 'date-fns/fp';
import {useAuth} from '../context/AuthContex'


const useGetExpenseOfTheMonth = () => {
    const [expenses, setExpenses] = useState([]);

    const {user} =  useAuth();
    

    useEffect(()=>{

        const startMonth = getUnixTime(startOfMonth(new Date()));
        const endMonth = getUnixTime(endOfMonth(new Date()));

            if(user){

                //consulta
                const q = query(collection(db, "expenses"),
                orderBy("date", "desc" ),
                where('date', '>=',  startMonth),
                where('date', '<=',  endMonth),
                // importante siempre traer solo el gasto del usuario que esta logueado
                where("uidUser",'==', user.uid )
                )

                //respuesta
                  const unsuscribe =  onSnapshot(q, snapshot => {
                   setExpenses( snapshot.docs.map(doc =>{
                     return {...doc.data(), id: doc.id }
                  }))
                }, (e)=> {console.log(e)})// atrapando error
              
               
                return unsuscribe; //cerrando conexion con fireStore
            }


        },[user]) //si el usuario cambia intentara conectarse otra vez a la base de datos.

    return expenses;
}
 
export default useGetExpenseOfTheMonth;

//Nota: si queremos ejecutar codigo que hacen peticiones a un servidor tenemos que 
// hacerlo dentro de un useEfect para prevenir que en cada renderizado hagamos una 
// conexion a la base de datos y nos consuma recurso.
