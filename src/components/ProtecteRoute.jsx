import React from "react";
import { useAuth } from "../context/AuthContex";
import {Navigate} from "react-router-dom";

function ProtecteRoute({ children}) {
  const { user } = useAuth();

  if (user) {
    return  children
  }
  
  return <Navigate replace to="/iniciar-sesion"/>
}

export default ProtecteRoute;
