import { SecundaryButton } from '../../../../../../Components/Button';
import { Container, Modal, Title, SelectOrGenerateSpreadsheetContainer } from './styles';

import { ChangeEvent, useState, useEffect, Dispatch, SetStateAction, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IListSelectors } from './../../../../../../models/redux/selectors';
import { ClipLoader } from 'react-spinners';
import { getExpirationDataToGenerateSpreadsheet } from './../../../../../../store/modules/frentist/actions';
import { IUser } from '../../../../../../models/user';
import { IExpirationDateFrentist } from './../../../../../../models/frentist/index';
import {
  generateSpreadsheetValidationData,
  returnFormattedSpreadsheetValidateData,
} from './../../../../../../utils/spreadsheet/frentist';
import { toast } from 'react-toastify';

interface SelectOrGenerateSpreadsheetValidationDataFillingStationModalProps {
  user: IUser | null;
  setExpirationData: Dispatch<SetStateAction<IExpirationDateFrentist[] | null>>;
}

const SelectOrGenerateSpreadsheetValidationDataFillingStationModal: React.FC<SelectOrGenerateSpreadsheetValidationDataFillingStationModalProps> =
  ({ user, setExpirationData }) => {
    const dispatch = useDispatch();

    const {
      data: dataFrentist,
      loading: loadingFrentist,
      success: successFrentist,
    } = useSelector((state: IListSelectors) => state.frentist);

    const [fileHasBeenSelected, setFileHasBeenSelected] = useState(false);

    const [expirationDataToGenerateSpreadsheet, setExpirationDataToGenerateSpreadsheet] = useState<
      IExpirationDateFrentist[] | []
    >([]);

    const handleSelectedFile = async ({ target }: ChangeEvent<HTMLInputElement>) => {
      setFileHasBeenSelected(false);

      const file = target.files?.length ? target.files[0] : null;

      if (file) {
        try {
          const { listExpirationData } = await returnFormattedSpreadsheetValidateData(file);

          setExpirationData(listExpirationData);
          setFileHasBeenSelected(true);
        } catch (error) {
          switch (error.message) {
            case 'FILE_IS_EMPTY':
              return toast.error('Arquivo inválido, selecione o arquivo gerado pelo sistema ou gere um novamente!');
            default:
          }
        }
      }
    };

    const handleGetExpirationDateToGenerateSpreadsheet = () =>
      user && dispatch(getExpirationDataToGenerateSpreadsheet({ userId: user.id }));

    useEffect(() => {
      successFrentist &&
        dataFrentist.response &&
        dataFrentist.response instanceof Array &&
        dataFrentist.response.map(({ chip, expirationDate }) => {
          return (
            chip &&
            setExpirationDataToGenerateSpreadsheet((prevData) => [...prevData, { uid: chip.uid, expirationDate }])
          );
        });
    }, [dataFrentist.response, successFrentist]);

    useMemo(async () => {
      if (user && expirationDataToGenerateSpreadsheet.length) {
        await generateSpreadsheetValidationData(expirationDataToGenerateSpreadsheet, user);

        setExpirationDataToGenerateSpreadsheet([]);

        toast.success('Planilha gerada com sucesso');
      }
    }, [expirationDataToGenerateSpreadsheet, user]);

    return (
      <Container visible={!fileHasBeenSelected}>
        <Modal>
          <Title>
            <h2>Arquivo para validação dos dados</h2>
          </Title>

          {!loadingFrentist && !successFrentist && (
            <SelectOrGenerateSpreadsheetContainer>
              <p>
                Selecione o arquivo que contém as datas de vencimento para validação dos dados dos selos, ou gere o
                arquivo clicando no botão "Gerar arquivo".
              </p>

              <div id="container-flex">
                <div id="select-file-validation-data">
                  <label htmlFor="file-validation-data">SELECIONAR ARQUIVO...</label>
                </div>
                <input
                  type="file"
                  name="file-validation-data"
                  id="file-validation-data"
                  accept=".xlsx"
                  onChange={(e) => handleSelectedFile(e)}
                />
                <SecundaryButton
                  value="Gerar arquivo (Requer Internet)"
                  onClick={() => handleGetExpirationDateToGenerateSpreadsheet()}
                />
              </div>
            </SelectOrGenerateSpreadsheetContainer>
          )}

          {loadingFrentist && (
            <div id="loading-data">
              <p>Carregando...</p>
              <ClipLoader size={30} />
            </div>
          )}
        </Modal>
      </Container>
    );
  };

export default SelectOrGenerateSpreadsheetValidationDataFillingStationModal;
