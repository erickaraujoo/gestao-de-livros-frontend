import { device, theme } from './../../styles/global';
import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  height: 60px;
  background: ${theme.colors.blue};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 999;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  div#title {
    img {
      width: auto;
      height: 45%;
    }

    h1 {
      color: #fff;
      font-size: 1.25rem;
      text-align: center;
      font-weight: 600;
      min-width: 150px;
      margin-left: 15px;
    }
  }

  div#icons {
    a {
      width: 25px;
      height: 25px;
      margin-left: 25px;
      transition: 0.2s;

      svg {
        cursor: pointer;
        transition: 0.2s;
      }

      &:hover {
        width: 30px;
        height: 30px;

        svg {
          width: 30px;
          height: 30px;
        }
      }
    }
  }

  @media ${device.tablet} {
    position: relative;
  }
`;
