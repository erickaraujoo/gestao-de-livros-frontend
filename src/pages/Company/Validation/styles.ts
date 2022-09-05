import styled from 'styled-components';
import { device, theme } from './../../../styles/global';

export const Container = styled.section`
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

export const ContainerCompanies = styled.div`
  max-width: 1100px;
  width: 100%;

  margin: 100px auto 0;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
