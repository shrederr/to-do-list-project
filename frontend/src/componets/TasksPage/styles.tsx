import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

export const ControlPanelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 100px);
  height: 80px;
  padding: 0 50px;
  background-color: rgb(255, 155, 80, 0.4);
  position: fixed;
  bottom: 0;
`;

export const AddTaskButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 30px;
  border-radius: 6px;
  background-color: #da4e2b;
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
export const LogOut = styled.button`
  display: flex;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    & > svg {
      fill: white;
    }
  }
  &:active {
    transform: scale(0.9);
  }
`;

export const ViewTaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  width: 570px;
  padding: 15px;
  border-radius: 10px;
  height: auto;
  background-color: rgb(226, 94, 62, 0.8);
  transition: transform 0.5s ease; /* Время анимации и тип анимации */
  transform: ${({theme}) => (theme.open ? 'translateY(0%)' : 'translateY(200%)')};
  z-index: 9999;
  @media (max-width: 700px) {
    height: 100vh;
    top: 5%;
    width: calc(100% - 30px);
  }
`;

export const TaskTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  color: black;
  width: 100%;
`;

export const TitleButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  height: 40px;
  &:hover {
    color: white;
  }
  &:disabled {
    cursor: not-allowed;
    color: #555455;
    &:hover {
      color: #555455;
    }
  }
`;

export const TaskTitle = styled.input`
  border-radius: 5px;
  padding: 15px;
  font-family: 'Roboto Mono', monospace;
  background-color: white;
  font-size: 14px;
  margin-bottom: 15px;
  color: #000000;
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 30px;
`;

export const TaskContent = styled.textarea`
  font-family: 'Roboto Mono', monospace;
  background-color: white;
  font-size: 16px;
  color: #000000;
  padding: 15px;
  resize: none;
  border-radius: 5px;
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 200px;
`;

export const LoadImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: 15px;
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
`;
export const PreviewImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;
export const DefaultIconButton = styled.button`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-right: 5px;
  &:hover {
    & > svg {
      fill: white;
    }
  }
`;
export const LoadImage = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 30px;
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

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const TasksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  justify-content: center;
  margin-top: 50px;
`;

export const TaskWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 400px;
  height: 60px;
  padding: 10px;
  border-radius: 30px;
  background-color: #f17029;
  margin-bottom: 20px;
  @media (max-width: 500px) {
    width: calc(90% - 20px);
  }
`;

export const TaskImage = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin-right: 20px;
`;

export const TaskContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 40px;
  justify-content: space-between;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  & > p:nth-child(1) {
    font-size: 16px;
  }
  & > p:nth-child(2) {
    font-size: 10px;
  }
`;

export const TaskDoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 20px;
  align-items: center;
  border-left: 1px solid black;
  padding: 5px;
  margin-left: auto;
  width: 50px;
  justify-content: space-between;
  & > svg {
    &:hover {
      cursor: pointer;
      fill: white;
    }
  }
`;
