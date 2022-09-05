import { Suspense } from 'react';
import { store } from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { createHistory, createMemorySource, LocationProvider, Router } from '@reach/router';
import { CONFIG } from './config/constants';

import { LoadingPage } from './Components/Loading';

import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import UserPage from './pages/User';
import LogsPage from './pages/Logs';
import ReadPage from './pages/SmartCard/Handling/Read';
import RecordPage from './pages/SmartCard/Handling/Record';
import 'react-toastify/dist/ReactToastify.css';

import NavigatorConnection from './pages/NavConnection';

import RegisterPage from './pages/Register';
import CompanyValidationPage from './pages/Company/Validation';

const source = createMemorySource(CONFIG.DEFAULT_ELECTRON_URL);
const history = createHistory(source);

const App: React.FC = () => {
  return (
    <>
      <ToastContainer position={'bottom-right'} autoClose={7000} />
      <NavigatorConnection />
      <Provider store={store}>
        <LocationProvider history={history}>
          <Suspense fallback={<LoadingPage />}>
            <Router>
              <LoginPage path={CONFIG.DEFAULT_ELECTRON_URL} />
              <RegisterPage path="/register" />

              <HomePage path="/home" />
              <UserPage path="/user" />
              <LogsPage path="/data/logs" />
              <ReadPage path="/data/reading" />
              <RecordPage path="/data/record" />
              <CompanyValidationPage path="/company/non-validated" />
            </Router>
          </Suspense>
        </LocationProvider>
      </Provider>
    </>
  );
};

export default App;
