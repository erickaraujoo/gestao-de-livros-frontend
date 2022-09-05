import Button, { SecundaryButton } from '../../../../Components/Button';
import { Container, Modal } from './styles';
import { Dispatch, SetStateAction } from 'react';

interface ModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const ModalWorkshopAlreadyRegistered: React.FC<ModalProps> = ({ ...rest }) => {
  const handleOpenBrowser = (link: string) => window.open(link, '_blank', 'top=500,left=200,nodeIntegration=no');

  const { visible, setVisible } = rest;

  return (
    <Container visible={visible}>
      <Modal>
        <h2 id="title">Observação Importante</h2>
        <p id="text">
          O cadastro da ITL deve ser feito pelo sistema E-commerce da Empresa. Selecione em ir para o sistema E-commerce
          agora mesmo ou cancele e tente realizar a autenticação na página inicial.
        </p>

        <div id="buttons-flex">
          <Button value={'Ir para E-commerce'} onClick={() => handleOpenBrowser('https://cliente.primi.com.br')} />
          <SecundaryButton value={'Cancelar'} onClick={() => setVisible(false)} />
        </div>
      </Modal>
    </Container>
  );
};

export default ModalWorkshopAlreadyRegistered;
