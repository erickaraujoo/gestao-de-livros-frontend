export interface ICylinder {
  cylinderSerial: string;
  inmetroSerial: string;
  inmetroSerialType: string;
  pressureReducerSerial?: string;
}

export interface IWorkshop {
  date: string;
  expirationDate: string;
  registerItl: string;
  licensePlate: string;
  pressureReducerSerial: string;
  cylinders: ICylinder[];
}
