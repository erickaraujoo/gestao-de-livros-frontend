import { Link, RouteComponentProps } from '@reach/router';

import { Container, Title, Subtitle, ContainerCompanies } from './styles';

import Footer from '../../../Components/Footer';
import Header from '../../../Components/Header';
import { PageableTableWithHeaderAndFooter } from './../../../Components/Table/index';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IListSelectors } from './../../../models/redux/selectors';
import { finalAllCompaniesNonValidated } from '../../../store/modules/company/actions';
import { formattedAllCompaniesNonValidated } from '../../../utils/formatters/company';
import { FiArrowLeft } from 'react-icons/fi';
import ValidateCompanyModal from './ValidateCompanyModal';
import { ICompany } from './../../../models/company/index';
import { instanceOfPageableCompany } from '../../../utils';

const CompanyValidation = (props: RouteComponentProps) => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state: IListSelectors) => state.company);

  const [currentPagination, setCurrentPagination] = useState(0);

  const [companyToBeValidated, setCompanyToBeValidated] = useState<ICompany>();

  const [indexCompanyToBeValidated, setIndexCompanyToBeValidated] = useState('');

  const [visibleValidateCompanyModal, setVisibleValidateCompanyModal] = useState(false);

  const [totalSize] = useState(10);

  const handleCurrentPagination = (value: number) => setCurrentPagination(value);

  const handleIndexCompanyToBeValidated = (value: string) => {
    setIndexCompanyToBeValidated(value);
  };

  const handleVisibleValidateCompanyModal = (value: boolean) => setVisibleValidateCompanyModal(value);

  useEffect(() => {
    dispatch(finalAllCompaniesNonValidated({ page: currentPagination, size: totalSize }));
  }, [currentPagination, dispatch, totalSize]);

  useEffect(() => {
    if (indexCompanyToBeValidated && instanceOfPageableCompany(data.response) && Array.isArray(data.response.content)) {
      setCompanyToBeValidated(data.response.content[parseInt(indexCompanyToBeValidated)]);
      handleVisibleValidateCompanyModal(true);
    }
  }, [data.response, indexCompanyToBeValidated]);

  const header = ['Razão Social', 'CNPJ', 'Nível do Usuário', 'Data de Cadastro'];

  const content = instanceOfPageableCompany(data.response)
    ? formattedAllCompaniesNonValidated(data.response.content)
    : [];

  const footer = {
    totalElements: instanceOfPageableCompany(data.response) ? data.response.totalElements : 0,
    currentPagination: currentPagination,
    totalPages: instanceOfPageableCompany(data.response) ? data.response.totalPages : 1,
    handleCurrentPagination: handleCurrentPagination,
  };

  return (
    <>
      <ValidateCompanyModal
        company={companyToBeValidated || null}
        setIndexCompanyToBeValidated={setIndexCompanyToBeValidated}
        visible={visibleValidateCompanyModal}
        setVisible={setVisibleValidateCompanyModal}
        loading={loading}
        error={error}
      />

      <Header />

      <Container>
        <Title>
          <Link to="/home">
            <FiArrowLeft size={25} />
          </Link>
          <h1>Validar empresas</h1>
        </Title>
        <Subtitle>
          <p>Valide os dados dos clientes pendentes que se cadastraram no sistema.</p>
        </Subtitle>

        <ContainerCompanies>
          <PageableTableWithHeaderAndFooter
            header={header}
            content={content}
            loading={loading}
            footer={footer}
            handleOnClick={handleIndexCompanyToBeValidated}
          />
        </ContainerCompanies>
      </Container>
      <Footer />
    </>
  );
};

export default CompanyValidation;
