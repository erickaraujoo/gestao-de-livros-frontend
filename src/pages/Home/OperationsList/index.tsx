import React from 'react';
import { Link } from '@reach/router';

import Image from '../../../Components/Image';

import RecordImage from '../../../assets/record.png';
import ReadingImage from '../../../assets/reading.png';
import BlockImage from '../../../assets/block.png';
import ValidateCompanyImage from '../../../assets/validate_company.png';

import { Subtitle, OperationsList } from './styles';
import { USER_TYPES } from '../../../config/constants';

import { ModalBlockChips } from '../../../Components/Modal';
import { useVisible } from '../../../context/Home/OperationList';
import { IUser } from '../../../models/user';

interface OperationsListPageProps {
  user: IUser | null;
}

const OperationsListPage: React.FC<OperationsListPageProps> = ({ user }) => {
  const { visible, setVisible } = useVisible();

  const handleModalVisible = (val: boolean) => setVisible && setVisible(val);

  return (
    <>
      <ModalBlockChips visible={visible ? visible : false} />

      <Subtitle>
        <p>O que deseja fazer?</p>
      </Subtitle>
      {user && (
        <OperationsList>
          {(user.userType.name === USER_TYPES.WORKSHOP || user.userType.name === USER_TYPES.GRAPHIC) && (
            <>
              <Link to="/data/record">
                <Image image={RecordImage} />
                <p>Realizar Gravação</p>
              </Link>
              <Link to="/data/reading">
                <Image image={ReadingImage} />
                <p>Realizar Leitura</p>
              </Link>
            </>
          )}
          {user.userType.name === USER_TYPES.WORKSHOP && (
            <Link to="" onClick={() => handleModalVisible(visible ? false : true)}>
              <Image image={BlockImage} />
              <p>Bloquear Selo</p>
            </Link>
          )}
          {user.userType.name === USER_TYPES.FRENTIST && (
            <Link to="/data/reading">
              <Image image={ReadingImage} />
              <p>Validar dados</p>
            </Link>
          )}
          {user.userType.name === USER_TYPES.ADMIN && (
            <>
              <Link to="/data/logs">
                <Image image={ReadingImage} />
                <p>Verificar registros</p>
              </Link>
              <Link to="/company/non-validated">
                <Image image={ValidateCompanyImage} />
                <p>Validar empresas</p>
              </Link>
            </>
          )}
        </OperationsList>
      )}
    </>
  );
};

export default OperationsListPage;
