import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { BaseModel, IPageResponse } from '@shared/interfaces/shared.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class BaseResourceService<T extends BaseModel> {
  protected http: HttpClient;
  protected requestPath: String;
  protected contextPath: String = environment.contextPath;

  constructor(injector: Injector, protected requestMapping: string) {
    this.requestPath = `${this.contextPath}/${this.requestMapping}`;
    this.http = injector.get(HttpClient);
  }

  public save(resource: T): Observable<T> {
    return this.http.post<T>(`${this.requestPath}`, resource);
  }

  public update(resource: T): Observable<T> {
    return this.http.put<T>(`${this.requestPath}`, resource);
  }

  public findById(id: string): Observable<T> {
    return this.http.get<T>(`${this.requestPath}/${id}`);
  }

  public findAll(pageSize?: number, pageIndex?: number, sort?: string): Observable<IPageResponse<T>> {
    return this.http.get<IPageResponse<T>>(`${this.requestPath}?page=${pageIndex}&size=${pageSize}`);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.requestPath}/${id}`);
  }
}
