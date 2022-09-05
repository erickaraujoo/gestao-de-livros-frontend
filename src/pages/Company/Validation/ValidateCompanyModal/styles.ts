import styled from 'styled-components';
import { device, theme } from './../../../../styles/global';

export const Container: any = styled.section`
  display: flex;
  visibility: ${(props: { visible: boolean }) => (props.visible ? 'visible' : 'hidden')};
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
  min-height: 700px;
  height: 80vh;
  padding: 30px 50px 40px;
  border-radius: 10px;
  max-width: 1100px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  div#container-buttons {
    display: flex;
    flex-direction: column;
    padding: 0;

    button {
      width: 100%;
      min-width: 50%;
      margin: 45px auto 0;
      min-height: 45px;
      height: auto;
      font-size: 1rem;
      border-radius: 8px;
      box-shadow: 3px 3px 5px ${theme.colors.blackWithGreatOpacity};
      padding: 10px 0px;
      word-break: break-all;
    }

    @media ${device.tablet} {
      flex-direction: row;
      padding: 0 40px;

      button {
        width: calc(50% - 20px);
        min-width: calc(50% - 20px);
      }
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

export const ContainerCompanyData = styled.section`
  padding: 20px 0 50px;

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
    padding: 20px 50px 50px;

    > div {
      > div {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;

        > div {
          width: calc(50% - 15px);
          display: flex;
          flex-wrap: wrap;
          padding-right: 30px;
        }

        > div:nth-child(n + 3) {
          margin-top: 20px;
        }

        > div + div {
          margin-top: 0px;
        }
      }
    }
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
