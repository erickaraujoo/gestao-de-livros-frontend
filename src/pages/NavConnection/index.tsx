import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { CONFIG } from '../../config/constants';
import { Container, Modal } from './styles';
import { ClipLoader } from 'react-spinners';

const NavigatorConnection: React.FC = () => {
  const [isConnection, setNetwork] = useState<boolean>(navigator.onLine);

  const [successfullRequest, setSuccessfullRequest] = useState<boolean>(false);

  const handleNetwork = (value: boolean) => setNetwork(value);

  useEffect(() => {
    setInterval(() => navigator.onLine !== isConnection && handleNetwork(navigator.onLine), 1000);
  }, [isConnection]);

  useEffect(() => {
    if (isConnection) {
      if (!successfullRequest) {
        toast.success('Conexão com internet estabelecida.');

        let quantity = 0;

        const timer = setInterval(() => {
          quantity++;

          fetch(`${CONFIG.BASE_API_URL}/check/connection`).then((res) => {
            if (res.status === 200) {
              setSuccessfullRequest(true);

              toast.success('Conexão com servidor estabelecida com sucesso!');

              clearInterval(timer);
            }
          });

          if (quantity % 20 === 0)
            toast.error('Falha ao estabelecer conexão com servidor... Caso o erro persista, reinicie a aplicação');
          else if (quantity % 10 === 0) toast.error('Falha ao estabelecer conexão com servidor, tentando novamente...');
        }, 2500);
      }
    } else {
      !successfullRequest && toast.warn('Sem conexão com internet.');
      setSuccessfullRequest(true);
    }
  }, [isConnection, successfullRequest]);

  return (
    <Container visible={successfullRequest}>
      <Modal>
        <p>Validando conexão...</p>
        <ClipLoader size={30} />
      </Modal>
    </Container>
  );
};

export default NavigatorConnection;
