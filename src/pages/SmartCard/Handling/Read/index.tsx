import { Link, useNavigate, RouteComponentProps, useLocation } from '@reach/router';
import { lazy, useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { ModalCheckConnectionChip, ModalReaderListFailed, ModalWarning } from '../../../../Components/Modal';
import {
  API_ERROR_TYPES,
  CONFIG,
  ERROR_TYPES_FOR_COMMUNICATION_WITH_READER,
  ERROR_TYPES_FOR_UNRECOGNIZED_READER,
  MESSAGE_BLOCKED_SEAL,
  MESSAGE_READING_ERROR,
  USER_TYPES,
} from '../../../../config/constants';
import { IListSelectors } from '../../../../models/redux/selectors';
import { IUser } from '../../../../models/user';
import { returnNameUserType, returnToken, returnUser } from '../../../../utils';
import { Container, Subtitle, Title } from './styles';

import GraphicDataContainer from './Data/graphicData';
import InspectorDataContainer from './Data/inspectorData';
import WorkshopContainer from './Data/workshopData';
import FrentistDataContainer from './Data/frentistData';
import { theme } from './../../../../styles/global';
import { WaitOneMomentModal } from '../../../../Components/Loading';

const Header = lazy(() => import('../../../../Components/Header'));
const Footer = lazy(() => import('../../../../Components/Footer'));

const ReadPage = (props: RouteComponentProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = returnToken();
  const stringifyUser = returnUser();

  const user: IUser = stringifyUser ? JSON.parse(stringifyUser) : null;

  const {
    chip: { errorType: errorTypeChip, loading: loadingChip },
    readerRequest: { errorType: errorTypeReaderRequest },
    inmetroSerialType: { loading: loadingInmetroSerialType },
  } = useSelector((state: IListSelectors) => state);

  const [visibleModalCheckConnectionChip, setVisibleModalCheckConnectionChip] = useState(false);
  const [visibleModalReaderListFailed, setVisibleModalReaderListFailed] = useState(false);
  const [visibleModalWarning, setVisibleModalWarning] = useState(false);
  const [textModalWarning, setTextModalWarning] = useState<string | null>(null);
  const [errorTypeModalWarning, setErrorTypeModalWarning] = useState<string | null>(null);

  const [sourceAxiosToken, setSourceAxiosToken] = useState<any>(null);

  useEffect(() => {
    !token && location.pathname !== CONFIG.DEFAULT_ELECTRON_URL && navigate(CONFIG.DEFAULT_ELECTRON_URL);
  }, [navigate, token, location.pathname]);

  useEffect(() => {
    setVisibleModalCheckConnectionChip(loadingChip);
  }, [loadingChip]);

  useEffect(() => {
    errorTypeChip &&
      ERROR_TYPES_FOR_UNRECOGNIZED_READER.includes(errorTypeChip) &&
      setVisibleModalReaderListFailed(true);
  }, [errorTypeChip, visibleModalReaderListFailed]);

  useEffect(() => {
    if (errorTypeReaderRequest && errorTypeReaderRequest === API_ERROR_TYPES.BLOCKED_SEAL) {
      setTextModalWarning(MESSAGE_BLOCKED_SEAL);
      setErrorTypeModalWarning(errorTypeReaderRequest);
      setVisibleModalWarning(true);
    }
  }, [errorTypeReaderRequest, visibleModalWarning]);

  useEffect(() => {
    if (
      (errorTypeReaderRequest && ERROR_TYPES_FOR_COMMUNICATION_WITH_READER.includes(errorTypeReaderRequest)) ||
      (errorTypeChip && ERROR_TYPES_FOR_COMMUNICATION_WITH_READER.includes(errorTypeChip))
    ) {
      setTextModalWarning(MESSAGE_READING_ERROR);
      setVisibleModalWarning(true);
    }
  }, [errorTypeReaderRequest, errorTypeChip, visibleModalWarning]);

  return (
    <>
      <WaitOneMomentModal visible={loadingInmetroSerialType} />

      <ModalCheckConnectionChip
        visible={visibleModalCheckConnectionChip}
        handleVisible={setVisibleModalCheckConnectionChip}
        bgColorPrimaryButton={theme.colors.white}
        sourceAxiosToken={sourceAxiosToken}
      />

      <ModalReaderListFailed
        visible={visibleModalReaderListFailed}
        handleVisible={setVisibleModalReaderListFailed}
        textCenter
      />

      <ModalWarning
        title="Obs! Aviso importante"
        text={textModalWarning}
        errorType={errorTypeModalWarning}
        visible={visibleModalWarning}
        handleVisible={setVisibleModalWarning}
        textCenter
      />

      <Header />
      <Container>
        <Title>
          {user && user.userType.name !== USER_TYPES.INSPECTOR && (
            <Link to="/home">
              <FiArrowLeft size={25} />
            </Link>
          )}
          <h1>Leitura dos Dados - {returnNameUserType(user && user.userType.name)}</h1>
        </Title>
        <Subtitle>
          <p>Segue abaixo os dados que contém no documento para leitura</p>
        </Subtitle>
        {user && user.userType.name === USER_TYPES.GRAPHIC && (
          <GraphicDataContainer
            user={user}
            sourceAxiosToken={sourceAxiosToken}
            setSourceAxiosToken={setSourceAxiosToken}
          />
        )}
        {user && user.userType.name === USER_TYPES.WORKSHOP && (
          <WorkshopContainer
            user={user}
            sourceAxiosToken={sourceAxiosToken}
            setSourceAxiosToken={setSourceAxiosToken}
          />
        )}
        {user && user.userType.name === USER_TYPES.INSPECTOR && (
          <InspectorDataContainer
            user={user}
            sourceAxiosToken={sourceAxiosToken}
            setSourceAxiosToken={setSourceAxiosToken}
          />
        )}
        {user && user.userType.name === USER_TYPES.FRENTIST && <FrentistDataContainer user={user} />}
      </Container>
      <Footer />
    </>
  );
};

export default ReadPage;
