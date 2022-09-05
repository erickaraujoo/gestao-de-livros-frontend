import { Link, RouteComponentProps } from '@reach/router';
import { FiArrowLeft } from 'react-icons/fi';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

import { Container, Title, Subtitle, ContainerLogs } from './styles';
import { TableLogs } from '../../Components/Table';

const Logs = (props: RouteComponentProps) => (
  <>
    <Header />
    <Container>
      <Title>
        <Link to="/home">
          <FiArrowLeft size={25} />
        </Link>
        <h1>Registros do Sistema</h1>
      </Title>
      <Subtitle>
        <p>Segue abaixo todos os registros do sistema:</p>
      </Subtitle>

      <ContainerLogs>
        <TableLogs />
      </ContainerLogs>
    </Container>
    <Footer />
  </>
);

export default Logs;
