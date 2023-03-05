import { useState, useEffect } from "react";
import useGetExpenseOfTheMonth from "./useGetExpeseOfTheMonth";

const useGetExpenseOfTheMonthByCategorie = () => {

const [expenseByCatogiere, setExpenseByCategorie] = useState([]);


   const expenses = useGetExpenseOfTheMonth();
   
   useEffect(()=>{

    const sumOfExpenses = expenses.reduce((objAcc, objCurrent)=>{
        const categorieCurrent = objCurrent.categorie;
        const amountCurrent = objCurrent.amount;
      
        objAcc[categorieCurrent] += amountCurrent
         
        
        return objAcc
         
      }, {
        "Comida": 0,
        "Compras": 0,
        "Cuentas y pagos": 0,
        "Diversion": 0,
        "Hogar": 0,
        "Ropa": 0,
        "Salud e Higiene" : 0,
        "Transporte": 0,
        "Servicios": 0,
        "Regalo": 0
      })

      
      setExpenseByCategorie(Object.entries(sumOfExpenses).map(([categorie, amount]) =>{
          return { categorie, amount}  
      }))

   },[setExpenseByCategorie, expenses])

   return expenseByCatogiere;
}
 
export default useGetExpenseOfTheMonthByCategorie;

// Nota: nuestro hook se va a ejecutar cada vez que nuestro estado cambie 
// por lo tanto se vuelve a renderizar todo el codigo y el componente se va
// a estar renderizando constantemente para evitar que el componente se renderize muchas veces
// entrar todo el codigo en un useEfect.
      