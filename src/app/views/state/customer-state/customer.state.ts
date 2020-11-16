import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Customer } from '@views/model/customer.model';

export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>({
  selectId: (payload) => payload.id,
});

export interface CustomerState extends EntityState<Customer> {
  load: { isLoading: boolean };
  error: { isTrusted: boolean };
  selectId: string,
}

export const initialCustomerState: CustomerState = customerAdapter.getInitialState({
  load: { isLoading: false },
  error: { isTrusted: false },
  selectId: null,
});
