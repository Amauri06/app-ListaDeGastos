import React from "react";
import styled from "styled-components";
import theme from "../theme";
import { ReactComponent as IconDown } from "../img/down.svg";
import IconCategory from "../elements/IconCategory";


const SelectContainer = styled.div`
  background: ${theme.grisClaro};
  cursor: pointer;
  border-radius: 0.625rem; /* 10px */
  position: relative;
  height: 5rem; /* 80px */
  width: 40%;
  padding: 0px 1.25rem; /* 20px */
  font-size: 1.5rem; /* 24px */
  text-align: center;
  display: flex;
  align-items: center;
  transition: 0.5s ease all;
  &:hover {
    background: ${theme.grisClaro2};
  }

  @media (max-width: 769px) {
    margin-left: 28px;
    width: 250px;
    height: 55px;
    
  }  
   
  
`;

const OpctionSelect = styled.div`
  width: 100%;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    width: 1.25rem; /* 20px */
    height: auto;
    margin-left: 1.25rem; /* 20px */
  }


`;

const Opctions = styled.div`
  background: ${theme.grisClaro};
  position: absolute;
  top: 5.62rem; /* 90px */
  left: 0;
  width: 100%;
  border-radius: 0.625rem; /* 10px */
  max-height: 18.75rem; /* 300px */
  overflow-y: auto;
   
  

`;

const Opction = styled.div`
  padding: 1.25rem; /* 20px */
  display: flex;
  svg {
    width: 28px;
    height: auto;
    margin-right: 1.25rem; /* 20px */
  }
  &:hover {
    background: ${theme.grisClaro2};
  }
  
  
}
`;

function SelectCategories({categorie, setCategorie, showSelect, setShowSelect}) {
  
  const categories = [
    {id: 'Comida', text: 'Comida'},
    {id: 'Cuentas y pagos', text: 'Cuentas y pagos'},
    {id: 'Hogar', text: 'Hogar'},
    {id: 'Transporte', text: 'Transporte'},
    {id: 'Ropa', text: 'Ropa'},
    {id: 'Salud e Higiene', text: 'Salud e Higiene'},
    {id: 'Compras', text: 'Compras'},
    {id: 'Diversion', text: 'Diversion'},
    {id: 'Servicios', text: 'Servicios'},
    {id: 'Regalo', text: 'Regalo'}
]

const handleClick = (e)=>{
  
  setCategorie(e.currentTarget.dataset.value)
  
}

  return (
    <SelectContainer onClick={()=> setShowSelect(!showSelect)}>
      <OpctionSelect> {categorie} <IconDown /> </OpctionSelect>
      
      {showSelect && (
        <Opctions>
          {categories.map(categorie => (
            <Opction 
              key={categorie.id}
              data-value = {categorie.text}
              onClick={handleClick}
              >
              <IconCategory id={categorie.id}/>
              {categorie.text}
            </Opction>
          ))}
        </Opctions>
      )}
    </SelectContainer>
  );
}

export default SelectCategories;
