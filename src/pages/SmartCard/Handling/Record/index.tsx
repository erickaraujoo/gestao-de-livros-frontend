import { lazy, useEffect, useState } from 'react';
import { Container, Title, Subtitle } from './styles';
import { FiArrowLeft } from 'react-icons/fi';
import {
  API_ERROR_TYPES,
  CONFIG,
  ERROR_TYPES_FOR_COMMUNICATION_WITH_READER,
  ERROR_TYPES_FOR_UNRECOGNIZED_READER,
  MESSAGE_BLOCKED_SEAL,
  MESSAGE_DATA_ALREADY_REGISTERED,
  MESSAGE_RECORDING_ERROR,
  USER_TYPES,
} from '../../../../config/constants';
import { returnNameUserType, returnToken, returnUser } from '../../../../utils';
import { Link, useNavigate, RouteComponentProps, useLocation } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import { checkBlockChip } from '../../../../store/modules/chip/action';
import { IUser } from '../../../../models/user';
import { IListSelectors } from './../../../../models/redux/selectors';
import { ModalReaderListFailed, ModalWarning } from '../../../../Components/Modal';
import { theme } from './../../../../styles/global';
import { ModalCheckConnectionChip } from './../../../../Components/Modal';
import { WaitOneMomentModal } from '../../../../Components/Loading';

const Header = lazy(() => import('../../../../Components/Header'));
const Footer = lazy(() => import('../../../../Components/Footer'));
const GraphicForm = lazy(() => import('./Form/graphicForm'));
const WorkshopForm = lazy(() => import('./Form/workshopForm'));

const WritePage = (props: RouteComponentProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const token = returnToken();
  const stringifyUser = returnUser();

  const {
    readerRequest: { errorType: errorTypeReaderRequest },
    chip: { loading: loadingChip, success: successChip, error: errorChip, errorType: errorTypeChip },
    inmetroSerialType: { loading: loadingInmetroSerialType },
  } = useSelector((state: IListSelectors) => state);

  const user: IUser = stringifyUser ? JSON.parse(stringifyUser) : null;

  const [visibleModalCheckConnectionChip, setVisibleModalCheckConnectionChip] = useState(false);
  const [visibleModalReaderListFailed, setVisibleModalReaderListFailed] = useState(false);
  const [visibleModalWarning, setVisibleModalWarning] = useState(false);
  const [textModalWarning, setTextModalWarning] = useState<string | null>(null);
  const [errorTypeModalWarning, setErrorTypeModalWarning] = useState<string | null>(null);

  const [sourceAxiosToken, setSourceAxiosToken] = useState<any>(null);

  useEffect(() => {
    ((!token && location.pathname !== CONFIG.DEFAULT_ELECTRON_URL) ||
      (user && user.userType.name === USER_TYPES.INSPECTOR)) &&
      navigate(CONFIG.DEFAULT_ELECTRON_URL);
  }, [navigate, token, user, location]);

  useEffect(() => {
    dispatch(checkBlockChip());
  }, [dispatch]);

  useEffect(() => {
    loadingChip && setVisibleModalCheckConnectionChip(true);
  }, [loadingChip]);

  useEffect(() => {
    (successChip || errorChip) && setVisibleModalCheckConnectionChip(false);
  }, [errorChip, successChip]);

  useEffect(() => {
    errorTypeChip &&
      ERROR_TYPES_FOR_UNRECOGNIZED_READER.includes(errorTypeChip) &&
      setVisibleModalReaderListFailed(!visibleModalReaderListFailed);
  }, [errorTypeChip, visibleModalReaderListFailed]);

  useEffect(() => {
    if (
      (errorTypeReaderRequest && errorTypeReaderRequest === API_ERROR_TYPES.BLOCKED_SEAL) ||
      (errorTypeChip && errorTypeChip === API_ERROR_TYPES.BLOCKED_SEAL)
    ) {
      setTextModalWarning(MESSAGE_BLOCKED_SEAL);
      errorTypeChip && setErrorTypeModalWarning(errorTypeChip);
      setVisibleModalWarning(true);
    }
  }, [errorTypeChip, errorTypeReaderRequest]);

  useEffect(() => {
    if (errorTypeReaderRequest && errorTypeReaderRequest === API_ERROR_TYPES.DATA_ALREADY_REGISTERED) {
      setTextModalWarning(MESSAGE_DATA_ALREADY_REGISTERED);
      setErrorTypeModalWarning(errorTypeReaderRequest);
      setVisibleModalWarning(true);
    }
  }, [errorTypeReaderRequest]);

  useEffect(() => {
    if (
      (errorTypeReaderRequest && ERROR_TYPES_FOR_COMMUNICATION_WITH_READER.includes(errorTypeReaderRequest)) ||
      (errorTypeChip && ERROR_TYPES_FOR_COMMUNICATION_WITH_READER.includes(errorTypeChip))
    ) {
      setTextModalWarning(MESSAGE_RECORDING_ERROR);
      setVisibleModalWarning(true);
    }
  }, [errorTypeReaderRequest, errorTypeChip]);

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
          <Link to="/home">
            <FiArrowLeft size={25} />
          </Link>
          <h1>Gravação de Dados - {returnNameUserType(user && user.userType.name)}</h1>
        </Title>
        <Subtitle>
          <p>Preencha o formulário abaixo respeitando o tamanho máximo de cada campo necessário</p>
        </Subtitle>
        {user && user.userType.name === USER_TYPES.GRAPHIC && (
          <GraphicForm user={user} sourceAxiosToken={sourceAxiosToken} setSourceAxiosToken={setSourceAxiosToken} />
        )}
        {user && user.userType.name === USER_TYPES.WORKSHOP && (
          <WorkshopForm user={user} sourceAxiosToken={sourceAxiosToken} setSourceAxiosToken={setSourceAxiosToken} />
        )}
      </Container>
      <Footer />
    </>
  );
};

export default WritePage;
