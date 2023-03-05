import React from "react";
import { Header, Title } from "../elements/Header";
import { Helmet } from "react-helmet";
import BtnReturn from "../elements/BtnReturn";
import BarSpent from "./BarSpent";
import useGetSpenses from "../hooks/useGetSpenses";
import {
  List,
  ElementList,
  Category,
  Descripction,
  Value,
  Date,
  ContainerButton,
  ButtonAction,
  ButtonLoadMore,
  ContainerButtonCenter,
  ContainerSubtitle,
  Subtitle,
} from "../elements/ElementsList";
import IconCategory from "../elements/IconCategory";
import convertCurrency from "../Functions/convertCurrency";
import { ReactComponent as IconEdit } from "../img/editar.svg";
import { ReactComponent as IconDelete } from "../img/borrar.svg";
import { Link } from "react-router-dom";
import Button from "../elements/Button";
import { format, fromUnixTime } from "date-fns";
import { es } from "date-fns/locale";
import { deleteExpense } from "../firebase/deleteExpense";

function ExpenseList() {
  const [expenses, getMoreExpenses, moreToLoad] = useGetSpenses();

  const formatDate = (date) => {
    return format(fromUnixTime(date), "dd 'de' MMMM 'de' yyyy", { locale: es });
  };

  const dateIsEqual = (expenses, index, expense) => {
    // para que el primer elemento de la fecha no me ejecute esta comoprobacion
    if (index !== 0) {
      const currentDate = formatDate(expense.date);
      // es importante que haya una primera fecha, para poder acceder
      // a la fecha anterior.
      const previousDate = formatDate(expenses[index - 1].date);

      if (currentDate === previousDate) {
        return true;
      }
      return false;
    }
  };

  return (
    <>
      <Helmet>
        <title>Lista de Gastos</title>
      </Helmet>

      <Header>
        <BtnReturn />
        <Title> Lista de Gastos</Title>
      </Header>

      <List>
        {expenses.map((expense, index) => (
          //si la fecha es igual a la del elemento anterior no la mostramos
          // con el index podemos saber en que posicion esta el elemento
          <div key={expense.id}>
            {!dateIsEqual(expenses, index, expense) && (
              <Date>{formatDate(expense.date)}</Date>
            )}

            <ElementList key={expense.id}>
              <Category>
                <IconCategory id={expense.categorie} />
                {expense.categorie}
              </Category>
              <Descripction>{expense.description}</Descripction>
              <Value>{convertCurrency(expense.amount)}</Value>
              <ContainerButton>
                <ButtonAction as={Link} to={`/editar/${expense.id}`}>
                  <IconEdit />
                </ButtonAction>
                <ButtonAction onClick={() => deleteExpense(expense.id)}>
                  <IconDelete />
                </ButtonAction>
              </ContainerButton>
            </ElementList>
          </div>
        ))}
        {moreToLoad && (
          <ContainerButtonCenter>
            <ButtonLoadMore onClick={() => getMoreExpenses()}>
              Cargar Más
            </ButtonLoadMore>
          </ContainerButtonCenter>
        )}
        {expenses.length === 0 && (
          <ContainerSubtitle>
            <Subtitle>No hay gastos por mostrar</Subtitle>
            <Button as={Link} to="/">
              Agregar Gastos
            </Button>
          </ContainerSubtitle>
        )}
      </List>

      <BarSpent />
    </>
  );
}

export default ExpenseList;
