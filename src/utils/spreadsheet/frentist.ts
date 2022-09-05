import { read, write, utils } from 'xlsx';
import { AES, enc } from 'crypto-js';
import { saveAs } from 'file-saver';

import { IExpirationDateFrentist } from '../../models/frentist';
import { returnJsonStringify } from '..';
import { IUser } from './../../models/user/index';
import { returnDateWithoutFormatting } from './../index';

export const returnFormattedSpreadsheetValidateData = async (file: File) => {
  const promise: Promise<{ listExpirationData: IExpirationDateFrentist[]; privateKey: string }> = new Promise(
    (resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsArrayBuffer(file);

      fileReader.onload = ({ target }) => {
        if (target) {
          const bufferArray = target.result;

          const wb = read(bufferArray, { type: 'buffer' });

          const nameExpirationDateWs = wb.SheetNames[0];
          const nameProtectedWs = wb.SheetNames[1];

          const expirationDateWs = wb.Sheets[nameExpirationDateWs];
          const protectedWs = wb.Sheets[nameProtectedWs];

          const expirationData = utils.sheet_to_formulae(expirationDateWs);
          const protectedData = utils.sheet_to_formulae(protectedWs);

          if (!expirationData.length || !protectedData.length || !protectedData[1])
            return reject(new Error('FILE_IS_EMPTY'));

          const privateKey = protectedData[1].split("'")[1];

          const listExpirationData: IExpirationDateFrentist[] = [];

          delete expirationData[0];

          expirationData.map((expirationDate, index) =>
            listExpirationData.push(
              JSON.parse(AES.decrypt(expirationDate.split("'")[1], privateKey).toString(enc.Utf8)),
            ),
          );

          if (!listExpirationData.length) return reject(new Error('FILE_IS_EMPTY'));

          resolve({ listExpirationData, privateKey });
        }
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    },
  );

  return await promise;
};

export const generateSpreadsheetValidationData = async (
  expirationDataToGenerateSpreadsheet: IExpirationDateFrentist[],
  user: IUser,
) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const encryptExpirationData: { expiration_date: string }[] = [];

  await Promise.all(
    expirationDataToGenerateSpreadsheet.map((expirationDate: IExpirationDateFrentist) => {
      return encryptExpirationData.push({
        expiration_date: AES.encrypt(returnJsonStringify(expirationDate), user?.userType.decryptKey).toString(),
      });
    }),
  );

  const ws = utils.json_to_sheet(encryptExpirationData);
  const protectedWs = utils.json_to_sheet([{ protected: user.userType.decryptKey }]);

  const wb = {
    Sheets: { data: ws, protected: protectedWs },
    SheetNames: ['data', 'protected'],
  };

  const excelBuffer = await write(wb, { bookType: 'xlsx', type: 'array' });

  const data = new Blob([excelBuffer], { type: fileType });

  return saveAs(data, `EXPIRATION_DATA_FILLING_STATION_${returnDateWithoutFormatting(new Date())}${fileExtension}`);
};
