import { RouteComponentProps } from '@reach/router';
import { useRegisterLoginStep, useSelectedUserType } from '../../../context/Register/RegisterContext';
import { yupResolver } from '@hookform/resolvers/yup';

import { registerLoginSchema as validationSchema } from '../../../utils/validations';

import { Container, LoginForm } from './styles';
import { Title, Subtitle } from '../styles';
import { FiArrowLeft } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import Input from '../../../Components/Input';
import Button from '../../../Components/Button';
import { ICreateUser } from '../../../models/user';
import { useUser, useCompany, useFinishRegister, useSteps } from './../../../context/Register/RegisterContext';
import { formattedRegisterLogin } from './../../../utils/formatters/user';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCompany } from './../../../store/modules/company/actions';
import { formattedCreateCompany } from '../../../utils/formatters/company';
import { IListSelectors } from './../../../models/redux/selectors';
import { PATTERN_EMAIL } from './../../../config/constants';
import { validateEmailToRegister } from '../../../store/modules/user/actions';
import { ErrorLogin } from '../../../Components/Error';

const RegisterLoginForm = (props: RouteComponentProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const dispatch = useDispatch();

  const { user, setUser } = useUser();
  const { selectedUserType } = useSelectedUserType();
  const { company } = useCompany();
  const { finishRegister, setFinishRegister } = useFinishRegister();
  const { registerLoginStep, setRegisterLoginStep } = useRegisterLoginStep();
  const { steps, setSteps } = useSteps();

  const { loading: creatingCompany } = useSelector((state: IListSelectors) => state.company);
  const { data: hasUser } = useSelector((state: IListSelectors) => state.user);

  useEffect(() => {
    if (finishRegister && company && user) {
      const data = formattedCreateCompany({ company, user });

      dispatch(createCompany(data));
    }
  }, [company, dispatch, finishRegister, user]);

  const handleRegisterLoginStep = (value: boolean) => {
    const form = getValues();

    reset({ ...form });

    setRegisterLoginStep && setRegisterLoginStep(value);

    if (steps && setSteps) {
      steps[1]['current'] = true;
      steps[1]['finished'] = false;
      steps[2]['current'] = false;

      setSteps([...steps]);
    }
  };

  const handleValidateEmailToRegister = (username: string) =>
    username.match(PATTERN_EMAIL) && dispatch(validateEmailToRegister(username));

  const onSubmit = async (data: ICreateUser) => {
    if (Object.values(hasUser.errors).length) return;

    if (selectedUserType && selectedUserType.name) {
      const formattedData = await formattedRegisterLogin(data, selectedUserType);

      setUser && setUser(formattedData);

      setFinishRegister && setFinishRegister(true);
    }
  };

  return registerLoginStep ? (
    <Container>
      <Title>
        {!creatingCompany && (
          <div id="prev-step" onClick={() => handleRegisterLoginStep(false)}>
            <FiArrowLeft size={25} />
          </div>
        )}
        <h1>Cadastro do Login</h1>
      </Title>
      <Subtitle>
        <p>Finalize o cadastro do seu usuário preenchendo os dados para Login.</p>
      </Subtitle>

      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Nome *</label>
          <Input
            type="text"
            id="name"
            name="name"
            ref={register}
            placeholder="Digite o nome do responsável"
            errors={errors.name}
          />
        </div>

        <div>
          <label htmlFor="username">E-mail *</label>
          <Input
            type="email"
            id="username"
            name="username"
            ref={register}
            placeholder="Digite o e-mail do responsável"
            errors={errors.username}
            onChange={({ target }) => handleValidateEmailToRegister(target.value)}
          />
          {hasUser.errors && !(hasUser.errors instanceof Array) && hasUser.errors.username && (
            <ErrorLogin errors={{ message: hasUser.errors.username }} />
          )}
        </div>

        <div>
          <label htmlFor="usernameConfirmation">Confirmar E-mail *</label>
          <Input
            type="email"
            id="usernameConfirmation"
            name="usernameConfirmation"
            ref={register}
            placeholder="Confirme seu e-mail"
            errors={errors.usernameConfirmation}
          />
          {hasUser.errors && !(hasUser.errors instanceof Array) && hasUser.errors.username && (
            <ErrorLogin errors={{ message: hasUser.errors.username }} />
          )}
        </div>

        <div>
          <label htmlFor="password">Senha *</label>
          <Input
            type="password"
            id="password"
            name="password"
            ref={register}
            placeholder="Digite a senha para Login"
            errors={errors.password}
          />
        </div>

        <div>
          <label htmlFor="passwordConfirmation">Confirmar Senha *</label>
          <Input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            ref={register}
            placeholder="Confirme sua senha"
            errors={errors.passwordConfirmation}
          />
        </div>

        <Button type="submit" value={'Finalizar cadastro'} loading={creatingCompany} />
      </LoginForm>
    </Container>
  ) : null;
};

export default RegisterLoginForm;
