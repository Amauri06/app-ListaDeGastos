import React, { useState, useEffect } from "react";
import {
  ContainerFilters,
  ContainerButton,
  InputLarge,
  Form,
  Input,
} from "../elements/ElementsForm";
import Button from "../elements/Button";
import { ReactComponent as PlusIcon } from "../img/plus.svg";
import SelectCategories from "./SelectCategories";
import DatePicker from "./DatePicker";
import getUnixTime from "date-fns/getUnixTime";
import fromUnixTime from "date-fns/fromUnixTime";
import { addExpense } from "../firebase/addExpense";
import { useAuth } from "../context/AuthContex";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import { editExpense } from "../firebase/EditExpense";

function ExpenseForm({ expense }) {
  const [inputDescription, setInputDescription] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [categorie, setCategorie] = useState("Hogar");
  const [date, setDate] = useState(new Date());
  const [visibility, setVisibility] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [alert, setAlert] = useState({});

  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    //comprobamos si ya hay algun gasto en nuestro formulario
    // de ser asi establecemos todo el state con los valores del gasto
    if (expense) {
      // comprobar que el gasto sea del usuario actual
      // para eso comprobamos el uid guardado en el gasto con el uid del usuario
      if (expense.data().uidUser === user.uid) {
        setCategorie(expense.data().categorie);
        setDate(fromUnixTime(expense.data().date));
        setInputAmount(expense.data().amount);
        setInputDescription(expense.data().description);
      } else {
        // si el usuario cambia el id de la ruta lo manda a la lista
        navigate("/lista");
      }
    }
  }, [expense, user, navigate]);

  const handleChange = (e) => {
    if (e.target.name === "description") {
      setInputDescription(e.target.value);
    } else if (e.target.name === "amount") {
      setInputAmount(e.target.value.replace(/[^0-9.]/g, ""));
    }
    // al escribir en el input oculte automaticamente el spiker y las categorias
    if (visibility) {
      setVisibility(!visibility);
    } else if (showSelect) {
      setShowSelect(!showSelect);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // si en el monto logran escribir una letra devolvera un null
    let amount = parseFloat(inputAmount).toFixed(2);

    //comprobar que haya una descriptcion y valor

    if (inputDescription !== "" && inputAmount !== "") {
      // otra comprobacion en caso del que usuario ponga una letra en el monto
      if (amount) {
        // para cuando estemos editando el boton agregar gasto ejecutra este sentencia
        if (expense) {
          // si tenemos un gasto significa que queremos editar.
          //el id esta antes del objeto data
          editExpense({
            id: expense.id,
            categorie,
            description: inputDescription,
            amount,
            date: getUnixTime(date),
          })
            .then(() => {
              navigate("/lista");
            })
            .catch(() => {
              setAlertState(true);
              setAlert({
                type: "error",
                message: "Hubo un error al actualizar la lista",
              });
            });
        } else {
          addExpense({
            description: inputDescription,
            amount,
            categorie,
            date: getUnixTime(date),
            uidUser: user.uid, //agregando el id del usuario que mando los gastos
          })
            // si todo va bien  ejecutamos la funcion then paraque me reinicie todos estos campos
            .then(() => {
              setCategorie("hogar");
              setInputDescription("");
              setInputAmount("");
              setInputAmount("");
              setDate(new Date());

              setAlertState(true);
              setAlert({
                type: "success",
                message: "El gasto fue agregado correctamente.",
              });
            })
            .catch(() => {
              setAlertState(true);
              setAlert({
                type: "error",
                message: "No se puedo agregar tus gatos",
              });
            });
        }
      } else {
        setAlertState(true);
        setAlert({
          type: "error",
          message: "El valor que ingresaste no es correcto.",
        });
      }
    } else {
      setAlertState(true);
      setAlert({
        type: "error",
        message: "Por favor rellena todos los campos.",
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ContainerFilters>
        <DatePicker
          date={date}
          setDate={setDate}
          visibility={visibility}
          setVisibility={setVisibility}
        />

        <SelectCategories
          categorie={categorie}
          setCategorie={setCategorie}
          showSelect={showSelect}
          setShowSelect={setShowSelect}
        />
      </ContainerFilters>
      <div>
        <Input
          type="text"
          name="description"
          placeholder="Descripcion"
          value={inputDescription}
          onChange={handleChange}
        />
        <InputLarge
          type="text"
          name="amount"
          placeholder="0,00"
          value={inputAmount}
          onChange={handleChange}
        />
      </div>
      <ContainerButton>
        <Button as="button" primary withIcon type="submit">
          {expense ? "Actualizar Gasto" : "Agregar Gasto"} <PlusIcon />
        </Button>
      </ContainerButton>
      <Alert
        type={alert.type}
        message={alert.message}
        alertState={alertState}
        setAlertState={setAlertState}
      />
    </Form>
  );
}

export default ExpenseForm;
