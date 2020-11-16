import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '@shared/services/base.service';
import { Customer } from '@views/model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseResourceService<Customer> {
  constructor(injector: Injector) { 
    super(injector, "customers");
  }
}
