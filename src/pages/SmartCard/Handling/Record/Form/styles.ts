import styled from 'styled-components';
import { device, theme } from '../../../../../styles/global';

export const Form = styled.form`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto 0;

  > div,
  > input {
    width: 100%;
  }

  > div + div {
    margin-top: 30px;
  }

  h3 {
    color: ${theme.colors.blue};
    margin: 10px 0;
    font-weight: 600;
    font-size: 1.125rem;
  }

  div#cylinder_title {
    height: auto;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    margin-bottom: 20px;

    div {
      margin-left: auto;
      flex-wrap: wrap;
      max-width: 280px;
      width: 100%;
      display: flex;
      justify-content: space-between;

      button {
        margin-top: 10px;
        padding: 0 10px;
        height: 25px;
        border: none;
        background: ${theme.colors.blue};
        color: ${theme.colors.white};
        border-radius: 2px;

        &:disabled {
          background: ${theme.colors.white};
          color: ${theme.colors.blackWithMediumOpacity};
          box-shadow: 0 0 1px ${theme.colors.blackWithMediumOpacity};
        }
      }

      button#btn-remove-cylinder {
        background: ${theme.colors.white};
        border: solid 1.5px ${theme.colors.red};
        color: ${theme.colors.red};
        font-weight: bold;
        max-width: 25px;
        max-height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:disabled {
          background: ${theme.colors.white};
          border: none;
          color: ${theme.colors.blackWithMediumOpacity};
          box-shadow: 0 0 1px ${theme.colors.blackWithMediumOpacity};
        }
      }
    }

    @media ${device.tablet} {
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      margin-bottom: 0;

      div {
        button {
          margin-top: 0;
        }
      }
    }
  }

  div#cylinder_pagination {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    p span {
      font-weight: 600;
    }
  }

  button[type='submit'] {
    margin-top: 50px;
  }

  @media ${device.tablet} {
    width: 450px;
    justify-content: center;
  }
`;
