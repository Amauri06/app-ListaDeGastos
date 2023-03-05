import React, { useEffect } from 'react'
import styled from 'styled-components';
import theme from '../theme';
import convertAmount from '../Functions/convertCurrency';
import { useTotalExpense } from '../context/TotalExpenseInTheMonth'; 


const BarContainer = styled.div`
    background: ${theme.verde};
    font-size: 1.25rem; /* 20px */
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 0.62rem 2.25rem; /* 10px 40px */
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
 
    @media(max-width: 31.25rem) { /* 500px */
        flex-direction: column;
        font-size: 14px;
    }
   

`;

function BarSpent() {

 const {total} = useTotalExpense();
 
  return (
    <BarContainer>
        <p>Total Gastado en el mes:</p>
        <p>{convertAmount(total)}</p>
    </BarContainer>
  )
}

export default BarSpent