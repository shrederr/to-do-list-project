import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  width: 200px;
  padding: 15px;
  border-radius: 10px;
  height: auto;
  background-color: rgb(226, 94, 62, 1);
  transition: transform 0.5s ease; /* Время анимации и тип анимации */
  transform: ${({theme}) => (theme.open ? 'translateY(200%)' : 'translateY(-200%)')};
  z-index: 9999;
  @media (max-width: 700px) {
    height: 100vh;
    top: 5%;
    width: calc(100% - 30px);
  }
`;

export const ModalText = styled.div`
  width: 100%;
  font-family: 'Roboto Mono', monospace;
  text-align: center;
  font-size: 14px;
  margin-bottom: 20px;
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ConditionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 5px;
  width: 50px;
  border-radius: 6px;
  background-color: #da4e2b;
  margin-right: 20px;
  cursor: pointer;
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  transition: transform 0.3s ease;
  &:hover {
    color: white;
    & > svg {
      fill: white;
    }
  }
  &:active {
    transform: scale(0.95);
  }
`;
