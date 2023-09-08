import styled, {createGlobalStyle} from 'styled-components';
import {normalize} from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
  ${normalize}
 
  // You can continue writing global styles here
  body {
    padding: 0;
    background-color: #FFBB5C;
  }
  p,form {
    margin: 0;
    padding: 0;
    border: none;
  }
  input,
  textarea,
  label,
  button,
  select {
    border: none;
    outline: none;
    background: none;
    color: inherit;
    padding: 0;
    text-shadow: none;
  }
`;

export const BaseWrapper = styled.div`
  display: flex;
`;
