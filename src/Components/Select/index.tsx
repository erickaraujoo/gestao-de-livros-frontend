import React from 'react';
import { SelectHTMLAttributes } from 'react';
import { ErrorLogin } from '../Error';

import { Container } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  ref: any;
  errors?: { message: string };
  options: { title: string; value: string | number }[];
}

const Select: React.FC<SelectProps> = React.forwardRef(({ options, ...rest }, ref: any) => {
  return (
    <>
      <Container>
        <select {...rest} ref={ref}>
          {options.map(({ title, value }: { title: string; value: string | number }, index) => (
            <option key={index} value={value}>
              {title}
            </option>
          ))}
        </select>
      </Container>
      {rest.errors && <ErrorLogin errors={rest?.errors} />}
    </>
  );
});

export default Select;
