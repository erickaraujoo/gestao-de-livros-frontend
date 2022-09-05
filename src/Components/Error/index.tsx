import { ErrorLoginInfo } from './styles';

export const ErrorLogin = ({ errors }: { errors: { message: string } }) => (
  <ErrorLoginInfo>{errors && errors.message}</ErrorLoginInfo>
);
