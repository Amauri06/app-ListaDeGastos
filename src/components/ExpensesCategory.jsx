import React from "react";
import {Header,Title} from "../elements/Header";
import { Helmet } from "react-helmet";
import BtnReturn from "../elements/BtnReturn";
import BarSpent from "./BarSpent";
import useGetExpenseOfTheMonthByCategorie from "../hooks/useGetExpenseOfTheMonthByCategorie";
import { CategoryList,CategoryItemList,Category,Value,} from '../elements/ElementsList';
import IconCategory from '../elements/IconCategory';
import ConvertCurrency from '../Functions/convertCurrency'
 
function ExpensesCategory() {
  const expensesByCategories= useGetExpenseOfTheMonthByCategorie()
  
  return (
    <>
      <Helmet>
        <title>Gastos por Categorias</title>
      </Helmet>

      <Header>
        <BtnReturn />
        <Title> Gastos por Categorias</Title>
      </Header>

    <CategoryList>
      {expensesByCategories.map((item, index)=>(
          <CategoryItemList key={index}>
            <Category> 
              <IconCategory id={item.categorie}/> 
              {item.categorie}
            </Category>
            <Value>{ConvertCurrency(item.amount)} </Value>
          </CategoryItemList>
      ))}
    </CategoryList>

      <BarSpent/>
    </>
  );
}

export default ExpensesCategory;
