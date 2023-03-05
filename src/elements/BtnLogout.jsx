import React from "react";
import { ReactComponent as IconLogout } from "../img/log-out.svg";
import Button from "./Button";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function BtnLogout() {
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await signOut(auth);
      navigate("/iniciar-sesion");
    } catch (e) {
      console.log(e);
    }

  };

  return (
    //se comportara como un boton no como un Link
    <Button largeIcon as="button" onClick={Logout}>
      <IconLogout />
    </Button>
  );
}

export default BtnLogout;
