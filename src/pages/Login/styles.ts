import { theme } from './../../styles/global';
import styled from 'styled-components';
import { device } from '../../styles/global';

import BackgroundImage from '../../assets/background.png';

export const Container = styled.section`
  width: 100%;
  height: 100vh;

  div#content {
    width: inherit;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media ${device.tablet} {
    header {
      display: none;
    }

    div#content {
      height: 100vh;
    }
  }
`;

export const SectionBackground = styled.section`
  background-image: url(${BackgroundImage});
  background-color: ${theme.colors.blue};
  background-size: cover;
  background-position: center;
  visibility: hidden;

  &::before {
    content: '';
    width: calc(100% - 500px);
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.15);
  }

  @media ${device.tablet} {
    visibility: visible;
    width: calc(100% - 500px);
    height: 100%;
  }
`;

export const SectionForm = styled.section`
  padding: 100px 40px 0;
  display: flex;
  flex-direction: column;
  overflow: auto;

  > p {
    margin-top: 30px;
    text-align: center;

    span {
      color: ${theme.colors.blue};
      font-weight: 600;
    }
  }

  > div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media ${device.tablet} {
    padding: 40px 40px 0;
    width: 500px;
    height: 100%;
  }
`;

export const SelectUserType = styled.div`
  width: 100%;
  margin: 80px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    width: 100px;
    height: 75px;
    position: relative;
    margin: 0 15px;
    border-radius: 5px;
    display: flex;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      border: solid 2px ${theme.colors.dullBlue};
      transform: translateY(-10px);

      div.user-internal-user-svg svg {
        color: ${theme.colors.dullBlue};
      }

      div.user-internal-user-text p {
        color: ${theme.colors.dullBlue};
      }
    }

    div.user-internal-user-svg {
      width: 100%;
      display: flex;
      justify-content: center;
      padding-top: 12.5px;
      height: auto;
    }

    div.user-internal-user-text {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: auto;
      position: absolute;
      bottom: -12.5px;

      p {
        height: 25px;
        text-align: center;
        background: ${theme.colors.white};
        padding: 0 7.5px;
        font-weight: 500;
      }
    }
  }
`;

export const SelectUser: any = styled.div`
  border: ${(props: { selected: boolean }) =>
    props.selected ? `solid 2px ${theme.colors.blue}` : `solid 2px ${theme.colors.black}`};

  div.user-internal-user-svg svg {
    color: ${(props: { selected: boolean }) => (props.selected ? theme.colors.blue : theme.colors.black)};
  }

  div.user-internal-user-text p {
    color: ${(props: { selected: boolean }) => (props.selected ? theme.colors.blue : theme.colors.black)};
  }
`;

export const SelectInternalUser: any = styled.div`
  border: ${(props: { selected: boolean }) =>
    props.selected ? `solid 2px ${theme.colors.dullBlue}` : `solid 2px ${theme.colors.black}`};

  div.user-internal-user-svg svg {
    color: ${(props: { selected: boolean }) => (props.selected ? theme.colors.dullBlue : theme.colors.black)};
  }

  div.user-internal-user-text p {
    color: ${(props: { selected: boolean }) => (props.selected ? theme.colors.dullBlue : theme.colors.black)};
  }
`;

export const WorkshopAlreadyRegistered = styled.div`
  display: flex;
  align-items: flex-top;
  margin-top: 20px;
  border: solid 2px ${theme.colors.blue};
  border-radius: 5px;
  padding: 10px;

  svg {
    margin-right: 5px;
  }

  strong {
    color: ${theme.colors.blue};
  }

  p {
    text-align: center;
    font-size: 0.875rem;
    padding-top: 2px;
  }
`;

export const Login = styled.form`
  margin-top: 30px;

  > div + div {
    margin-top: 25px;
  }

  button {
    margin-top: 40px;
    width: 100%;
  }

  @media ${device.tablet} {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
      width: 100%;
    }

    button {
      margin-top: 40px;
      width: 100%;
    }
  }
`;

export const Register = styled.div`
  display: flex;
  flex-direction: column;

  div {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;

    hr {
      width: 100%;
      border: 0;
      height: 1px;
      margin: 40px 0;
      background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0));
    }

    p {
      height: 100%;
      position: absolute;
      background: white;
      padding: 0 15px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
