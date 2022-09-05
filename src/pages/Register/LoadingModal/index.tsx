import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { Container, Modal } from './styles';
import { IListSelectors } from './../../../models/redux/selectors';
import { useEffect, useState } from 'react';

const RegisterLoadingModal: React.FC = () => {
  const { loading: fetchingStates } = useSelector((state: IListSelectors) => state.state);
  const { loading: fetchingCities } = useSelector((state: IListSelectors) => state.city);
  const { loading: fetchingUserTypes } = useSelector((state: IListSelectors) => state.userType);
  const { loading: fetchingViacepAddress } = useSelector((state: IListSelectors) => state.viacepAddress);

  const [visible, setVisible] = useState(false);

  const handleVisible = (value: boolean) => setVisible(value);

  useEffect(() => {
    !!fetchingStates || !!fetchingCities || !!fetchingUserTypes || !!fetchingViacepAddress
      ? handleVisible(true)
      : handleVisible(false);
  }, [fetchingCities, fetchingStates, fetchingUserTypes, fetchingViacepAddress]);

  return (
    <Container visible={visible}>
      <Modal>
        <p>Aguarde um instante...</p>
        <ClipLoader size={20} />
      </Modal>
    </Container>
  );
};

export default RegisterLoadingModal;
