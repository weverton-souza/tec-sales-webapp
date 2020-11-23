import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Order } from '@views/model/order.model';

export const orderAdapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  selectId: (payload) => payload.id,
});

export interface OrderState extends EntityState<Order> {
  load: { isLoading: boolean };
  error: { isTrusted: boolean };
  pageData: any;
  selectId: string,
}

export const initialOrderState: OrderState = orderAdapter.getInitialState({
  load: { isLoading: false },
  error: { isTrusted: false },
  pageData: null,
  selectId: null,
});
