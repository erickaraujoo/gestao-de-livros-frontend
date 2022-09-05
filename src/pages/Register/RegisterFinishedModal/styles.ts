import styled from 'styled-components';
import { theme, device } from '../../../styles/global';

export const Container: any = styled.section`
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
  padding: 0 20px;
`;

export const Modal = styled.div`
  width: 100%;
  background: ${theme.colors.white};
  height: auto;
  padding: 50px 50px 40px;
  border-radius: 10px;
  max-width: 750px;
  display: flex;
  flex-direction: column;

  h2#title {
    text-align: center;
    color: ${theme.colors.green};
    text-transform: uppercase;
    font-size: 1.75rem;
  }

  p#text {
    text-align: center;
    margin-top: 45px;
    font-size: 1rem;
  }

  button {
    width: 100%;
    margin: 45px auto 0;
    min-width: auto;
    min-height: 45px;
    height: auto;
    font-size: 1rem;
    border-radius: 8px;
    box-shadow: 3px 3px 5px ${theme.colors.blackWithGreatOpacity};
    padding: 10px 0px;
    word-break: break-all;
  }

  @media ${device.tablet} {
    button {
      width: 280px;
    }
  }
`;
