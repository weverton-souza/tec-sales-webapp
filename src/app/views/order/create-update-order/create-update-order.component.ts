import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractComponent } from '@shared/abstracts/shared.abstract';
import { Order, OrderItem } from '@views/model/order.model';
import { OrderActionType } from '@views/state/order-state/order.action';
import { BehaviorSubject, Observable } from 'rxjs';
import { DecimalPipe, formatDate } from '@angular/common';
import { ProductActionType } from '@views/state/product-state/product.action';
import { getSelectProduct } from '@views/state/product-state/product.selector';
import { Product } from '@views/model/product.model';
import { Category } from '@views/model/category.model';
import { CustomerActionType } from '@views/state/customer-state/customer.action';
import { getSelectCustomer } from '@views/state/customer-state/customer.selector';
import { Customer } from '@views/model/customer.model';

export interface DialogData {
  code: string;
  name: string;
  categories: Category[];
  price: string;
  amount: number;
  discount: string;
  total: string;
}

@Component({
  selector: 'create-update-order-dialog',
  templateUrl: 'create-update-order-dialog.component.html',
  styleUrls: ['./create-update-order.component.scss']
})
export class CreateUpdateOrderDialogComponent extends AbstractComponent {

  public getSelectProduct$: Observable<Product>;
  public totalValue: number;

  ngOnInitExtend(): void {
  }

  constructor(
    private decimalPipe: DecimalPipe,
    private injector: Injector,
    public dialogRef: MatDialogRef<CreateUpdateOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      super(injector);
  }

  findProductByCode(code: string) {
    if(code.length >= 4) {
      this.store.dispatch(ProductActionType.FIND_PRODUCT_BY_CODE_TYPE({ code }));
      this.getSelectProduct$ = this.store.select(getSelectProduct);
      
      this.getSelectProduct$.subscribe(res => {
        this.data.name = res?.name;
        this.data.price = this.decimalPipe.transform(res?.price, '1.2-2')
        this.data.categories = res?.categories;
        this.data.total = this.decimalPipe.transform(Number((res?.price * this.data.amount)) - Number(this.data.discount), '1.2-2')
      });
    }
  }

  calculateTotal() {
    this.data.total = this.decimalPipe.transform((Number(this.data.price) * this.data.amount) - Number(this.data.discount), '1.2-2')
  }

  close(): void {
    if (this.data.name.length >= 4) {
      this.dialogRef.close(Object.assign({}, this.data));
    } else {
      this.dialogRef.close();
    }
  }

}

@Component({
  selector: 'app-create-update-order',
  templateUrl: './create-update-order.component.html',
  styleUrls: ['./create-update-order.component.scss']
})
export class CreateUpdateOrderComponent extends AbstractComponent {
  displayedColumns: string[] = ['code', 'name', 'price', 'amount', 'discount', 'total', 'action'];
  public pageTitle: string;
  public currentPath: Array<any>;
  public customer: Customer;

  public order$: Observable<any>;
  public currentAction: string;
  public orderForm: FormGroup;
  public orderItems$: BehaviorSubject<Array<any>> = new BehaviorSubject([]);

  constructor(private injector: Injector, public dialog: MatDialog, private decimalPipe: DecimalPipe) {
    super(injector);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateUpdateOrderDialogComponent, {
      width: '500px',
      data: { 
        code: "", 
        name: "",
        categories: [],
        price: this.decimalPipe.transform(0, '1.2-2'), 
        amount: 1, 
        discount: this.decimalPipe.transform(0, '1.2-2'),
        total: this.decimalPipe.transform(0, '1.2-2')
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        const currentValue = this.orderItems$.value;
        const updatedValue = [...currentValue, result];
        this.orderItems$.next(updatedValue);

        this.store.dispatch(ProductActionType.ERASE_SELECTED_ID_TYPE());
      }
    });
  }

  ngOnInitExtend(): void {

    this.orderForm = this.formBuilder.group({
      "id": null,
      "userCode": [''],
      "name": [{value: '', disabled: true}],
      "phone": [{value: '', disabled: true}],
      "email": [{value: '', disabled: true}],
      "date": [''],
    });

    this.setPageTitle();
  }

  public save(form: any){
    this.orderItems$.subscribe(items => {

      let orderToSave: Order = {} as Order;
      let itemsToSave = [];

      items.map(item => itemsToSave.push({
        amount: Number(item.discount), 
        price: Number(item.price), 
        discount: Number(item.amount) 
      }));

      orderToSave.date = formatDate(new Date(form.date.toString()), 'dd/MM/yyyy', 'pt-BR');
      orderToSave.items = itemsToSave;
      orderToSave.customer = this.customer;

      console.log(orderToSave);
      this.store.dispatch(OrderActionType.CREATE_ORDER_TYPE({ order: orderToSave }));
    })
  }

  public removeProduct(product: DialogData) {
    const currentValue = this.orderItems$.value;
    const updatedValue = [...currentValue.filter(p => p.code !== product.code)];
    this.orderItems$.next(updatedValue);
  }

  public findCustomerId(customerCode: string) {
    if (customerCode.length >= 4) {
      this.store.dispatch(CustomerActionType.FIND_CUSTOMER_BY_CODE_TYPE({ customerCode }));

      this.store.select(getSelectCustomer).subscribe(data => {
        this.customer = data;
        Object.keys(this.orderForm.controls).map((key) => { data && !!data[key] && (this.orderForm.controls[key].setValue(data[key])); });
      })
    }
  }

  private setPageTitle() {

    if(this.router.url.endsWith('create')) {

      this.pageTitle = 'Novo Pedido';
      this.currentPath = [{ text: 'Order', link:'/order' }, { text: 'Adicionar Pedido' }]
    } else {

      this.storage.get(this.route.snapshot.paramMap.get("orderId")).subscribe((order: Order) => {
        this.pageTitle = `Pedido`;

        this.currentPath = [{ text: 'Order', link: `/order/${order.id}` }, { text: 'Atualizar Pedido' }]

        Object.keys(this.orderForm.controls)
          .map(control => this.orderForm.controls[control].setValue(order[control]));
      })
    }
  }

}
