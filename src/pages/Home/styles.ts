import styled from 'styled-components';
import { theme } from '../../styles/global';

export const Container = styled.section`
  padding: 0 30px;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;

  h1 {
    font-size: 1.5rem;
    color: ${theme.colors.blue};
    font-weight: 600;
    text-align: center;
  }

  svg {
    margin-right: 15px;
    color: ${theme.colors.blue};
  }
`;
