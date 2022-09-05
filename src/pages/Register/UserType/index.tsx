import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@reach/router';
import { FiArrowLeft } from 'react-icons/fi';

import { useSelectedUserType } from '../../../context/Register/RegisterContext';

import { Container, UserType } from './styles';
import { Title, Subtitle } from '../styles';
import { CONFIG, MESSAGE_REGISTRATION_AS_ATTENDANT_UNAVAILABLE, USER_TYPES } from '../../../config/constants';
import { findUserTypesToCreate } from '../../../store/modules/userType/actions';
import { IListSelectors } from './../../../models/redux/selectors';
import { returnNameUserType } from '../../../utils';
import { ClipLoader } from 'react-spinners';

import ItlImage from '../../../assets/itl.png';
import FrentistImage from '../../../assets/frentist.png';
import InspectorImage from '../../../assets/inspector.png';
import CylinderManufactureImage from '../../../assets/cylinder_manufacture.png';
import InstallerImage from '../../../assets/installer.png';
import CylinderRequalifierImage from '../../../assets/cylinder_requalifier.png';

import Image from '../../../Components/Image';

import ModalWorkshopAlreadyRegistered from './ModalWorkshopAlreadyRegistered/index';

import { useSteps } from './../../../context/Register/RegisterContext';
import { ModalWarning } from '../../../Components/Modal';

const RegisterUserType: React.FC = () => {
  const dispatch = useDispatch();

  const { selectedUserType, setSelectedUserType } = useSelectedUserType();
  const { steps, setSteps } = useSteps();

  const imageUserTypes = [
    InspectorImage,
    FrentistImage,
    CylinderManufactureImage,
    InstallerImage,
    CylinderRequalifierImage,
  ];

  const {
    loading: fetchingUserTypes,
    data: userTypes,
    error: failureFetchUserType,
  } = useSelector((state: IListSelectors) => state.userType);

  const [visibleModalWorkshopAlreadyRegistered, setVisibleModalWorkshopAlreadyRegistered] = useState(false);
  const [textModalWarning, setTextModalWarning] = useState<string | null>(null);
  const [visibleModalWarning, setVisibleModalWarning] = useState<boolean>(false);

  const handleUserType = (userType: { id: number; name: string }) => {
    if (userType.name === USER_TYPES.FRENTIST) {
      setTextModalWarning(MESSAGE_REGISTRATION_AS_ATTENDANT_UNAVAILABLE);
      setVisibleModalWarning(true);
      return;
    }

    setSelectedUserType && setSelectedUserType(userType);

    if (steps && setSteps) {
      steps[0]['current'] = false;
      steps[0]['finished'] = true;
      steps[1]['current'] = true;

      setSteps([...steps]);
    }
  };

  const handleVisibleModalWorkshopAlreadyRegistered = (value: boolean) =>
    setVisibleModalWorkshopAlreadyRegistered(value);

  useEffect(() => {
    dispatch(findUserTypesToCreate());
  }, [dispatch]);

  return !selectedUserType?.name && !selectedUserType?.id ? (
    <Container>
      <Title>
        <Link to={CONFIG.DEFAULT_ELECTRON_URL}>
          <FiArrowLeft size={25} />
        </Link>
        <h1>Cadastro do Usuário</h1>
      </Title>
      <Subtitle>
        <p>Selecione o usuário desejado a cadastrar.</p>
      </Subtitle>

      <ModalWorkshopAlreadyRegistered
        visible={visibleModalWorkshopAlreadyRegistered}
        setVisible={setVisibleModalWorkshopAlreadyRegistered}
      />

      <ModalWarning
        visible={visibleModalWarning}
        handleVisible={setVisibleModalWarning}
        title={'Obs! Aviso importante'}
        text={textModalWarning}
        textCenter
      />

      {!fetchingUserTypes && !failureFetchUserType && (
        <UserType>
          <div onClick={() => handleVisibleModalWorkshopAlreadyRegistered(true)}>
            <Image image={ItlImage} />
            <p>ITL</p>
          </div>
          {Array.isArray(userTypes.response) &&
            userTypes.response.map(({ id, name }, index) => (
              <div key={index} onClick={() => handleUserType({ id, name })}>
                <Image image={imageUserTypes[index]} />
                <p>{returnNameUserType(name)}</p>
              </div>
            ))}
        </UserType>
      )}

      {fetchingUserTypes && (
        <div id="loading-date">
          <p>Carregando dados...</p>
          <ClipLoader size={30} />
        </div>
      )}

      {failureFetchUserType && (
        <div id="no-content">
          <p>Nenhum usuário encontrado...</p>
        </div>
      )}
    </Container>
  ) : null;
};

export default RegisterUserType;
