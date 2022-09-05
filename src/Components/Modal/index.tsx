import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useVisible } from '../../context/Home/OperationList';
import { IListSelectors } from '../../models/redux/selectors';
import { blockChips } from '../../store/modules/chip/action';
import { returnSha256, returnToUpperCase, returnUser } from '../../utils';
import { blockChipsSchema as validationSchema } from '../../utils/validations';
import { ClipLoader } from 'react-spinners';

import Button from '../Button';
import { SecundaryButton } from '../Button';
import Input from '../Input';
import { Container, Modal, Form, CheckConnectionChip } from './styles';

import CheckConnectionChipImage from '../../assets/verify_card.gif';
import { IUser } from '../../models/user';
import { IBlockChip } from '../../models/chip';
import { restartSystem } from '../../store/modules/system/action';
import { toast } from 'react-toastify';
import { API_ERROR_TYPES } from '../../config/constants';
import { useNavigate } from '@reach/router';

interface ModalProps {
  visible: boolean;
  handleVisible?: Dispatch<SetStateAction<boolean>>;
  title?: string;
  text?: string | null;
  errorType?: string | null;

  textCenter?: boolean;
  titleColor?: string;
  bgColorPrimaryButton?: string;

  sourceAxiosToken?: any;
}

export const ModalWarning: React.FC<ModalProps> = ({ ...rest }) => {
  const { title, text, visible, handleVisible, errorType } = rest;

  const navigate = useNavigate();

  return (
    <Container {...rest}>
      <Modal>
        <h2 id="title">{title}</h2>
        <p id="text">{text}</p>

        <div id="buttons-flex">
          <Button
            type="button"
            value="Fechar"
            onClick={() => {
              handleVisible && handleVisible(!visible);
              errorType &&
                (errorType === API_ERROR_TYPES.BLOCKED_SEAL || errorType === API_ERROR_TYPES.DATA_ALREADY_REGISTERED) &&
                navigate('/home');
            }}
          />
        </div>
      </Modal>
    </Container>
  );
};

export const ModalBlockChips: React.FC<ModalProps> = ({ ...rest }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const dispath = useDispatch();

  const stringifyUser = returnUser();

  const user: IUser = stringifyUser ? JSON.parse(stringifyUser) : null;

  const { loading: loadingChip, success: successChip } = useSelector((state: IListSelectors) => state.chip);

  const { setVisible } = useVisible();

  const handleModalVisible = (val: boolean) => setVisible && setVisible(val);

  useEffect(() => {
    successChip && setVisible && setVisible(false);
  }, [setVisible, successChip]);

  const onSubmit = async ({ licensePlate, password }: IBlockChip) => {
    const cryptPassword = await returnSha256(password);

    user && dispath(blockChips({ data: { licensePlate, password: cryptPassword }, userId: user.id }));
  };

  return (
    <Container {...rest}>
      <Modal>
        <h2 id="title">Bloqueio de Selo</h2>
        <p id="text">
          Para bloquear o selo atual de um veículo, é necessário preencher a placa do veículo e a senha do usuário que
          está realizando esta operação.
        </p>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <div id="div-input">
            <label htmlFor="licensePlate">Placa do Veículo *</label>
            <Input
              maxLength={10}
              type="text"
              placeholder="Digite a placa do veículo..."
              id="licensePlate"
              name="licensePlate"
              ref={register}
              errors={errors.licensePlate}
              onChange={({ target }) => (target.value = returnToUpperCase(target.value))}
            />
          </div>

          <div id="div-input">
            <label htmlFor="password">Senha do usuário *</label>
            <Input
              type="password"
              placeholder="Digite sua senha de usuário..."
              id="password"
              name="password"
              ref={register}
              errors={errors.password}
            />
          </div>

          <div id="buttons-flex">
            <Button type="submit" value="Bloquear Selo" loading={loadingChip} />
            <SecundaryButton
              type="button"
              value="Cancelar"
              loading={loadingChip}
              onClick={() => handleModalVisible(false)}
            />
          </div>
        </Form>
      </Modal>
    </Container>
  );
};

export const ModalCheckConnectionChip: React.FC<ModalProps> = ({ ...rest }) => {
  const { visible, handleVisible, sourceAxiosToken } = rest;

  return (
    <Container {...rest}>
      <Modal id="checkConnectionChip">
        <CheckConnectionChip>
          <div>
            <h2 id="title">Aproxime o chip no leitor...</h2>
            <ClipLoader size={30} />
          </div>
          <img src={CheckConnectionChipImage} alt="" />

          <div id="buttons-flex">
            <SecundaryButton
              type="button"
              value="Cancelar"
              onClick={() => {
                handleVisible && handleVisible(!visible);
                sourceAxiosToken && sourceAxiosToken?.cancel();
              }}
            />
          </div>
        </CheckConnectionChip>
      </Modal>
    </Container>
  );
};

export const ModalReaderListFailed: React.FC<ModalProps> = ({ ...rest }) => {
  const dispatch = useDispatch();

  const { visible, handleVisible } = rest;

  const {
    system: { loading: systemLoading, success: systemSuccess, error: systemError },
  } = useSelector((state: IListSelectors) => state);

  const [loadingSystemRestart, setLoadingSystemRestart] = useState<boolean>(false);

  const handleSystemRestart = () => dispatch(restartSystem());

  useEffect(() => {
    systemLoading && setLoadingSystemRestart(true);
  }, [systemLoading]);

  useEffect(() => {
    systemSuccess && toast.info('Reiniciando sistema...');
  }, [systemSuccess]);

  useEffect(() => {
    if (systemError) {
      setLoadingSystemRestart(false);
      toast.error('Erro ao reiniciar sistema! Contate o suporte');
    }
  }, [systemError]);

  return (
    <Container {...rest}>
      <Modal>
        <h2 id="title">Nenhum leitor conectado</h2>
        <p id="text">
          Não foi possivel se conectar com o leitor, verifique se o leitor está conectado e tente novamente. Caso o
          leitor esteja conectado, por favor reinicie o sistema clicando no botão abaixo.
        </p>

        <div id="buttons-flex">
          <Button
            type="button"
            value="Reiniciar Sistema"
            onClick={() => handleSystemRestart()}
            loading={loadingSystemRestart}
          />
          <SecundaryButton
            type="button"
            value="Voltar"
            onClick={() => handleVisible && handleVisible(!visible)}
            loading={loadingSystemRestart}
          />
        </div>
      </Modal>
    </Container>
  );
};
