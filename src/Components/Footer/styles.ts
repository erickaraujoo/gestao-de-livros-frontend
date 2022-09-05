import styled from 'styled-components';

import { theme } from './../../styles/global';

export const Container = styled.footer`
  margin-top: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 20px;

  h2 {
    font-size: 1rem;
    color: ${theme.colors.gray};
    text-align: center;
    font-weight: 400;
    margin-bottom: 40px;
  }
`;
