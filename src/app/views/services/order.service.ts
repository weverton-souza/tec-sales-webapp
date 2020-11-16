import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '@shared/services/base.service';
import { Order } from '@views/model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseResourceService<Order> {
  constructor(injector: Injector) { 
    super(injector, "orders");
  }
}
