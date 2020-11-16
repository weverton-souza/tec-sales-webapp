import { Observable } from 'rxjs';

export interface IModel {
  id?: string;
}

export class BaseModel implements IModel {
  id?: string;
}

export interface IService<T> {
  save(resource: T): Observable<IResponse<T>>;

  update(resource: T): Observable<IResponse<T>>;

  findById(resourceId: string): Observable<IResponse<T>>;

  findAll(): Observable<IPageResponse<T>>;

  delete(resource: T): void;
}

export interface IResponseConfig {
  content: any;
  code: number;
  mainRoute?: string;
  message: string;
  wasSuccessfully: boolean;
}

export interface IResponse<T> extends IResponseConfig {
  content: T;
}

export interface IPageResponse<T> {
  content: T[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageSize: number;
    pageNumber: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

export interface IPageResponse<T> extends IResponseConfig {
  // content: IPage<T>;:
  content: T[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageSize: number;
    pageNumber: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}
