import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../../../Components/Input';
import Button from '../../../../../Components/Button';
import { useForm } from 'react-hook-form';
import { writeGraphicSchema as validationSchema } from '../../../../../utils/validations';

import { Form } from './styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { IListSelectors } from '../../../../../models/redux/selectors';
import { useNavigate } from '@reach/router';
import { checkConnectionChip } from '../../../../../store/modules/chip/action';
import { IUser } from '../../../../../models/user';
import { IGraphic } from '../../../../../models/graphic';
import { recordDataOnTheChip } from '../../../../../store/modules/readerRequest/actions';
import { generateSourceAxiosToken, returnToUpperCase } from './../../../../../utils/index';

interface GraphicFormProps {
  user: IUser | null;
  sourceAxiosToken: { token: Object; cancel: Object } | null;
  setSourceAxiosToken: Dispatch<SetStateAction<{ token: Object; cancel: Object } | null>>;
}

const GraphicForm: React.FC<GraphicFormProps> = ({ user, sourceAxiosToken, setSourceAxiosToken }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dataGraphicForm, setDataGraphicForm] = useState<IGraphic | null>(null);

  const { success: successChip } = useSelector((state: IListSelectors) => state.chip);
  const { success: successGraphic, loading: loadingGraphic } = useSelector(
    (state: IListSelectors) => state.readerRequest,
  );

  const handleDataGraphicForm = (data: any) => setDataGraphicForm(data);

  const changeLeadingZeroFromTextToTetter = (text: string, letter: string) => {
    if (text.length == 8 && text.startsWith('0')) return returnToUpperCase(letter + text.substring(1, text.length));

    return returnToUpperCase(text);
  };

  useEffect(() => {
    if (successGraphic) {
      reset();
      document.getElementById('serial')?.focus();
    }
  }, [navigate, successGraphic]);

  useEffect(() => {
    if (user && dataGraphicForm && Object.values(dataGraphicForm).length && successChip) {
      dispatch(
        recordDataOnTheChip({ data: { graphic: dataGraphicForm }, userId: user.id, userType: user.userType.name }),
      );

      handleDataGraphicForm(null);
    }
  }, [dataGraphicForm, dispatch, successChip, user]);

  useEffect(() => {
    sourceAxiosToken && dispatch(checkConnectionChip({ cancelToken: sourceAxiosToken.token }));
  }, [sourceAxiosToken, dispatch]);

  const onSubmit = (data: IGraphic) => {
    handleDataGraphicForm(data);

    generateSourceAxiosToken(setSourceAxiosToken);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="serial">Nº do selo de Inspeção *</label>
          <Input
            type="text"
            id="serial"
            name="serial"
            placeholder="Digite um número..."
            ref={register}
            errors={errors.serial}
            maxLength={8}
            onChange={({ target }) => (target.value = changeLeadingZeroFromTextToTetter(target.value, 'A'))}
            autoFocus={true}
          />
        </div>

        <Button type="submit" width={'250px'} value="Gravar dados" loading={loadingGraphic} />
      </Form>
    </>
  );
};

export default GraphicForm;
