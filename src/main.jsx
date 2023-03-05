import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import WebFont from "webfontloader";
import Container from "./elements/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import UserRegister from "./components/UserRegister";
import ExpensesCategory from "./components/ExpensesCategory";
import ExpenseList from "./components/ExpenseList";
import { Helmet } from "react-helmet";
import favicon from "./img/logo.png";
import Background from "./elements/Background";
import { AuthProvider } from "./context/AuthContex";
import ProtecteRoute from "./components/ProtecteRoute";
import EditExpense from "./components/EditExpense";
import TotalExpenseProvider from "./context/TotalExpenseInTheMonth";

WebFont.load({
  google: {
    families: ["Work Sans:400,500,700", "sans-serif"],
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Helmet>
      <link rel="shortcut icon" href={favicon} type="image/x-icon" />
    </Helmet>
    <AuthProvider>
      <TotalExpenseProvider>
        <BrowserRouter>
          <Container>
            <Routes>
              <Route path="/iniciar-sesion" element={<Login />} />
              <Route path="/crear-cuenta" element={<UserRegister />} />

              <Route
                path="/categorias"
                element={
                  <ProtecteRoute>
                    <ExpensesCategory />
                  </ProtecteRoute>
                }
              />
              <Route
                path="/lista"
                element={
                  <ProtecteRoute>
                    <ExpenseList />
                  </ProtecteRoute>
                }
              />
              <Route
                path="/editar/:id"
                element={
                  <ProtecteRoute>
                    <EditExpense />
                  </ProtecteRoute>
                }
              />
              <Route
                path="/"
                element={
                  <ProtecteRoute>
                    <App />
                  </ProtecteRoute>
                }
              />
            </Routes>
          </Container>
        </BrowserRouter>
      </TotalExpenseProvider>
     
    </AuthProvider>
    <Background />
  </>
);
