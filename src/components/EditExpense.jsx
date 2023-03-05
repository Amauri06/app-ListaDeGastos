import React from "react";
import {Header,Title} from "../elements/Header";
import { Helmet } from "react-helmet";
import BtnReturn from "../elements/BtnReturn";
import BarSpent from "./BarSpent";
import ExpenseForm from "./ExpenseForm";
import { useParams } from "react-router-dom";
import { useGetExpense } from "../hooks/useGetExpense";


function EditExpense() {
  //capturamos el id de la ruta para traer el gasto de la base de datos.

 const {id} = useParams();
  const [expense] = useGetExpense(id);
  
  
  return (
    <>
      <Helmet>
        <title>Editar Gastos</title>
      </Helmet>

      <Header>
        <BtnReturn route={"/lista"} />
        <Title> editar Gastos</Title>
      </Header>

      <ExpenseForm expense={expense}/>
      <BarSpent/>

    </>
  )
}

export default EditExpense