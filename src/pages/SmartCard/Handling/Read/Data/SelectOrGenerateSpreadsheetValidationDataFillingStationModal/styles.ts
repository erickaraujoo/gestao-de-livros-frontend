import styled from 'styled-components';
import { device, theme } from './../../../../../../styles/global';

export const Container: any = styled.section`
  display: ${(props: { visible: boolean }) => (props.visible ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
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
  padding: 20px 80px 80px;
  border-radius: 10px;
  max-width: 900px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  button {
    width: 100%;
    margin: 45px auto 0;
    min-width: 50%;
    min-height: 45px;
    height: auto;
    font-size: 1rem;
    border-radius: 8px;
    box-shadow: 3px 3px 5px ${theme.colors.blackWithGreatOpacity};
    padding: 10px 0px;
    word-break: break-all;
  }

  div#loading-data {
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      font-size: 1.125rem;
      font-weight: 400;
    }

    span {
      margin-left: 10px;
    }
  }

  @media ${device.tablet} {
    button {
      width: 280px;
    }
  }
`;

export const Title = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  h2 {
    margin-top: 40px;
    text-align: center;
    color: ${theme.colors.blue};
    text-transform: uppercase;
    font-size: 1.75rem;
  }

  svg {
    color: ${theme.colors.blue};
    position: absolute;
    right: -20px;
    cursor: pointer;
  }
`;

export const SelectOrGenerateSpreadsheetContainer = styled.div`
  margin-top: 60px;

  p {
    margin: 0 auto;
    text-align: center;
  }

  div#container-flex {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 60px;

    div#select-file-validation-data {
      width: 100%;
      height: 50px;
      background-color: ${theme.colors.blue};
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      transition: 0.2s;

      &:hover {
        background-color: ${theme.colors.dullBlue};
      }

      label {
        width: 100%;
        color: ${theme.colors.white};
        font-size: 1rem;
        text-align: center;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-weight: 500;
      }
    }

    input[type='file'] {
      display: none;
    }

    button {
      max-height: 50px;
      margin-top: 20px;
    }
  }

  @media ${device.tablet} {
    div#container-flex {
      justify-content: space-evenly;

      > div#select-file-validation-data,
      button {
        width: calc(50% - 25px);
        margin-top: 0px;
      }
    }
  }
`;
