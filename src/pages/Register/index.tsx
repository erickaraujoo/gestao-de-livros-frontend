import { RouteComponentProps } from '@reach/router';

import { Container, Register } from './styles';

import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

import RegisterProvider from '../../context/Register/RegisterContext';

import RegisterFinishedModal from './RegisterFinishedModal';
import RegisterLoadingModal from './LoadingModal';

import RegisterCompanySteps from './RegisterSteps';
import RegisterCompanyForm from './CompanyForm';
import RegisterLoginForm from './LoginForm';
import RegisterUserType from './UserType';

const RegisterPage = (props: RouteComponentProps) => (
  <>
    <Header />
    <Container>
      <Register>
        <RegisterProvider>
          <RegisterFinishedModal />
          <RegisterLoadingModal />

          <RegisterCompanySteps />
          <RegisterCompanyForm />
          <RegisterLoginForm />
          <RegisterUserType />
        </RegisterProvider>
      </Register>
    </Container>
    <Footer />
  </>
);

export default RegisterPage;
