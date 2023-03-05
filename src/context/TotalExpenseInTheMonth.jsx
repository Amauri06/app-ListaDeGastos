import React,{createContext,useContext,useState, useEffect} from 'react'
import useGetExpenseOfTheMonth from '../hooks/useGetExpeseOfTheMonth'

export const TotalExpenseContext = createContext()

//hook personalizado
export const useTotalExpense = () =>{
    return useContext(TotalExpenseContext)
} 

function TotalExpenseProvider({children}) {
    const [total, setTotal] = useState(0)
    const expenses = useGetExpenseOfTheMonth();

    useEffect(()=>{
      let acumulated = 0;
     
      expenses.forEach(expense=>{
       acumulated +=  expense.amount;
        
       setTotal(acumulated)
      })
      
      
      }, [expenses])

  return (
    <TotalExpenseContext.Provider value={{total}}>
        {children}
    </TotalExpenseContext.Provider>     
  )
}

export default TotalExpenseProvider;