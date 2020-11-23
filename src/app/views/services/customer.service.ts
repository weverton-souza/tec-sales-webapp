import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '@shared/services/base.service';
import { Customer } from '@views/model/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseResourceService<Customer> {
  constructor(injector: Injector) { 
    super(injector, "customers");
  }

  public findByCode(code: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.requestPath}/find-by-code/${code}`);
  }
  
}
