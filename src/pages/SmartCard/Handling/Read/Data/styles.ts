import { device } from './../../../../../styles/global';
import styled from 'styled-components';
import { theme } from '../../../../../styles/global';

export const Container = styled.section`
  width: 100%;
  max-width: 450px;
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;

  h3 {
    width: 100%;
    color: ${theme.colors.blue};
    margin: 40px 0;
    font-weight: 600;
    font-size: 1.125rem;
  }

  div#graphic_content,
  div#itl_content,
  div#cylinder_content,
  div#frentist_content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    > div {
      width: 100%;
      display: flex;
      align-items: center;

      p,
      span {
        height: auto;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }

      p span {
        height: auto;
        font-weight: 600;
        margin-right: 8px;
      }
    }

    > div + div {
      margin-top: 20px;
    }

    > div#title + div {
      margin-top: 0px;
    }

    hr {
      width: 100%;
      border: 0;
      height: 1px;
      margin: 40px 0;
      background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0));
    }

    div#cylinder_pagination {
      width: 100%;
      display: flex;
      justify-content: flex-end;

      p span {
        font-weight: 600;
        margin: 0 5px;
      }
    }
  }

  div#cylinder_title {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    margin-bottom: 40px;

    h3 {
      color: ${theme.colors.blue};
      font-weight: 600;
      font-size: 1.125rem;
      margin-bottom: 10px;
    }

    div {
      margin-left: auto;
      flex-wrap: wrap;
      max-width: 160px;
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

        &:disabled {
          background: ${theme.colors.white};
          color: ${theme.colors.blackWithMediumOpacity};
          box-shadow: 0 0 1px ${theme.colors.blackWithMediumOpacity};
        }
      }
    }

    @media ${device.tablet} {
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      margin: 40px auto;

      h3 {
        margin-top: 0;
      }

      div {
        button {
          margin-top: 0;
        }
      }
    }
  }

  div#expiration-date-not-found {
    padding: 20px 15px;
    border-radius: 10px;
    box-shadow: 0 0 2px ${theme.colors.blackWithMediumOpacity};

    p {
      font-weight: 600;
      text-align: center;
    }
  }

  button[type='submit'] {
    margin-top: 60px;
    padding: 0 20px;
    width: 100%;
  }

  @media ${device.tablet} {
    button[type='submit'] {
      padding: 0 60px;
      width: auto;
    }
  }
`;
