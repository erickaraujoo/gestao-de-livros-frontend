import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { writeWorkshopSchema as validationSchema } from '../../../../../utils/validations';
import { Form } from './styles';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  returnCompany,
  returnCurrentDateToISOString,
  returnToUpperCase,
  validateCurrentInputs,
} from '../../../../../utils';
import Input from '../../../../../Components/Input';
import Button from '../../../../../Components/Button';
import { IListSelectors } from '../../../../../models/redux/selectors';
import { useNavigate } from '@reach/router';
import Select from '../../../../../Components/Select';
import { checkConnectionChip } from '../../../../../store/modules/chip/action';
import { IUser } from '../../../../../models/user';
import { IWorkshop } from '../../../../../models/workshop';
import { toast } from 'react-toastify';
import { ICompany } from '../../../../../models/company/index';
import { recordDataOnTheChip } from '../../../../../store/modules/readerRequest/actions';
import { generateSourceAxiosToken } from './../../../../../utils/index';
import { includePressureReducerSerialToCylinders } from '../../../../../utils/formatters/workshop';
import { findAllInmetroSerialTypes } from './../../../../../store/modules/inmetro/serial/type/action';
import { formattedInmetroSerialTypes } from '../../../../../utils/formatters/inmetroSerialType';

interface WorkshopFormProps {
  user: IUser | null;
  sourceAxiosToken: { token: Object; cancel: Object } | null;
  setSourceAxiosToken: Dispatch<SetStateAction<{ token: Object; cancel: Object } | null>>;
}

const WorkshopForm: React.FC<WorkshopFormProps> = ({ user, sourceAxiosToken, setSourceAxiosToken }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const company = returnCompany();

  const { itlRegister }: ICompany = company ? JSON.parse(company) : null;

  const {
    chip: { success: successChip },
    readerRequest: { loading: loadingWorkshop, success: successWorkshop },
    inmetroSerialType: { data: dataInmetroSerialType },
  } = useSelector((state: IListSelectors) => state);

  const [inmetroSerialTypes, setInmetroSerialTypes] = useState<{ title: string; value: string }[] | null>(null);

  const [dataWorkshopForm, setDataWorkshopForm] = useState<IWorkshop | null>(null);

  const [cylindersPagination, setCylindersPagination] = useState(0);

  const [cylinders, setCylinders] = useState([
    {
      cylinderSerial: '',
      inmetroSerial: '',
      inmetroSerialType: '',
    },
  ]);

  const handleCylinderPagination = (val: number) => setCylindersPagination(val);

  const handleCylinders = () => {
    setCylinders([
      ...cylinders,
      {
        cylinderSerial: '',
        inmetroSerial: '',
        inmetroSerialType: '',
      },
    ]);

    handleCylinderPagination(cylinders.length);
  };

  const handleRemoveCylinder = () => {
    cylinders.splice(cylindersPagination, 1);

    cylindersPagination === cylinders.length && handleCylinderPagination(cylindersPagination - 1);

    setCylinders([...cylinders]);
  };

  const handleValueCylinder = (val: string, pagination: number, input: string) => {
    switch (input) {
      case 'cylinderSerial':
      case 'inmetroSerial':
      case 'inmetroSerialType':
        cylinders[pagination][input] = val;
        break;
      default:
        break;
    }

    setCylinders([...cylinders]);
  };

  const handleDataWorkshopForm = (data: any) => setDataWorkshopForm(data);

  useEffect(() => {
    dispatch(findAllInmetroSerialTypes());
  }, [dispatch]);

  useEffect(() => {
    dataInmetroSerialType &&
      dataInmetroSerialType.response &&
      setInmetroSerialTypes([
        { title: 'Selecione...', value: '' },
        ...formattedInmetroSerialTypes(dataInmetroSerialType.response),
      ]);
  }, [dataInmetroSerialType]);

  useEffect(() => {
    if (user && dataWorkshopForm && Object.values(dataWorkshopForm).length && successChip) {
      dispatch(
        recordDataOnTheChip({ data: { workshop: dataWorkshopForm }, userId: user.id, userType: user.userType.name }),
      );

      handleDataWorkshopForm(null);
    }
  }, [dataWorkshopForm, dispatch, successChip, user]);

  useEffect(() => {
    sourceAxiosToken && dispatch(checkConnectionChip({ cancelToken: sourceAxiosToken.token }));
  }, [sourceAxiosToken, dispatch]);

  useEffect(() => {
    successWorkshop && navigate('/home');
  }, [navigate, successWorkshop]);

  const onSubmit = async ({ date, expirationDate, registerItl, licensePlate, pressureReducerSerial }: IWorkshop) => {
    const emptyField =
      !validateCurrentInputs(cylinders[cylinders.length - 1]) || !validateCurrentInputs(cylinders[cylindersPagination]);

    if (emptyField) return toast.error('Por favor, preenha os campos de todos os cilindros');

    const formattedCylinders = await includePressureReducerSerialToCylinders(cylinders, pressureReducerSerial);

    const data = { date, expirationDate, registerItl, licensePlate, cylinders: formattedCylinders };

    generateSourceAxiosToken(setSourceAxiosToken);

    handleDataWorkshopForm(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div id="title">
        <h3>ITL</h3>
      </div>

      <div>
        <label htmlFor="date">Data de Inspeção *</label>
        <Input
          type="date"
          id="date"
          name="date"
          ref={register}
          errors={errors.date}
          defaultValue={returnCurrentDateToISOString()}
        />
      </div>

      <div>
        <label htmlFor="expirationDate">Data de Validade *</label>
        <Input type="date" id="expirationDate" name="expirationDate" ref={register} errors={errors.expirationDate} />
      </div>

      <div>
        <label htmlFor="registerItl">Registro ITL *</label>
        <Input
          type="string"
          id="registerItl"
          name="registerItl"
          ref={register}
          errors={errors.registerItl}
          placeholder={'Digite o registro ITL...'}
          maxLength={11}
          defaultValue={itlRegister}
        />
      </div>

      <div>
        <label htmlFor="licensePlate">Placa do Veículo *</label>
        <Input
          type="string"
          id="licensePlate"
          name="licensePlate"
          ref={register}
          errors={errors.licensePlate}
          placeholder={'Digita a placa...'}
          maxLength={10}
          onChange={({ target }) => (target.value = returnToUpperCase(target.value))}
        />
      </div>

      <div id="cylinder_title">
        <h3>Cilindro</h3>
        <div>
          <button
            type="button"
            onClick={() => handleCylinderPagination(cylindersPagination - 1)}
            disabled={cylindersPagination === 0 ? true : false}
          >
            Anterior
          </button>
          <button
            type="button"
            onClick={() => handleCylinderPagination(cylindersPagination + 1)}
            disabled={
              cylindersPagination === cylinders.length - 1
                ? true
                : !validateCurrentInputs(cylinders[cylindersPagination])
            }
          >
            Próximo
          </button>
          <button
            type="button"
            onClick={() => handleCylinders()}
            disabled={
              !validateCurrentInputs(cylinders[cylinders.length - 1]) ||
              !validateCurrentInputs(cylinders[cylindersPagination])
            }
          >
            Adicionar
          </button>
          <button
            id="btn-remove-cylinder"
            type="button"
            onClick={() => handleRemoveCylinder()}
            disabled={cylinders.length === 1}
          >
            X
          </button>
        </div>
      </div>

      {cylinders.length && (
        <>
          <div>
            <label htmlFor="cylinderSerial">Nº de série do cilindro GNV *</label>
            <Input
              type="string"
              id="cylinderSerial"
              name="cylinderSerial"
              ref={register}
              errors={errors.cylinderSerial}
              placeholder={`Digite o Nº de série do cilindro GNV...`}
              maxLength={20}
              value={cylinders[cylindersPagination].cylinderSerial}
              onChange={({ target }) => handleValueCylinder(target.value, cylindersPagination, 'cylinderSerial')}
            />
          </div>
          <div>
            <label htmlFor="inmetroSerial">Nº de selo do Inmetro *</label>
            <Input
              type="string"
              id="inmetroSerial"
              name="inmetroSerial"
              ref={register}
              errors={errors.inmetroSerial}
              placeholder={`Digite o Nº de selo do Inmetro...`}
              maxLength={20}
              value={cylinders[cylindersPagination].inmetroSerial}
              onChange={({ target }) => handleValueCylinder(target.value, cylindersPagination, 'inmetroSerial')}
            />
          </div>
          <div>
            <label htmlFor="inmetroSerialType">Tipo do selo Inmetro *</label>
            <Select
              ref={register}
              errors={errors.inmetroSerialType}
              name="inmetroSerialType"
              options={inmetroSerialTypes || []}
              value={cylinders[cylindersPagination].inmetroSerialType}
              onChange={({ target }) => handleValueCylinder(target.value, cylindersPagination, 'inmetroSerialType')}
            />
          </div>
        </>
      )}

      <div id="cylinder_pagination">
        <p>
          Cilindro atual: <span>{cylindersPagination + 1}</span> de <span>{cylinders.length}</span>{' '}
        </p>
      </div>

      <div id="title">
        <h3>Dados Adicionais</h3>
      </div>

      <div>
        <label htmlFor="pressureReducerSerial">Nº de série do redutor de pressão de GNV *</label>
        <Input
          type="string"
          id="pressureReducerSerial"
          name="pressureReducerSerial"
          ref={register}
          errors={errors.pressureReducerSerial}
          placeholder={`Digite o Nº de série do redutor de pressão de GNV...`}
          maxLength={20}
        />
      </div>

      <Button type="submit" width={'250px'} value="Gravar dados" loading={loadingWorkshop} />
    </Form>
  );
};

export default WorkshopForm;
