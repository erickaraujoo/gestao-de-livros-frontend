import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

import {
  Container,
  Title,
  Subtitle,
  ContainerCompanyData,
  CompanyData,
  AddressData,
  UsersData,
  UpdateDataWithEcommerce,
} from './styles';
import {
  instanceOfICompany,
  returnCompany,
  returnRequestValueState,
  returnUser,
  setCompanyToLocalStorage,
} from './../../utils/index';
import { Link, RouteComponentProps } from '@reach/router';
import { FiArrowLeft } from 'react-icons/fi';
import { ICompany } from './../../models/company/index';

import Button from '../../Components/Button';
import { IUser } from './../../models/user/index';
import { USER_TYPES } from '../../config/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanyById, updateCompanyWithEcommerce } from './../../store/modules/company/actions';
import { IListSelectors } from './../../models/redux/selectors';
import { useEffect, useState } from 'react';

const User = (props: RouteComponentProps) => {
  const dispatch = useDispatch();

  const {
    data: dataCompany,
    loading: loadingCompany,
    success: successCompany,
  } = useSelector((state: IListSelectors) => state.company);

  const stringifyUser = returnUser();
  const stringifyCompany = returnCompany();

  const user: IUser = stringifyUser ? JSON.parse(stringifyUser) : null;
  const company: ICompany = stringifyCompany ? JSON.parse(stringifyCompany) : null;

  const [currentCompanyData, setCurrentCompanyData] = useState<ICompany | null>(company);

  const handleUpdateDataWithEcommerce = (cnpj: string) => {
    const formattedCnpj = cnpj.replace(/[^\d]/g, '');

    company &&
      user &&
      dispatch(updateCompanyWithEcommerce({ cnpj: formattedCnpj, company: { id: company.id }, userId: user.id }));
  };

  useEffect(() => {
    successCompany &&
      currentCompanyData &&
      !Object.keys(dataCompany.response).length &&
      dispatch(fetchCompanyById({ id: currentCompanyData.id }));
  }, [currentCompanyData, dataCompany.response, dispatch, successCompany]);

  useEffect(() => {
    if (
      successCompany &&
      dataCompany &&
      instanceOfICompany(dataCompany.response) &&
      Object.keys(dataCompany.response).length
    ) {
      setCurrentCompanyData(dataCompany.response);

      setCompanyToLocalStorage(dataCompany.response);
    }
  }, [dataCompany, successCompany]);

  return (
    <>
      <Header />
      <Container>
        <Title>
          <Link to={user && user.userType.name === USER_TYPES.INSPECTOR ? '/data/reading' : '/home'}>
            <FiArrowLeft size={25} />
          </Link>
          <h1>Dados do usuário</h1>
        </Title>
        <Subtitle>
          <p>Consulte ou edite os dados do seu usuário</p>
        </Subtitle>

        <ContainerCompanyData>
          <CompanyData>
            <h3>Dados da Empresa</h3>

            <div>
              <div>
                <p>
                  Nome da Empresa:{' '}
                  <span>{returnRequestValueState(currentCompanyData && currentCompanyData.name, false, false)}</span>
                </p>
              </div>
              <div>
                <p>
                  CNPJ:{' '}
                  <span>{returnRequestValueState(currentCompanyData && currentCompanyData.cnpj, false, false)}</span>
                </p>
              </div>
              <div>
                <p>
                  Registro ITL:{' '}
                  <span>
                    {returnRequestValueState(currentCompanyData && currentCompanyData.itlRegister, false, false)}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  Inscrição Estadual:{' '}
                  <span>
                    {returnRequestValueState(currentCompanyData && currentCompanyData.stateRegistration, false, false)}
                  </span>
                </p>
              </div>
            </div>
          </CompanyData>
          <AddressData>
            <h3>Dados de Endereço</h3>

            <div>
              <div>
                <p>
                  CEP:{' '}
                  <span>
                    {returnRequestValueState(currentCompanyData && currentCompanyData.address.zipCode, false, false)}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  Logradouro:{' '}
                  <span>
                    {returnRequestValueState(currentCompanyData && currentCompanyData.address.street, false, false)}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  Bairro:{' '}
                  <span>
                    {returnRequestValueState(
                      currentCompanyData && currentCompanyData.address.neighborhood,
                      false,
                      false,
                    )}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  Cidade:{' '}
                  <span>
                    {returnRequestValueState(currentCompanyData && currentCompanyData.address.city.name, false, false)}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  Estado:{' '}
                  <span>
                    {returnRequestValueState(
                      currentCompanyData && currentCompanyData.address.city.state.name,
                      false,
                      false,
                    )}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  Descrição:{' '}
                  <span>
                    {returnRequestValueState(
                      currentCompanyData && currentCompanyData.address.description,
                      false,
                      false,
                    )}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  Complemento:{' '}
                  <span>
                    {returnRequestValueState(currentCompanyData && currentCompanyData.address.complement, false, false)}
                  </span>
                </p>
              </div>
            </div>
          </AddressData>
          <UsersData>
            <h3>Usuários da Empresa</h3>

            <div>
              {currentCompanyData &&
                currentCompanyData.users.map(({ name, username }, index) => (
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

        {user && user.userType.name === USER_TYPES.WORKSHOP && (
          <UpdateDataWithEcommerce>
            <Button
              value={'Atualizar dados com E-commerce'}
              loading={loadingCompany}
              onClick={() => currentCompanyData && handleUpdateDataWithEcommerce(currentCompanyData.cnpj)}
            />
          </UpdateDataWithEcommerce>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default User;
