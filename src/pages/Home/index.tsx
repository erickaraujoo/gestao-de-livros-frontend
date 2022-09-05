import { lazy, useEffect } from 'react';
import { Container, Title } from './styles';
import { USER_TYPES } from '../../config/constants';
import OperationsListPage from './OperationsList';
import { returnToken, returnUser } from '../../utils';
import { useNavigate, RouteComponentProps } from '@reach/router';
import OperationListProvider from '../../context/Home/OperationList';
import { IUser } from '../../models/user';

const Footer = lazy(() => import('../../Components/Footer'));
const Header = lazy(() => import('../../Components/Header'));

const HomePage = (props: RouteComponentProps) => {
  const navigate = useNavigate();

  const stringifyUser = returnUser();
  const token = returnToken();

  const user: IUser = stringifyUser ? JSON.parse(stringifyUser) : null;;

  useEffect(() => {
    (!token || (user && user.userType.name === USER_TYPES.INSPECTOR)) && navigate('/');
  }, [navigate, token, user]);

  return (
    <>
      <Header />
      <Container>
        <Title>
          <h1>SEJA BEM-VINDO, {user && user.name.toUpperCase()}</h1>
        </Title>

        {user && user.userType.name !== USER_TYPES.INSPECTOR && (
          <OperationListProvider>
            <OperationsListPage user={user} />
          </OperationListProvider>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
