import styled from 'styled-components';
import { device, theme } from '../../styles/global';

export const Container = styled.section`
  padding: 0 30px 20px;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  position: relative;
  max-width: 600px;
  margin: 40px auto 0;
  padding: 0 40px;

  h1 {
    font-size: 1.625rem;
    color: ${theme.colors.blue};
    font-weight: 600;
    text-align: center;
  }

  a {
    position: absolute;
    left: 0;
    width: 25px;
    height: 25px;
  }

  svg {
    margin-right: 15px;
    color: ${theme.colors.blue};
    cursor: pointer;
  }
`;

export const Subtitle = styled.div`
  margin-top: 20px;

  p {
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    color: ${theme.colors.black};
  }
`;

export const ContainerCompanyData = styled.section`
  padding: 20px 0 50px;
  position: relative;

  > div {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h3 {
      width: 100%;
      text-align: left;
      color: ${theme.colors.blue};
      margin-bottom: 30px;
    }

    > div {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      > div {
        width: 100%;

        p {
          word-break: keep-all;
          font-weight: 500;
        }

        span {
          margin-left: 5px;
          font-weight: normal;
        }
      }

      > div + div {
        margin-top: 20px;
      }
    }
  }

  @media ${device.tablet} {
    padding: 50px 50px 50px;
    margin: 0 auto;
    max-width: 550px;
  }
`;

export const CompanyData = styled.div``;

export const AddressData = styled.div``;

export const UsersData = styled.div`
  div > div {
    border-radius: 5px;
    padding: 15px 20px;
    border: solid 1px ${theme.colors.blackWithGreatOpacity};
    box-shadow: 0 0 2px ${theme.colors.blackWithGreatOpacity};

    p {
      margin: 2.5px 0;
    }

    p + p {
      word-break: break-all;
    }
  }
`;

export const UpdateDataWithEcommerce = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: inherit;

  button {
    min-height: 50px;
    min-width: auto;
    width: auto;
    word-break: keep-all;
  }
`;
