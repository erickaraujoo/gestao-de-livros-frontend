import React, { ButtonHTMLAttributes } from 'react';
import { ClipLoader } from 'react-spinners';
import { StyledButton, StyledSecundaryButton } from './styles';
import { theme } from '../../styles/global';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  value: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ value, type, loading, onClick }) => {
  const props = { type, onClick };

  return (
    <StyledButton {...props} disabled={loading}>
      {loading ? <ClipLoader size={25} color={theme.colors.white} /> : value}
    </StyledButton>
  );
};

export const SecundaryButton: React.FC<ButtonProps> = ({ value, type, loading, onClick }) => {
  const props = { type, onClick };

  return (
    <StyledSecundaryButton {...props} disabled={loading}>
      {loading ? <ClipLoader size={25} color={theme.colors.white} /> : value}
    </StyledSecundaryButton>
  );
};

export default Button;
