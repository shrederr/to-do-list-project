import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffbb5c;
  align-items: center;
  min-height: 100vh;
`;
export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex-grow: 1;
`;
//header
export const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 155, 80, 0.4);
  height: 90px;
  width: 100%;
`;

export const HeaderContentWrapper = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.div`
  display: flex;
  font-family: 'Roboto Mono', monospace;
  color: #000000;
  text-align: center;
  font-weight: 200;
  font-size: 36px;
  letter-spacing: 2px;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 80px;
  @media (max-width: 500px) {
    width: 90%;
    font-size: 28px;
  }
`;
