interface IResponseSaga {
  status: string;
  response: any;
  message: string;
  errors: object;

  content: object;
  totalElements: number;
  totalPages: number;
}

export interface IRequestSaga {
  status: number;
  data: IResponseSaga;
  config: object;
}

export interface IActionSaga {
  params: { [key: string]: string };
  payload: object;
  type: string;
  userId: number;
  cancelToken: any;
}
