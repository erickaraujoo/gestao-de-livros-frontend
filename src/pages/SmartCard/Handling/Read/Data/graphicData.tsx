import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../../Components/Button';
import { IGraphic } from '../../../../../models/graphic';
import { IListSelectors } from '../../../../../models/redux/selectors';
import { IUser } from '../../../../../models/user';
import { checkConnectionChip } from '../../../../../store/modules/chip/action';
import { readDataFromTheChip } from '../../../../../store/modules/readerRequest/actions';
import { returnParseJson, returnRequestValueState } from '../../../../../utils';
import { Container } from './styles';
import { generateSourceAxiosToken } from './../../../../../utils/index';

interface GraphicDataContainerProps {
  user: IUser | null;
  sourceAxiosToken: { token: Object; cancel: Object } | null;
  setSourceAxiosToken: Dispatch<SetStateAction<{ token: Object; cancel: Object } | null>>;
}

const GraphicDataContainer: React.FC<GraphicDataContainerProps> = ({ user, sourceAxiosToken, setSourceAxiosToken }) => {
  const dispatch = useDispatch();

  const { success: successChip } = useSelector((state: IListSelectors) => state.chip);

  const {
    data: dataReaderRequest,
    loading: loadingReaderRequest,
    error: errorReaderRequest,
    success: successReaderRequest,
  } = useSelector((state: IListSelectors) => state.readerRequest);

  const [graphic, setGraphic] = useState<IGraphic | null>(null);

  const handleDispatchConnectionChip = () => generateSourceAxiosToken(setSourceAxiosToken);

  const handleGraphic = (value: IGraphic | null) => setGraphic(value);

  useEffect(() => {
    generateSourceAxiosToken(setSourceAxiosToken);
  }, [setSourceAxiosToken]);

  useEffect(() => {
    sourceAxiosToken && dispatch(checkConnectionChip({ cancelToken: sourceAxiosToken.token }));
  }, [dispatch, sourceAxiosToken]);

  useEffect(() => {
    if (successChip && user) {
      dispatch(readDataFromTheChip({ userId: user.id }));

      handleGraphic(null);
    }
  }, [dispatch, successChip, user]);

  useEffect(() => {
    successReaderRequest &&
      Object.keys(dataReaderRequest.response).length &&
      dataReaderRequest.response.graphic &&
      handleGraphic(returnParseJson(dataReaderRequest.response.graphic.toString()));
  }, [dataReaderRequest.response, successReaderRequest]);

  return (
    <Container>
      <h3>Gráfica</h3>
      <div id="graphic_content">
        <div>
          <p>
            <span>Nº do selo de Inspeção:</span>{' '}
            {returnRequestValueState(graphic && graphic.serial, loadingReaderRequest, errorReaderRequest)}
          </p>
        </div>
      </div>
      <Button
        type="submit"
        value={'Solicitar nova leitura'}
        loading={loadingReaderRequest}
        onClick={() => handleDispatchConnectionChip()}
      />
    </Container>
  );
};

export default GraphicDataContainer;
