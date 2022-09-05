import { ICylinder } from '../../models/workshop';

export const formattedWorkshopData = (data: { cylinder: { name: string; value: string }[] }[]) => {
  const formattedData: any = [];

  data.map(({ cylinder }) => {
    const formattedJson: any = {};

    cylinder.map(({ name, value }) => {
      return (formattedJson[name] = value);
    });

    return formattedData.push(formattedJson);
  });

  return formattedData;
};

export const includePressureReducerSerialToCylinders = async (
  cylinders: ICylinder[],
  pressureReducerSerial: string,
) => {
  const formattedCylinders = await Promise.all(
    cylinders.map((cylinder) => {
      cylinder.pressureReducerSerial = pressureReducerSerial;

      return cylinder;
    }),
  );

  return formattedCylinders;
};
