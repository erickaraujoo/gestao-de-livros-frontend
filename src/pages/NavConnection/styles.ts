import styled from 'styled-components';
import { theme } from './../../styles/global';

export const Container: any = styled.section`
  display: ${(props: { visible: boolean }) => !props.visible ? 'flex' : 'none'};
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: ${theme.colors.blackWithMediumOpacity};
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.div`
  width: 350px;
  height: 125px;
  background-color: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  p {
    font-weight: 600;
  }

  span {
    margin-left: 15px;
  }
`;
