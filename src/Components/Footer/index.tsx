import React from 'react';
import { Container } from './styles';

const Footer: React.FC = () => {
  return (
    <Container>
      <h2>Primi - {new Date().getFullYear() || '2021'} © Todos os Direitos Reservados</h2>
    </Container>
  );
};

export default Footer;
