import styled from 'styled-components';
import { device, theme } from './../../../styles/global';

export const Container = styled.section`
  width: 100%;
  height: auto;

  div#loading-date,
  div#no-content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 120px;

    p {
      font-size: 1.25rem;
    }

    p,
    span {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
`;

export const UserType = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 120px;
  flex-wrap: wrap;

  > div {
    width: 100%;
    height: 180px;
    box-shadow: 0 0 5px ${theme.colors.blackWithMediumOpacity};
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    text-decoration: none;

    & + div {
      margin-top: 40px;
    }

    p {
      margin-top: 20px;
      color: ${theme.colors.blue};
      font-weight: 600;
      font-size: 1rem;
    }

    img {
      margin: 0 auto;
      height: 80px;
      width: auto;
    }
  }

  @media ${device.tablet} {
    width: 100%;

    > div {
      width: 250px;
      transition: 0.3s;

      & + div {
        margin-top: 0;
      }
    }

    > div:nth-child(n + 4) {
      margin-top: 40px;
    }

    & > div:hover {
      transform: translateY(-20px);
      box-shadow: 0 0 8px ${theme.colors.blackWithMediumOpacity};
    }
  }
`;
