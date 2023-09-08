import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 40px;
  //height: calc(100vh - 130px);
`;

export const Title = styled.div`
  display: flex;
  font-size: 24px;
  margin-bottom: 40px;
  font-family: 'Roboto Mono', monospace;
  color: #000000;
  font-weight: 200;
  text-align: center;
  @media (max-width: 500px) {
    font-size: 24px;
    padding: 0 40px;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  border: 2px solid #5c5b5a;
  border-radius: 4px;
  background-color: rgb(226, 94, 62, 0.8);
  margin-bottom: 50px;
  @media (max-width: 500px) {
    width: 350px;
  }
`;

export const FormHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  background: none;
  & > button:nth-child(1) {
    border-right: 0.5px solid #5c5b5a;
  }
  & > button:nth-child(2) {
    border-left: 0.5px solid #5c5b5a;
  }
`;

export const FormHeaderItem = styled.button`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto Mono', monospace;
  color: #000000;
  font-weight: 200;
  height: 45px;
  border-bottom: ${({theme}) => (theme.select ? 'none' : 'solid 2px #5C5B5A')};
  background-color: ${({theme}) => (theme.select ? 'rgb(226, 94, 62, 0)' : 'rgb(226, 94, 62)')};
  font-size: 16px;
  width: 50%;
  &:hover {
    background-color: ${({theme}) => (theme.select ? 'rgb(226, 94, 62, 0)' : 'rgb(226, 94, 62, 1)')};
    color: ${({theme}) => (theme.select ? 'black' : 'white')};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: calc(100% - 80px);
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 10px;
`;

export const Label = styled.label`
  cursor: pointer;
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  color: #000000;
  font-weight: 200;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  border-radius: 5px;
  padding: 15px;
  font-family: 'Roboto Mono', monospace;
  background-color: white;
  font-size: 14px;
  color: #000000;
  box-sizing: border-box;
  display: block;
  width: 100%;
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  width: 200px;
  height: 30px;
  border-radius: 6px;
  background-color: #da4e2b;
  margin-top: 20px;
  cursor: pointer;
  font-family: 'Roboto Mono', monospace;
  transition: transform 0.3s ease;
  &:hover {
    color: white;
  }
  &:active {
    transform: scale(0.95);
  }
`;

export const Error = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 10px;
  font-family: 'Roboto Mono', monospace;
  font-weight: 900;
  font-size: 12px;
  color: #000000;
`;

export const ServerError = styled.div`
  text-align: center;
  width: 300px;
  font-family: 'Roboto Mono', monospace;
  margin: 0 0 40px 0;
  font-weight: 900;
  font-size: 24px;
  color: #000000;
`;
