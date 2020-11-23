import { Component, Injector, OnInit } from '@angular/core';
import { AbstractComponent } from '@shared/abstracts/shared.abstract';
import { Order } from '@views/model/order.model';
import { OrderActionType } from '@views/state/order-state/order.action';
import { getAllOrders, getOrderPageData } from '@views/state/order-state/order.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent extends AbstractComponent {
  public displayedColumns: string[] = ['name', 'phone', 'date', 'action'];
  public getOrderPageData$: Observable<any>;
  public Order$: Observable<Order>;
  public orders$: Observable<Order[]>;

  public pageSize: number = 5  ;
  public pageIndex: number = 0;

  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInitExtend(): void {
    this.findAll(5, 0);
  }

  pageSizeOptions(event: any) {
    const { previousPageIndex, pageIndex, pageSize, length } = event;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    this.store.dispatch(OrderActionType.FIND_ALL_ORDERS_TYPE({ pageSize, pageIndex }));
  }

  findAll(pageSize?: number, pageIndex?: number,  sort?: string) {
    pageSize  = pageSize ? pageSize : this.pageSize;
    pageIndex  = pageIndex ? pageIndex : this.pageIndex;

    this.store.dispatch(OrderActionType.FIND_ALL_ORDERS_TYPE({ pageSize, pageIndex }))
    this.orders$ = this.store.select(getAllOrders);
    this.getOrderPageData$ = this.store.select(getOrderPageData);
    this.getOrderPageData$.subscribe(data => { 
      this.pageSize = data?.numberOfElements;
      this.pageIndex = data?.pageable?.pageNumber;
    });
  }

  public edit(Order: Order): void {
    this.storage.set(Order.id, Order).subscribe(() => {});
  }

  public delete(Order: Order): void {
    let OrderToUpdate: Order = Object.assign({}, Order);
    this.store.dispatch(OrderActionType.UPDATE_ORDER_TYPE({ order: OrderToUpdate } ));
  }

}
