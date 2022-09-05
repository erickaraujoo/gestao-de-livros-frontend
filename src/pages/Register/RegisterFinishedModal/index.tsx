import { useSelector } from 'react-redux';
import Button from '../../../Components/Button';
import { Container, Modal } from './styles';
import { IListSelectors } from './../../../models/redux/selectors';
import { useState, useEffect } from 'react';
import { useNavigate } from '@reach/router';
import { CONFIG } from '../../../config/constants';
import { useFinishRegister } from '../../../context/Register/RegisterContext';

const RegisterFinishedModal: React.FC = () => {
  const navigate = useNavigate();

  const { success } = useSelector((state: IListSelectors) => state.company);

  const [visible, setVisible] = useState(false);

  const { finishRegister } = useFinishRegister();

  useEffect(() => {
    success && finishRegister && setVisible(true);
  }, [finishRegister, success]);

  const handleRegisterFinished = () => {
    setVisible(false);

    navigate(CONFIG.DEFAULT_ELECTRON_URL);
  };

  return (
    <Container visible={visible}>
      <Modal>
        <h2 id="title">Empresa cadastrada com sucesso!</h2>
        <p id="text">
          A empresa foi cadastrada, mas seus dados ainda serão validados pelo usuário interno do sistema. Assim que for
          validado, encaminharemos uma mensagem para o e-mail que será utilizado para autenticação da empresa.
        </p>

        <Button value={'Continuar'} onClick={() => handleRegisterFinished()} />
      </Modal>
    </Container>
  );
};

export default RegisterFinishedModal;
