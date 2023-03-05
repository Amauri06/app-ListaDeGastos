import React, {useState} from "react";
import { Helmet } from "react-helmet";
import { Header, Title, ContainerHeader } from "../elements/Header";
import Button from "../elements/Button";
import { ContainerButton, Form, Input } from "../elements/ElementsForm";
import { ReactComponent as SvgLogin } from "../img/login.svg";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom'
import {auth} from '../firebase/firebaseConfig';
import {signInWithEmailAndPassword } from "firebase/auth";
import Alert from "./Alert";

const Svg = styled(SvgLogin)`
 width: 100%;
 max-height: 12.25rem; 
 margin-bottom: 1.25rem;

`

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertState, setAlertState] = useState(false);
  const [alert, setAlert] = useState({});
  const navigate = useNavigate();

  const handleChange = (e)=>{
    e.preventDefault();
    if(e.target.name === "email"){
      setEmail(e.target.value)
    }else if(e.target.name === "password"){
        setPassword(e.target.value)
    } 
  }

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
    if (email === "" || password === "" ) {
      setAlertState(true);
      setAlert({
        type: 'error',
        message: '"por favor rellena todos los datos"' 
      });
      
      return;
    }
    

    // comprobacion del lado del servidor
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      
      setAlertState(true)

     
      let message;

      switch (e.code) {
        
        case "auth/wrong-password":
          message = "La contraseña no es correcta."
          break;
        case "auth/user-not-found":
          message = "No se encontro ninguna cuenta con este correo electronico."
          break;
        default:
          message = "Hubo un error al intentar crear la cuenta.";
          break;
      }
      setAlert({
        type: 'error',
        message
      });
    }
  };
 
  return (
    <>
      <Helmet>
        <title>Iniciar Sesion</title>
      </Helmet>
      <Header>
        <ContainerHeader>
          <Title>Ininiciar Sesion</Title>
          <div>
            <Button to="/crear-cuenta">Registrarse</Button>
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
        <ContainerButton>
          <Button as="button" primario>Iniciar Sesion </Button>
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
  

export default Login;
