import { FiX } from 'react-icons/fi';
import Button from '../../../../Components/Button';
import { Container, Modal, Title, ContainerCompanyData, CompanyData, AddressData, UsersData } from './styles';
import { ICompany } from './../../../../models/company/index';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { returnRequestValueState } from './../../../../utils/index';
import ConfirmValidationCompanyModal from './ConfirmValidationModal';
import { useSelector } from 'react-redux';
import { IListSelectors } from './../../../../models/redux/selectors';
import { SecundaryButton } from './../../../../Components/Button/index';
import RefuseValidationCompanyModal from './RefuseValidationModal';

interface ValidateCompanyModalProps {
  company: ICompany | null;
  setIndexCompanyToBeValidated: Dispatch<SetStateAction<string>>;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;

  loading: boolean;
  error: boolean;
}

const ValidateCompanyModal: React.FC<ValidateCompanyModalProps> = ({
  company,
  setIndexCompanyToBeValidated,
  visible,
  setVisible,
  loading,
  error,
}) => {
  const { success } = useSelector((state: IListSelectors) => state.company);

  const [visibleConfirmValidationCompanyModal, setVisibleConfirmValidationCompanyModal] = useState(false);
  const [visibleRefuseValidationCompanyModal, setVisibleRefuseValidationCompanyModal] = useState(false);

  const handleVisible = (value: boolean) => {
    setVisible(value);
    setIndexCompanyToBeValidated('');
  };

  useEffect(() => {
    if (visible && success) {
      setVisible(false);
      setIndexCompanyToBeValidated('');
    }
  }, [setIndexCompanyToBeValidated, setVisible, success, visible]);

  return (
    <>
      <ConfirmValidationCompanyModal
        company={company || null}
        visible={visibleConfirmValidationCompanyModal}
        setVisible={setVisibleConfirmValidationCompanyModal}
      />

      <RefuseValidationCompanyModal
        company={company || null}
        visible={visibleRefuseValidationCompanyModal}
        setVisible={setVisibleRefuseValidationCompanyModal}
      />

      <Container visible={visible}>
        <Modal>
          <Title>
            <h2>Validação de Empresa</h2>
            <FiX size={35} onClick={() => handleVisible(false)} />
          </Title>

          {company && Object.keys(company).length && (
            <ContainerCompanyData>
              <CompanyData>
                <h3>Dados da Empresa</h3>

                <div>
                  <div>
                    <p>
                      Nome da Empresa: <span>{returnRequestValueState(company.name, loading, error)}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      CNPJ: <span>{returnRequestValueState(company.cnpj, loading, error)}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Registro ITL: <span>{returnRequestValueState(company.itlRegister, loading, error)}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Inscrição Estadual:{' '}
                      <span>{returnRequestValueState(company.stateRegistration, loading, error)}</span>
                    </p>
                  </div>
                </div>
              </CompanyData>
              <AddressData>
                <h3>Dados de Endereço</h3>

                <div>
                  <div>
                    <p>
                      CEP: <span>{returnRequestValueState(company.address.zipCode, loading, error)}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Logradouro: <span>{returnRequestValueState(company.address.street, loading, error)}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Bairro: <span>{returnRequestValueState(company.address.neighborhood, loading, error)}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Cidade: <span>{returnRequestValueState(company.address.city.name, loading, error)}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Estado: <span>{returnRequestValueState(company.address.city.state.name, loading, error)}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Descrição: <span>{returnRequestValueState(company.address.description, loading, error)}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Complemento: <span>{returnRequestValueState(company.address.complement, loading, error)}</span>
                    </p>
                  </div>
                </div>
              </AddressData>
              <UsersData>
                <h3>Usuários da Empresa</h3>

                <div>
                  {company.users instanceof Array &&
                    company.users.map(({ name, username }, index) => (
                      <div key={index}>
                        <p>
                          Responsável: <span>{name}</span>
                        </p>
                        <p>
                          E-mail: <span>{username}</span>
                        </p>
                      </div>
                    ))}
                </div>
              </UsersData>
            </ContainerCompanyData>
          )}

          <div id="container-buttons">
            <Button
              value={'Validar empresa'}
              loading={company && Object.keys(company).length ? false : true}
              onClick={() => setVisibleConfirmValidationCompanyModal(true)}
            />

            <SecundaryButton
              value={'Recusar empresa'}
              loading={company && Object.keys(company).length ? false : true}
              onClick={() => setVisibleRefuseValidationCompanyModal(true)}
            />
          </div>
        </Modal>
      </Container>
    </>
  );
};

export default ValidateCompanyModal;
