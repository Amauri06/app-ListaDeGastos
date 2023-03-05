import React from "react";
import "./App.css";
import { Helmet } from "react-helmet";
import {
  Header,
  Title,
  ContainerHeader,
  ContainerButtons,
} from "./elements/Header";
import Button from "./elements/Button";
import BtnLogout from "./elements/BtnLogout";
import ExpenseForm from "./components/ExpenseForm";
import BarSpent from "./components/BarSpent";

function App() {
  return (
    <>
      <Helmet>
        <title>My Money💵😭</title>
      </Helmet>

      <Header>
        <ContainerHeader>
        <ContainerButtons>
            <Button to="/categorias">Selecionar</Button>
            <Button to="/lista">Ver</Button>
            <BtnLogout />
          </ContainerButtons>
          <Title> Agregrar</Title>
        </ContainerHeader>
      </Header>
      <ExpenseForm />
      <BarSpent />
    </>
  );
}

export default App;
