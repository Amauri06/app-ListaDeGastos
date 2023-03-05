import  {useState, useEffect} from 'react';
import { db } from '../firebase/firebaseConfig';
import 
{ 
    collection,
    query,
    orderBy, 
    limit,
    where, 
    onSnapshot, 
    startAfter 
} from "firebase/firestore";
import { useAuth } from '../context/AuthContex';

 const useGetSpenses = ()=> {
    const [expenses, setExpenses] = useState([]);
    const [lastExpense, setLastExpense] = useState(null);
    const [moreToLoad, setMoreToLoad] = useState(false); // para ocutar el bnt cargarMas
    const {user} = useAuth();

    //cunando ejecutamos el btn cargarMas ejecutamos esta funcion y 
    // obtendremos 10 gastos mas nuevos, es decir cargar gastos arriba de otros.
  const getMoreExpenses = ()=>{
    const q = query(collection(db,"expenses"),
       where("uidUser", "==", user.uid),
       orderBy('date', 'desc'),
       // cargando los 10 gastos que se encuentren despues del ultimo que yo tenia.
       limit(10),
       startAfter(lastExpense) 
    )
       // esta funcion se va ejecutar cada vez que haya un cambio dentro de los gastos.
       onSnapshot(q, (snapshot)=>{
        //juntando los 10 gasto mas con los 10 cargado en el inicio.
            if(snapshot.docs.length > 0){
                //estableciendo nuestros ultimos gastos, replazando lo que cargaron
                //al inicio y mostrando esos ultimos gastos
                setLastExpense(snapshot.docs[snapshot.docs.length -1])

                //concatenando los nuevos gastos con los anteriores y agregando
                // una nueva propiedad en el nuevo array "id"
             setExpenses(expenses.concat(snapshot.docs.map(expense => (
                    {...expense.data(), id: expense.id}
                ))))
            }

            setMoreToLoad(false)

       }, error => {console.log(error)} )
  }
    
    useEffect(()=>{
        // haciendo consulta a la base de datos de gastos
        // query recibe como callback la collection y varias funciones para filtrar
        // traiendo solo la data del usuario que tiene la sesion.
            const q = query(collection(db, "expenses"), 
                where("uidUser", "==", user.uid),
                orderBy('date', 'desc'), //ordermar pofr feacha
                limit(10)// que me traiga maximo 10 gastos
            )
            
            //onsnashop me permite traer los datos de la base de datos 
            // recibe como parametro la consulta
            const cancelSubscription = onSnapshot(q, (snapshot)=>{
                // en caso de que haya elementos cargados
               if(snapshot.docs.length > 0){
                // buscando  cual fue el ultimo gasto para tenerlo como referencia
                    setLastExpense(snapshot.docs[snapshot.docs.length -1])
                    //comprobamos que hay mas elementos para cargar
                    setMoreToLoad(true)
               }else{
                setMoreToLoad(false)
               }
               
                setExpenses(snapshot.docs.map(bills =>{
                    //con esto sacamos el id del gasto agregandole una nueva props
                    return {...bills.data(), 
                        id: bills.id
                     }   
                }))
            })
            return  cancelSubscription;
        },[user]) // sejecutara cuando cargue al inicio y cuando el usuario cambie
         // Nota: si cambiamos de usuario queremos volver a conectarnos a la base de datos
         //para traer los nuevos valores del nuevo usuario.

        //devuelve un  array de array 
        return [expenses, getMoreExpenses, moreToLoad];

    }



export default useGetSpenses
