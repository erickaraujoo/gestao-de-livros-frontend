import { IUser } from '../../../../../models/user';
import { Container } from './styles';
import { useSelector, useDispatch } from 'react-redux';

import Button from '../../../../../Components/Button';

import SelectOrGenerateSpreadsheetexpirationDataFillingStationModal from './SelectOrGenerateSpreadsheetValidationDataFillingStationModal';

import { IListSelectors } from './../../../../../models/redux/selectors';
import { IExpirationDateFrentist } from './../../../../../models/frentist/index';
import { useState, useEffect } from 'react';
import { returnDateISOStringToFormattedDate, returnParseJson, returnRequestValueState } from '../../../../../utils';
import { checkOfflineConnectionChip } from '../../../../../store/modules/chip/action';
import { readOfflineDataFromTheChip } from './../../../../../store/modules/readerRequest/actions';
import { returnFormmatedDate } from './../../../../../utils/index';
import { toast } from 'react-toastify';

interface FrentistDataContainerProps {
  user: IUser | null;
}

const FrentistDataContainer: React.FC<FrentistDataContainerProps> = ({ user }) => {
  const dispatch = useDispatch();

  const { success: successChip } = useSelector((state: IListSelectors) => state.chip);
  const {
    data: dataReaderRequest,
    loading: loadingReaderRequest,
    success: successReaderRequest,
    error: errorReaderRequest,
  } = useSelector((state: IListSelectors) => state.readerRequest);

  const [expirationData, setExpirationData] = useState<IExpirationDateFrentist[] | null>(null);

  const [listSpreadsheetExpirationDates, setListSpreadsheetExpirationDate] = useState<
    { uid: string; expirationDate: string }[] | []
  >([]);

  const [spreadsheetExpirationDate, setSpreadsheetExpirationDate] =
    useState<{ uid: string; expirationDate: string } | null>(null);

  const [frentist, setFrentist] = useState<IExpirationDateFrentist | null>(null);

  const handleFrentist = (value: IExpirationDateFrentist | null) => setFrentist(value);

  const handleDispatchConnectionChip = () => {
    setSpreadsheetExpirationDate(null);
    setFrentist(null);

    dispatch(checkOfflineConnectionChip());
  };

  useEffect(() => {
    if (expirationData) {
      dispatch(checkOfflineConnectionChip());

      expirationData.map(({ uid, expirationDate }) => {
        const formattedExpirationDate = returnDateISOStringToFormattedDate(expirationDate);

        return (
          formattedExpirationDate &&
          setListSpreadsheetExpirationDate((prevDate) => [
            ...prevDate,
            { uid, expirationDate: formattedExpirationDate },
          ])
        );
      });
    }
  }, [dispatch, expirationData, setListSpreadsheetExpirationDate]);

  useEffect(() => {
    successChip && user && dispatch(readOfflineDataFromTheChip());
  }, [dispatch, successChip, user]);

  useEffect(() => {
    successReaderRequest &&
      Object.keys(dataReaderRequest.response).length &&
      dataReaderRequest.response.frentist &&
      handleFrentist(returnParseJson(dataReaderRequest.response.frentist.toString()));
  }, [dataReaderRequest.response, successReaderRequest]);

  useEffect(() => {
    if (frentist && listSpreadsheetExpirationDates.length) {
      const hasSpreadsheetExpirationDate = listSpreadsheetExpirationDates.filter(
        ({ uid }) => returnFormmatedDate(frentist.uid) === uid,
      );

      if (hasSpreadsheetExpirationDate.length) return setSpreadsheetExpirationDate(hasSpreadsheetExpirationDate[0]);
      else toast.error('OBS: A data de vencimento do chip não está incluída no arquivo Excel');
    }
  }, [frentist, listSpreadsheetExpirationDates, expirationData]);

  return (
    <>
      <SelectOrGenerateSpreadsheetexpirationDataFillingStationModal user={user} setExpirationData={setExpirationData} />

      <Container>
        <h3>Posto de Abastecimento</h3>
        <div id="frentist_content">
          <div>
            <p>
              <span>Data de Validade (Chip):</span>{' '}
              {returnRequestValueState(
                frentist && returnFormmatedDate(frentist.expirationDate),
                loadingReaderRequest,
                errorReaderRequest,
              )}
            </p>
          </div>
          <div>
            <p>
              <span>Data de Validade (Planilha):</span>{' '}
              {returnRequestValueState(
                spreadsheetExpirationDate && spreadsheetExpirationDate.expirationDate,
                loadingReaderRequest,
                errorReaderRequest,
              )}
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
    </>
  );
};

export default FrentistDataContainer;
