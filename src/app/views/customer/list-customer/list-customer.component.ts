import { Component, Injector, OnInit } from '@angular/core';
import { AbstractComponent } from '@shared/abstracts/shared.abstract';
import { Customer } from '@views/model/customer.model';
import { CustomerActionType } from '@views/state/customer-state/customer.action';
import { getAllCustomers } from '@views/state/customer-state/customer.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent extends AbstractComponent {
  
  public customer$: Observable<Customer>;
  public categories$: Observable<Customer[]>;
  
  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInitExtend(): void {
    this.findAll();
  }

  findAll() {
    this.store.dispatch(CustomerActionType.FIND_ALL_CUSTOMERS_TYPE())
    this.categories$ = this.store.select(getAllCustomers)
  }

  public edit(customer: Customer): void {
    this.storage.set(customer.id, customer).subscribe(() => {});
  }

  public delete(customer: Customer): void {
    this.store.dispatch(CustomerActionType.DELETE_CUSTOMER_TYPE({ customerId: customer.id }))
  }

}