import Button, { SecundaryButton } from '../../../../../Components/Button';
import { Container, Modal } from './styles';
import { ICompany } from '../../../../../models/company/index';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { returnUser } from '../../../../../utils';
import { IUser } from '../../../../../models/user';
import { useDispatch, useSelector } from 'react-redux';
import { finalAllCompaniesNonValidated, refuseCompany } from '../../../../../store/modules/company/actions';
import { IListSelectors } from '../../../../../models/redux/selectors';
import { toast } from 'react-toastify';

interface RefuseValidationCompanyModalProps {
  company: ICompany | null;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const RefuseValidationCompanyModal: React.FC<RefuseValidationCompanyModalProps> = ({
  company,
  visible,
  setVisible,
}) => {
  const dispatch = useDispatch();

  const { loading, success } = useSelector((state: IListSelectors) => state.company);

  const handleRefuseCompany = () => {
    const stringifyUser = returnUser();

    const user: IUser = stringifyUser ? JSON.parse(stringifyUser) : null;

    const companyId = company && Object.keys(company).length && company.id;

    user && companyId && dispatch(refuseCompany({ id: companyId }));
  };

  useEffect(() => {
    if (visible && success) {
      setVisible(false);
      toast.success('Empresa recusada com sucesso');
      dispatch(finalAllCompaniesNonValidated({ page: 0, size: 10 }));
    }
  }, [dispatch, setVisible, success, visible]);

  return (
    <Container visible={visible}>
      <Modal>
        <h2 id="title">Recusar empresa</h2>
        <p id="text">
          Você está prestes a recusar a empresa {company && company.name}. Tem certeza que deseja continuar?
        </p>

        <div id="buttons-flex">
          <Button
            value={'Confirmar'}
            onClick={() => handleRefuseCompany()}
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

export default RefuseValidationCompanyModal;
