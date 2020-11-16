import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { AbstractComponent } from '@shared/abstracts/shared.abstract';
import { Category } from '@views/model/category.model';
import { Customer } from '@views/model/customer.model';
import { CustomerActionType } from '@views/state/customer-state/customer.action';
import { getAllCustomers } from '@views/state/customer-state/customer.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-update-customer',
  templateUrl: './create-update-customer.component.html',
  styleUrls: ['./create-update-customer.component.scss']
})
export class CreateUpdateCustomerComponent extends AbstractComponent {
  public pageTitle: string;
  public currentPath: Array<any>;

  public customer$: Observable<any>;
  public customers$: Observable<any[]>;
  public currentAction: string;
  public customerForm: FormGroup;
  
  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInitExtend(): void {
    this.customerForm = this.formBuilder.group({
      "id": null,
      "name": ['', [Validators.required]],
      "email": ['', [Validators.required]],
      "phone": ['', [Validators.required]],
      "password": ['', [Validators.required]]
    });

    this.setPageTitle();
    this.findAllCategories();
  }

  public findAllCategories(): void {
    this.store.dispatch(CustomerActionType.FIND_ALL_CUSTOMERS_TYPE())
    this.customers$ = this.store.select(getAllCustomers)
  }

  public save(customer: Customer) {
    this.store.dispatch(CustomerActionType.CREATE_CUSTOMER_TYPE({ customer }));
  }

  findById(customer: Customer): void{
    this.storage.set(customer.id, customer).subscribe(() => {});
  }

  private setPageTitle() {

    if(this.router.url.endsWith('create')) {

      this.pageTitle = 'Novo cliente';
      this.currentPath = [{ text: 'Cliente', link:'/customer' }, { text: 'Adicionar Cliente' }]
    } else {

      this.storage.get(this.route.snapshot.paramMap.get("customerId")).subscribe((customer: Customer) => {
        this.pageTitle = `Cliente: ${customer.name}`;

        this.currentPath = [{ text: 'Cliente', link: `/customer/${customer.id}` }, { text: 'Atualizar Cliente' }]

        Object.keys(this.customerForm.controls)
          .map(control => this.customerForm.controls[control].setValue(customer[control]));
      })
    }
  }

}
