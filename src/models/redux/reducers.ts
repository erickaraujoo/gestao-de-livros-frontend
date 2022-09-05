interface IInitialStateReducer {
  data: object;
  totalElements: number;
  totalPages: number;
  loading: boolean;
  success: boolean;
  error: boolean;
  errorType?: string;
}

export interface IActionReducer {
  payload: {
    data: object;
  };
  type: string;
}

export const InitialStateReducer: IInitialStateReducer = {
  data: {},
  totalElements: 0,
  totalPages: 0,
  loading: false,
  success: false,
  error: false,
};
