import styled from 'styled-components';
import { device, theme } from '../../styles/global';

export const Container = styled.section`
  visibility: ${(props: any) => (props.visible ? 'visible' : 'hidden')};
  position: fixed;
  top: 0;
  left: 0;
  background: ${theme.colors.blackWithMediumOpacity};
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 0 20px;
  opacity: ${(props: any) => (props.visible ? 1 : 0)};
  transition: opacity 0.3s;

  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    text-align: ${(props: any) => (props.textCenter ? 'center' : 'justify')};
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    color: ${(props: any) => (props.titleColor ? props.titleColor : theme.colors.blue)};
  }

  div#buttons-flex {
    button:first-child {
      background-color: ${(props: any) =>
        props.bgColorPrimaryButton ? props.bgColorPrimaryButton : theme.colors.blue};
    }
  }
`;

export const Modal = styled.section`
  width: 100%;
  background: ${theme.colors.white};
  height: auto;
  padding: 40px;
  border-radius: 10px;
  max-width: 750px;

  &#checkConnectionChip {
    max-width: 480px;
  }

  h2#title {
    text-transform: uppercase;
  }

  p#text {
    margin-top: 40px;
  }

  h2.text-center,
  p.text-center {
    text-align: center;
  }

  div#buttons-flex {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 60px;

    button {
      width: 100%;
      min-width: auto;
      height: 45px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 8px;
      box-shadow: 3px 3px 5px ${theme.colors.blackWithGreatOpacity};
      padding: 10px 0px;
    }

    button + button {
      margin-top: 20px;
    }
  }

  @media ${device.tablet} {
    div#buttons-flex {
      justify-content: space-evenly;

      button {
        width: 280px;
      }

      button + button {
        margin-top: 0px;
      }
    }
  }
`;

export const CheckConnectionChip = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    h2#title {
      font-size: 1.25rem;
      margin-right: 30px;
      color: ${theme.colors.blackCharcoal};
    }

    span {
      border-color: ${theme.colors.blackCharcoal};
      border-bottom-color: transparent;
    }
  }

  img {
    max-width: 280px;
    margin-top: 35px;
    box-shadow: 2px 2px 5px ${theme.colors.blackCharcoalWithMediumOpacity};
  }
`;

export const Form = styled.form`
  margin-top: 40px;

  div#div-input + div#div-input {
    margin-top: 20px;
  }
`;
