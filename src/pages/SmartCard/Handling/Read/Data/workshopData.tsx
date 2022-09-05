import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../../Components/Button';
import { IGraphic } from '../../../../../models/graphic';
import { IListSelectors } from '../../../../../models/redux/selectors';
import { IUser } from '../../../../../models/user';
import { IWorkshop } from '../../../../../models/workshop';
import { checkConnectionChip } from '../../../../../store/modules/chip/action';
import { readDataFromTheChip } from '../../../../../store/modules/readerRequest/actions';
import {
  generateSourceAxiosToken,
  returnFormmatedDate,
  returnParseJson,
  returnRequestValueState,
} from '../../../../../utils';
import { Container } from './styles';
import { findAllInmetroSerialTypes } from './../../../../../store/modules/inmetro/serial/type/action';
import { formattedInmetroSerialTypes } from './../../../../../utils/formatters/inmetroSerialType';

interface WorkshopDataContainerProps {
  user: IUser | null;
  sourceAxiosToken: { token: Object; cancel: Object } | null;
  setSourceAxiosToken: Dispatch<SetStateAction<{ token: Object; cancel: Object } | null>>;
}

const WorkshopDataContainer: React.FC<WorkshopDataContainerProps> = ({
  user,
  sourceAxiosToken,
  setSourceAxiosToken,
}) => {
  const dispatch = useDispatch();

  const { success: successChip } = useSelector((state: IListSelectors) => state.chip);

  const {
    readerRequest: {
      data: dataReaderRequest,
      loading: loadingReaderRequest,
      error: errorReaderRequest,
      success: successReaderRequest,
    },
    inmetroSerialType: {
      loading: loadingInmetroSerialType,
      data: dataInmetroSerialType,
      error: errorInmetroSerialType,
    },
  } = useSelector((state: IListSelectors) => state);

  const [inmetroSerialType, setInmetroSerialTypes] = useState<{ title: string; value: string }[] | null>(null);
  const [graphic, setGraphic] = useState<IGraphic | null>(null);
  const [workshop, setWorkshop] = useState<IWorkshop | null>(null);
  const [cylindersPagination, setCylindersPagination] = useState(0);

  const handleDispatchConnectionChip = () => generateSourceAxiosToken(setSourceAxiosToken);

  const handleGraphic = (value: IGraphic | null) => setGraphic(value);
  const handleWorkshop = (value: IWorkshop | null) => setWorkshop(value);

  const handleCylinderPagination = (value: number) => setCylindersPagination(value);

  useEffect(() => {
    dispatch(findAllInmetroSerialTypes());
  }, [dispatch]);

  useEffect(() => {
    dataInmetroSerialType.response &&
      setInmetroSerialTypes(formattedInmetroSerialTypes(dataInmetroSerialType.response));
  }, [dataInmetroSerialType.response]);

  useEffect(() => {
    generateSourceAxiosToken(setSourceAxiosToken);
  }, [setSourceAxiosToken]);

  useEffect(() => {
    sourceAxiosToken &&
      !loadingInmetroSerialType &&
      !errorInmetroSerialType &&
      dispatch(checkConnectionChip({ cancelToken: sourceAxiosToken.token }));
  }, [dispatch, sourceAxiosToken, loadingInmetroSerialType, errorInmetroSerialType]);

  useEffect(() => {
    if (successChip && user) {
      dispatch(readDataFromTheChip({ userId: user.id }));

      handleGraphic(null);
      handleWorkshop(null);
    }
  }, [dispatch, successChip, user]);

  useEffect(() => {
    if (successReaderRequest && Object.keys(dataReaderRequest.response).length) {
      dataReaderRequest.response.graphic &&
        handleGraphic(returnParseJson(dataReaderRequest.response.graphic.toString()));
      dataReaderRequest.response.workshop &&
        handleWorkshop(returnParseJson(dataReaderRequest.response.workshop.toString()));
    }
  }, [dataReaderRequest.response, successReaderRequest]);

  return (
    <Container>
      <h3>ITL</h3>
      <div id="itl_content">
        <div>
          <p>
            <span>Nº do selo de Inspeção:</span>{' '}
            {returnRequestValueState(graphic && graphic.serial, loadingReaderRequest, errorReaderRequest)}
          </p>
        </div>
        <div>
          <p>
            <span>Data de Inspeção:</span>{' '}
            {returnRequestValueState(
              returnFormmatedDate(workshop && workshop.date),
              loadingReaderRequest,
              errorReaderRequest,
            )}
          </p>
        </div>
        <div>
          <p>
            <span>Data de Validade:</span>{' '}
            {returnRequestValueState(
              returnFormmatedDate(workshop && workshop.expirationDate),
              loadingReaderRequest,
              errorReaderRequest,
            )}
          </p>
        </div>
        <div>
          <p>
            <span>Registro ITL:</span>{' '}
            {returnRequestValueState(workshop && workshop.registerItl, loadingReaderRequest, errorReaderRequest)}
          </p>
        </div>
        <div>
          <p>
            <span>Placa do Veículo:</span>{' '}
            {returnRequestValueState(workshop && workshop.licensePlate, loadingReaderRequest, errorReaderRequest)}
          </p>
        </div>
      </div>
      {workshop && workshop.cylinders.length ? (
        <>
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
                disabled={cylindersPagination === workshop.cylinders.length - 1 ? true : false}
              >
                Próximo
              </button>
            </div>
          </div>
          <div id="cylinder_content">
            <div>
              <p>
                <span>Nº de série do cilindro GNV:</span>
                {returnRequestValueState(
                  workshop.cylinders[cylindersPagination].cylinderSerial,
                  loadingReaderRequest,
                  errorReaderRequest,
                )}
              </p>
            </div>
            <div>
              <p>
                <span>Nº de selo do Inmetro:</span>
                {returnRequestValueState(
                  workshop.cylinders[cylindersPagination].inmetroSerial,
                  loadingReaderRequest,
                  errorReaderRequest,
                )}
              </p>
            </div>
            <div>
              <p>
                <span>Tipo do selo Inmetro:</span>
                {returnRequestValueState(
                  inmetroSerialType &&
                    inmetroSerialType.find(
                      (options) => options.value === workshop.cylinders[cylindersPagination].inmetroSerialType,
                    )?.title,
                  loadingReaderRequest,
                  errorReaderRequest,
                )}
              </p>
            </div>
            <div>
              <p>
                <span>Nº de série do red. de pressão de GNV:</span>
                {returnRequestValueState(
                  workshop.cylinders[cylindersPagination].pressureReducerSerial,
                  loadingReaderRequest,
                  errorReaderRequest,
                )}
              </p>
            </div>

            <hr />

            <div id="cylinder_pagination">
              <p>
                Cilindro atual: <span>{cylindersPagination + 1}</span> de <span>{workshop.cylinders.length}</span>
              </p>
            </div>
          </div>
        </>
      ) : null}
      <Button
        type="submit"
        value={'Solicitar nova leitura'}
        loading={loadingReaderRequest}
        onClick={() => handleDispatchConnectionChip()}
      />
    </Container>
  );
};

export default WorkshopDataContainer;
