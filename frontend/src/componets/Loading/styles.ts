import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0);
  z-index: 9999999;
`;

export const LoadingImg = styled.img`
  width: 300px;
  height: 300px;
  margin-right: 150px;
`;
