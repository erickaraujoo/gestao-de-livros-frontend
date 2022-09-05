import styled from 'styled-components';
import { theme } from '../../../styles/global';

export const Container: any = styled.section`
  /* display: ${(props: { visible: boolean }) => (props.visible ? 'flex' : 'none')}; */
  display: flex;
  visibility: ${(props: { visible: boolean }) => (props.visible ? 'visible' : 'hidden')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100vh;
  background: ${theme.colors.blackWithMediumOpacity};
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  background: ${theme.colors.white};
  border-radius: 10px;
  padding: 50px 80px;
  display: flex;
  align-items: center;

  p {
    margin-right: 10px;
  }
`;
