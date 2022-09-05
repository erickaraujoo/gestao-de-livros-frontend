import styled from 'styled-components';
import { device, theme } from './../../../styles/global';

export const Container = styled.section`
  height: auto;
  margin: 40px auto 0;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  position: relative;
  visibility: hidden;

  hr {
    width: 100%;
    border: solid 1px ${theme.colors.lightGray};
    position: absolute;
    z-index: -1;
  }

  @media ${device.tablet} {
    visibility: visible;
    display: flex;
  }
`;

export const Steps = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  div:first-of-type {
    margin-left: 0;
    padding-left: 0;
  }

  div:last-of-type {
    margin-right: 0;
    padding-right: 0;
  }
`;

export const Step: any = styled.div`
  position: relative;
  margin: 0 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.white};

  p,
  div#container-step {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: ${(props: { current: boolean; finished: boolean }) =>
      props.current ? `${theme.colors.blue}` : props.finished ? `${theme.colors.green}` : `${theme.colors.dullGray}`};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.white};
  }

  p {
    font-family: arial;
    font-weight: bold;
  }
`;
