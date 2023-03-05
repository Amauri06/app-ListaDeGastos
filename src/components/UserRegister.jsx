import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Header, Title, ContainerHeader } from "../elements/Header";
import Button from "../elements/Button";
import { ContainerButton, Form, Input } from "../elements/ElementsForm";
import { ReactComponent as SvgLogin } from "../img/registro.svg";
import styled from "styled-components";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword} from "firebase/auth";
import Alert from "./Alert";

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 6.25rem;
  margin-bottom: 1.25rem;
`;

function UserRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [alertState, setAlertState] = useState(false);
  const [alert, setAlert] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    // asegurando que cuando envio los datos los dos estados tengan su valor
    // por defecto.
    setAlertState(false);
    setAlert({});

    //comprobar del lado del cliente que el correo sea valido.
    const regularPhrase = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    
    if (!regularPhrase.test(email)) {
      setAlertState(true);
      setAlert({
        type: 'error',
        message: 'Ingrese un correo electrónico valido' 
      });
    
      return;
    }
    if (email === "" || password === "" || password2 === "") {
      setAlertState(true);
      setAlert({
        type: 'error',
        message: '"por favor rellena todos los datos"' 
      });
      
      return;
    }
    if (password !== password2) {
      setAlertState(true);
      setAlert({
        type: 'error',
        message: '"Las constrasena no son iguales"' 
      });
      return;
    }

    // comprobacion del lado del servidor
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      setAlertState(true)
      let message;

      switch (e.code) {
        case "auth/weak-password":
          message = "La contraseña tiene que ser de al menos 6 caracteres.";
          break;
        case "auth/email-already-in-use":
          message =
            "Ya existe una cuenta con el correo electrónico proporcionado.";
          break;
        case "auth/invalid-email":
          message = "El correo electrónico no es válido.";
          break;
        default:
          message = "Hubo un error al intentar crear la cuenta.";
          break;
      }
      setAlert({
        type: 'error',
        message: message
      });
    }
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "password2":
        setPassword2(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Helmet>
        <title>Crear Cuenta</title>
      </Helmet>
      <Header>
        <ContainerHeader>
          <Title>Crear Cuenta</Title>
          <div>
            <Button to="/iniciar-sesion">Iniciar Sesion</Button>
          </div>
        </ContainerHeader>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Svg />
        <Input
          type="email"
          name="email"
          placeholder="Correo Electronico"
          value={email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password2"
          placeholder="Repetir Contraseña"
          value={password2}
          onChange={handleChange}
        />
        <ContainerButton>
          <Button as="button" primario>
            {" "}
            Crear Cuenta
          </Button>
        </ContainerButton>
      </Form>
      <Alert 
        type={alert.type}
        message={alert.message} 
        alertState={alertState} 
        setAlertState={setAlertState}
        />
    </>
  );
}

export default UserRegister;
