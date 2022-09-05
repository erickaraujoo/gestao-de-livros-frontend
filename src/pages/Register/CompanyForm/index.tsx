import { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { RouteComponentProps } from '@reach/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import { PATTERN_CNPJ, PATTERN_ZIP_CODE, USER_TYPES } from './../../../config/constants';
import { fetchViacepAddressByZipCode } from '../../../store/modules/services/viacep/actions';
import { IListSelectors } from './../../../models/redux/selectors';
import { fetchStates } from '../../../store/modules/address/state/actions';

import { registerCompanySchema as validationSchema } from '../../../utils/validations';
import { returnFormattedCnpj, returnFormattedZipCode, returnNameUserType, returnUnformattedCnpj } from '../../../utils';

import { CompanyForm, Container, ContainerFlexInputs, FlexInput } from './styles';
import { Title, Subtitle } from '../styles';

import Input from '../../../Components/Input';
import Button from '../../../Components/Button';
import Select from '../../../Components/Select';
import { formattedStates } from '../../../utils/formatters/address';
import { fetchCitiesByState } from './../../../store/modules/address/city/actions';
import { formattedCities } from './../../../utils/formatters/address';
import {
  useSelectedUserType,
  useCompany,
  useRegisterLoginStep,
  useSteps,
} from './../../../context/Register/RegisterContext';
import { ICreateCompany } from './../../../models/company/index';
import { removeBlankAttributes } from './../../../utils/index';
import { validateCompanyCnpjToRegister } from '../../../store/modules/company/actions';
import { ErrorLogin } from './../../../Components/Error/index';

const RegisterCompanyForm = (props: RouteComponentProps) => {
  const dispatch = useDispatch();

  const { selectedUserType, setSelectedUserType } = useSelectedUserType();
  const { steps, setSteps } = useSteps();

  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    context: { isItl: selectedUserType?.name && selectedUserType.name === USER_TYPES.WORKSHOP },
  });

  const { setCompany } = useCompany();
  const { registerLoginStep, setRegisterLoginStep } = useRegisterLoginStep();

  const { loading: fetchingCompany, data: hasCompany } = useSelector((state: IListSelectors) => state.company);
  const { data: viacepAddress } = useSelector((state: IListSelectors) => state.viacepAddress);
  const { data: states } = useSelector((state: IListSelectors) => state.state);
  const { data: cities } = useSelector((state: IListSelectors) => state.city);

  const [cnpj, setCnpj] = useState('');

  const [currentState, setCurrentState] = useState('');
  const [currentCity, setCurrentCity] = useState('');

  useEffect(() => {
    dispatch(fetchStates());
  }, [dispatch]);

  useEffect(() => {
    const form = getValues();

    Object.values(viacepAddress).length &&
      reset({
        ...form,
        ...viacepAddress,
        state: currentState,
        city: currentCity,
      });
  }, [currentCity, currentState, getValues, reset, viacepAddress]);

  useEffect(() => {
    if (states && states.response && viacepAddress) {
      const viacepState = states.response.find(({ uf }) => viacepAddress.uf === uf);

      if (viacepState && viacepState.id.toString() !== currentState) {
        setCurrentState(viacepState.id.toString());

        dispatch(fetchCitiesByState({ stateId: viacepState.id }));
      }
    }
  }, [currentState, dispatch, states, viacepAddress]);

  useEffect(() => {
    if (cities && cities.response && viacepAddress) {
      const viacepCity = cities.response.find(({ name }) => viacepAddress.city === name);

      viacepCity && setCurrentCity(viacepCity.id);
    }
  }, [cities, viacepAddress]);

  const handlePrevStep = () => {
    setSelectedUserType && setSelectedUserType({});

    if (steps && setSteps) {
      steps[0]['current'] = true;
      steps[0]['finished'] = false;
      steps[1]['current'] = false;

      setSteps([...steps]);
    }
  };

  const handleFormatZipCodeAndSearchViacepAddress = (value: string) => {
    const zipCode: string = returnFormattedZipCode(value);

    if (zipCode.match(PATTERN_ZIP_CODE)) {
      dispatch(fetchViacepAddressByZipCode({ zipCode }));
    }

    return zipCode;
  };

  const handleFormatCnpjAndValidateToRegister = (value: string) => {
    const cnpj: string = returnFormattedCnpj(value);

    setCnpj(cnpj);

    if (cnpj.match(PATTERN_CNPJ)) {
      const unformattedCnpj = returnUnformattedCnpj(cnpj);

      unformattedCnpj && dispatch(validateCompanyCnpjToRegister(unformattedCnpj));
    }

    return cnpj;
  };

  const handleChangeState = (stateId: number) => {
    setCurrentState(stateId.toString());

    dispatch(fetchCitiesByState({ stateId }));
  };

  const onSubmit = (data: ICreateCompany) => {
    if (Object.values(hasCompany.errors).length) return;

    const form = getValues();

    reset({ ...form });

    const formattedData = removeBlankAttributes(data);

    setCompany && setCompany(formattedData);

    setRegisterLoginStep && setRegisterLoginStep(true);

    if (steps && setSteps) {
      steps[1]['current'] = false;
      steps[1]['finished'] = true;
      steps[2]['current'] = true;

      setSteps([...steps]);
    }
  };

  return selectedUserType && selectedUserType.id && selectedUserType.name && !registerLoginStep ? (
    <Container>
      <Title>
        <div id="prev-step" onClick={() => handlePrevStep()}>
          <FiArrowLeft size={25} />
        </div>
        <h1>Cadastro da Empresa</h1>
      </Title>
      <Subtitle>
        {selectedUserType.name && (
          <p>
            Faça seu cadastro como {returnNameUserType(selectedUserType.name)} e autentique-se assim que seus dados
            forem validados.
          </p>
        )}
      </Subtitle>

      <CompanyForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="cnpj">CNPJ *</label>
          <Input
            type="text"
            id="cnpj"
            name="cnpj"
            ref={register}
            placeholder="Digite o CNPJ"
            errors={errors.cnpj}
            onChange={({ target }) => (target.value = handleFormatCnpjAndValidateToRegister(target.value))}
            maxLength={18}
          />
          {cnpj.match(PATTERN_CNPJ) && !fetchingCompany && !(hasCompany.errors instanceof Array) && (
            <ErrorLogin errors={{ message: hasCompany.errors.cnpj }} />
          )}
        </div>
        <div>
          <label htmlFor="name">Razão Social *</label>
          <Input
            type="text"
            id="name"
            name="name"
            ref={register}
            placeholder="Digite a Razão Social"
            errors={errors.name}
            maxLength={100}
          />
        </div>

        {selectedUserType.name === 'workshop' && (
          <div>
            <label htmlFor="itlRegister">Registro ITL</label>
            <Input
              type="text"
              id="itlRegister"
              name="itlRegister"
              ref={register}
              placeholder="Digite o Nome Fantasia"
              errors={errors.itlRegister}
              maxLength={11}
            />
          </div>
        )}

        <hr />

        <ContainerFlexInputs>
          <FlexInput>
            <label htmlFor="zipCode">CEP *</label>
            <Input
              type="text"
              id="zipCode"
              name="zipCode"
              ref={register}
              placeholder="Digite o CEP"
              errors={errors.zipCode}
              onChange={({ target }) => (target.value = handleFormatZipCodeAndSearchViacepAddress(target.value))}
              maxLength={9}
            />
          </FlexInput>
          <FlexInput>
            <label htmlFor="street">Logradouro *</label>
            <Input
              type="text"
              id="street"
              name="street"
              ref={register}
              placeholder="Digite o Logradouro"
              errors={errors.street}
            />
          </FlexInput>
        </ContainerFlexInputs>

        <ContainerFlexInputs>
          <FlexInput>
            <label htmlFor="state">Estado *</label>
            <Select
              id="state"
              name="state"
              options={formattedStates(states.response)}
              ref={register}
              errors={errors.state}
              onChange={({ target }) => target.value && handleChangeState(Number.parseInt(target.value))}
              style={viacepAddress.uf && currentState ? { pointerEvents: 'none' } : {}}
            />
          </FlexInput>
          <FlexInput>
            <label htmlFor="city">Cidade *</label>
            <Select
              id="city"
              name="city"
              options={formattedCities(cities.response)}
              ref={register}
              errors={errors.city}
              style={viacepAddress.city && currentCity ? { pointerEvents: 'none' } : {}}
            />
          </FlexInput>
        </ContainerFlexInputs>

        <ContainerFlexInputs>
          <FlexInput>
            <label htmlFor="neighborhood">Bairro *</label>
            <Input
              type="text"
              id="neighborhood"
              name="neighborhood"
              ref={register}
              placeholder="Digite o Bairro"
              errors={errors.neighborhood}
            />
          </FlexInput>
          <FlexInput>
            <label htmlFor="number">Número *</label>
            <Input
              type="text"
              id="number"
              name="number"
              ref={register}
              placeholder="Digite o Número"
              errors={errors.number}
            />
          </FlexInput>
        </ContainerFlexInputs>

        <div>
          <label htmlFor="complement">Complemento (Opcional)</label>
          <Input
            type="text"
            id="complement"
            name="complement"
            ref={register}
            placeholder="Digite o Complemento (Opcional)"
            errors={errors.complement}
          />
        </div>

        <Button type="submit" value="Próxima Etapa" />
      </CompanyForm>
    </Container>
  ) : null;
};

export default RegisterCompanyForm;
