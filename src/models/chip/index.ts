export interface IChip {
  uid: string;
  createdAt: string;
  updatedAt: string;
  finisehdAt: string;
}

export interface IChipSelector {
  data: IChip | IChip[];
  loading: boolean;
  success: boolean;
  error: boolean;
  errorType?: string;
}

export const InitialChipData = {
  uid: null,
  createdAt: null,
  updatedAt: null,
  finishedAt: null,
};

/**
 *
 */

export interface IBlockChip {
  licensePlate: string;
  password: string;
}
