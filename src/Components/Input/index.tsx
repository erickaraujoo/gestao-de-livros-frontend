import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import { ErrorLogin } from '../Error';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  ref: any;
  placeholder?: string;
  autoComplete?: string;
  icon?: React.ComponentType<IconBaseProps>;
  errors?: { message: string };
  value?: string;
}

const Input: React.FC<InputProps> = React.forwardRef(({ icon: Icon, ...rest }, ref: any) => {
  return (
    <>
      <Container>
        {Icon && <Icon size={23} color="#fff" />}
        <input {...rest} ref={ref} />
      </Container>
      {rest.errors && <ErrorLogin errors={rest?.errors} />}
    </>
  );
});

export default Input;
