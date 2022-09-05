import Button, { SecundaryButton } from '../../../../../Components/Button';
import { Container, Modal } from './styles';
import { ICompany } from './../../../../../models/company/index';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { returnUser } from '../../../../../utils';
import { IUser } from '../../../../../models/user';
import { useDispatch, useSelector } from 'react-redux';
import { finalAllCompaniesNonValidated, validateCompany } from '../../../../../store/modules/company/actions';
import { IListSelectors } from './../../../../../models/redux/selectors';
import { toast } from 'react-toastify';

interface ConfirmValidationCompanyModalProps {
  company: ICompany | null;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const ConfirmValidationCompanyModal: React.FC<ConfirmValidationCompanyModalProps> = ({
  company,
  visible,
  setVisible,
}) => {
  const dispatch = useDispatch();

  const { loading, success } = useSelector((state: IListSelectors) => state.company);

  const handleValidateCompany = () => {
    const stringifyUser = returnUser();

    const user: IUser = stringifyUser ? JSON.parse(stringifyUser) : null;

    const companyId = company && Object.keys(company).length && company.id;

    user && companyId && dispatch(validateCompany({ internalUser: { id: user.id }, company: { id: companyId } }));
  };

  useEffect(() => {
    if (visible && success) {
      setVisible(false);
      toast.success('Empresa validada com sucesso');
      dispatch(finalAllCompaniesNonValidated({ page: 0, size: 10 }));
    }
  }, [dispatch, setVisible, success, visible]);

  return (
    <Container visible={visible}>
      <Modal>
        <h2 id="title">Confirmar validação</h2>
        <p id="text">
          Você está prestes a validar os dados da empresa {company && company.name}, após isso, a empresa poderá acessar
          o sistema. Tem certeza que deseja continuar?
        </p>

        <div id="buttons-flex">
          <Button
            value={'Confirmar Validação'}
            onClick={() => handleValidateCompany()}
            loading={visible && loading ? true : false}
          />
          <SecundaryButton
            value={'Cancelar'}
            onClick={() => setVisible(false)}
            loading={visible && loading ? true : false}
          />
        </div>
      </Modal>
    </Container>
  );
};

export default ConfirmValidationCompanyModal;
