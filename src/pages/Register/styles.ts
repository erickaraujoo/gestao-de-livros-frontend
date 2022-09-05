import styled from 'styled-components';
import { device, theme } from './../../styles/global';

export const Container = styled.section`
  width: 100%;
  height: auto;
  padding: 0 30px;
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

  a, div#prev-step {
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

  @media ${device.tablet} {
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

export const Register = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    max-width: 850px;
    margin: 0 auto;
  }
`;
