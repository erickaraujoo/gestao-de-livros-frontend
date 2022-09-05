import { lazy, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { returnSha256 } from './../../utils/index';
import { toast } from 'react-toastify';
import { FiInfo } from 'react-icons/fi';

import LogoImage from './../../assets/logo.png';

import { loginSchema as validationSchema } from '../../utils/validations';

import {
  Container,
  SectionForm,
  Login,
  Register,
  SelectUserType,
  SelectUser,
  SelectInternalUser,
  SectionBackground,
  WorkshopAlreadyRegistered,
} from './styles';

import Input from '../../Components/Input';
import Image from '../../Components/Image';
import Button from '../../Components/Button';
import { SecundaryButton } from './../../Components/Button';

import { internalUserAuthentication, userAuthentication } from '../../store/modules/auth/actions';

import { CONFIG, USER_TYPES } from '../../config/constants';
import { IListSelectors } from '../../models/redux/selectors';
import { returnToken, returnUser } from '../../utils';
import { RouteComponentProps, useNavigate } from '@reach/router';
import { IUser } from '../../models/user';
import { IAuth } from '../../models/auth';
import { AES } from 'crypto-js';
import { FiLock, FiUser } from 'react-icons/fi';
import { theme } from '../../styles/global';

const Header = lazy(() => import('../../Components/Header'));
const Footer = lazy(() => import('../../Components/Footer'));

const LoginPage = (props: RouteComponentProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading: authenticating, data: authUser } = useSelector((state: IListSelectors) => state.auth);

  const [selectedUser, setSelectedUser] = useState(true);
  const [selectedInternalUser, setSelectedInternalUser] = useState(false);

  const handleRegister = () => navigate('/register');

  useEffect(() => {
    if (authUser && authUser.response) {
      const { token, users, company } = authUser.response;

      if (company) {
        const { finishedAt: finishedCompany, users, validation } = company;

        const [user] = users.filter((user) => user.currentLogged && { ...user });

        const { finishedAt: finishedUser } = user;
        const {
          userType: { name: nameUserType },
        } = user;

        if (finishedCompany || finishedUser) {
          toast.warning('Empresa foi excluida pelo sistema!');
          return;
        }

        if (!validation) {
          toast.warning('Empresa ainda não foi validada pelo usuário interno!');
          return;
        }

        localStorage.setItem('company', AES.encrypt(JSON.stringify(company), CONFIG.KEY_LOCAL_STORAGE).toString());
        localStorage.setItem('token', token);
        localStorage.setItem('users', AES.encrypt(JSON.stringify(user), CONFIG.KEY_LOCAL_STORAGE).toString());

        nameUserType === USER_TYPES.INSPECTOR && navigate('/data/reading');
        nameUserType !== USER_TYPES.INSPECTOR && navigate('/home');
      } else if (users.length) {
        const [user] = users.filter((user) => user.currentLogged && { ...user });

        const { finishedAt: finishedUser } = user;
        const {
          userType: { name: nameUserType },
        } = user;

        if (finishedUser) {
          toast.warning('Usuário interno foi excluido pelo sistema!');
          return;
        }

        localStorage.setItem('token', token);
        localStorage.setItem('users', AES.encrypt(JSON.stringify(user), CONFIG.KEY_LOCAL_STORAGE).toString());

        nameUserType === USER_TYPES.INSPECTOR && navigate('/data/reading');
        nameUserType !== USER_TYPES.INSPECTOR && navigate('/home');
      }
    }
  }, [authUser, navigate]);

  useEffect(() => {
    const token = returnToken();
    const stringifyUser = returnUser();

    if (token && stringifyUser) {
      const { userType }: IUser = JSON.parse(stringifyUser);

      userType && userType.name === USER_TYPES.INSPECTOR && navigate('/data/reading');

      userType && userType.name !== USER_TYPES.INSPECTOR && navigate('/home');
    }
  }, [navigate]);

  const handleSelectedUser = () => {
    reset({});

    setSelectedUser(true);
    setSelectedInternalUser(false);
  };

  const handleSelectedInternalUser = () => {
    reset({});

    setSelectedInternalUser(true);
    setSelectedUser(false);
  };

  const onUserSubmit = async (data: IAuth) => {
    const username = data.username;
    const password = await returnSha256(data.password);

    dispatch(userAuthentication({ username, password }));
  };

  const onInternalUserSubmit = async (data: IAuth) => {
    const username = data.username;
    const password = await returnSha256(data.password);

    dispatch(internalUserAuthentication({ username, password }));
  };

  return (
    <Container>
      <Header />
      <div id="content">
        <SectionBackground />
        <SectionForm>
          <Image id="container-logo" image={LogoImage} />

          <SelectUserType>
            <SelectUser selected={selectedUser} onClick={() => handleSelectedUser()}>
              <div className="user-internal-user-svg">
                <FiUser size={40} />
              </div>
              <div className="user-internal-user-text">
                <p>Cliente</p>
              </div>
            </SelectUser>
            <SelectInternalUser selected={selectedInternalUser} onClick={() => handleSelectedInternalUser()}>
              <div className="user-internal-user-svg">
                <FiLock size={40} />
              </div>
              <div className="user-internal-user-text">
                <p>Interno</p>
              </div>
            </SelectInternalUser>
          </SelectUserType>

          <p>
            Você está como <span>{selectedUser ? 'Usuário Cliente' : 'Usuário Interno'}</span>
          </p>

          {selectedUser && (
            <WorkshopAlreadyRegistered>
              <FiInfo size={25} color={theme.colors.blue} />
              <p>
                Para autenticação como ITL, será necessário possuir o cadastro no sistema <strong>E-commerce</strong> da
                Primi
              </p>
            </WorkshopAlreadyRegistered>
          )}

          {selectedUser && (
            <>
              <Login onSubmit={handleSubmit(onUserSubmit)}>
                <div>
                  <label htmlFor="username">E-mail</label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    ref={register}
                    placeholder="Digite seu e-mail..."
                    errors={errors.username}
                    autoComplete={'username'}
                    maxLength={100}
                  />
                </div>

                <div>
                  <label htmlFor="password">Senha</label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    ref={register}
                    placeholder="Digite sua senha..."
                    errors={errors.password}
                    autoComplete={'current-password'}
                    maxLength={65}
                  />
                </div>

                <Button type="submit" value="Entrar" loading={authenticating} />
              </Login>

              <Register>
                <div>
                  <hr />
                  <p>ou</p>
                </div>

                <SecundaryButton type="button" value="Registre-se" onClick={() => handleRegister()} />
              </Register>
            </>
          )}

          {selectedInternalUser && (
            <Login onSubmit={handleSubmit(onInternalUserSubmit)}>
              <div>
                <label htmlFor="username">E-mail</label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  ref={register}
                  placeholder="Digite seu e-mail..."
                  errors={errors.username}
                  autoComplete={'username'}
                  maxLength={100}
                />
              </div>

              <div>
                <label htmlFor="password">Senha</label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  ref={register}
                  placeholder="Digite sua senha..."
                  errors={errors.password}
                  autoComplete={'current-password'}
                  maxLength={65}
                />
              </div>

              <Button type="submit" value="Entrar" loading={authenticating} />
            </Login>
          )}

          <Footer />
        </SectionForm>
      </div>
    </Container>
  );
};

export default LoginPage;
