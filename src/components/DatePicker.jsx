import React from 'react';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import format from 'date-fns/format'
import styled from 'styled-components';
import theme from '../theme';


const InputContainer = styled.div`
    position: relative;
 
    input {
        font-family: 'Work Sans', sans-serif;
        box-sizing: border-box;
        background: ${theme.grisClaro};
        border: none;
        cursor: pointer;
        border-radius: 0.625rem; /* 10px */
        height: 5rem; /* 80px */
        width: 100%;
        padding: 0 1.25rem; /* 20px */
        font-size: 1.5rem; /* 24px */
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
    }
 
    .rdp {
        position: absolute;
    }
 
    .rdp-months {
        display: flex;
        justify-content: center;
    }
 
    .rdp-month {
        background: #fff;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        padding: 20px;
        border-radius: 10px;
    }
 
    @media (max-width: 60rem) {
        /* 950px */
        & > * {
            width: 100%;
        }
    }

    @media(max-width: 769px){
      z-index:10;
      
    }
`;

const formatDate = (date = new Date()) =>{
 return  format(date, `dd 'de' MMMM 'de' yyyy`, {locale: es})
}

function DatePicker({date, setDate, setVisibility, visibility}) {
  

  return (  
    <InputContainer>
      <input 
         type="text" 
         readOnly 
         value={formatDate(date)}
         onClick={()=> setVisibility(!visibility)}
      />
      {visibility && (
        <DayPicker 
          mode='single'
          onSelect={setDate} 
          selected={date}
          locale={es} 
          />
      )}
    </InputContainer>
  )
}

export default DatePicker