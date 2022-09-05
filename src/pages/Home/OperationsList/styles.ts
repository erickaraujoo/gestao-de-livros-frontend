import styled from 'styled-components';
import { device, theme } from '../../../styles/global';

export const Subtitle = styled.div`
  margin-top: 80px;

  p {
    font-size: 1.25rem;
    font-weight: 500;
    text-align: center;
    color: ${theme.colors.black};
  }

  @media ${device.tablet} {
    margin-top: 140px;
  }
`;

export const OperationsList = styled.ul`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;

  a {
    width: 80%;
    height: 180px;
    box-shadow: 0 0 5px ${theme.colors.blackWithMediumOpacity};
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    text-decoration: none;

    & + a {
      margin-top: 30px;
    }

    div {
      height: auto;

      img {
        margin: 0 auto;
        height: 80px;
        width: auto;
      }
    }

    p {
      margin-top: 20px;
      color: ${theme.colors.blue};
      font-weight: 600;
      font-size: 1rem;
    }

    @media ${device.tablet} {
      width: 250px;
      transition: 0.3s;

      & + a {
        margin-top: 0px;
      }

      &:hover {
        transform: translateY(-20px);
        box-shadow: 0 0 8px ${theme.colors.blackWithMediumOpacity};
      }
    }
  }

  @media ${device.tablet} {
    max-width: 850px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 60px auto 0;

    li + li {
      margin-top: 0px;
    }
  }
`;
