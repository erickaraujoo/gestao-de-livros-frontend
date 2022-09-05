interface ISort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

interface IPageable {
  sort: ISort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
}

export interface IPageableResponse {
  number: number;
  last: boolean;
  size: number;
  numberOfElements: number;
  totalPages: number;
  pageable: IPageable;
  sort: ISort;
  first: boolean;
  totalElements: number;
  empty: boolean;
}