import { Action, createReducer, on } from '@ngrx/store';
import { CustomerActionType } from './customer.action';
import { customerAdapter, CustomerState, initialCustomerState } from './customer.state';

const featureReducer = createReducer(
  initialCustomerState,

  on(CustomerActionType.CREATE_CUSTOMER_TYPE, (state) => {
    return { ...state, load: { isLoading: true } };
  }),

  on(CustomerActionType.CREATE_CUSTOMER_SUCCESS, (state, { payload }) =>
    customerAdapter.addOne(payload, { ...state, load: { isLoading: false }, selectId: payload.id })
  ),

  on(CustomerActionType.CREATE_CUSTOMER_FAILURE, (state, { error }) => {
    return { ...state, error, load: { isLoading: false } };
  }),

  on(CustomerActionType.FIND_CUSTOMER_BY_ID_TYPE, (state) => {
    return { ...state, load: { isLoading: true } };
  }),

  on(CustomerActionType.FIND_CUSTOMER_BY_ID_SUCCESS, (state, { payload }) =>
    customerAdapter.addOne(payload, { ...state, load: { isLoading: false }, selectId: payload.id })
  ),

  on(CustomerActionType.FIND_CUSTOMER_BY_ID_FAILURE, (state, { error }) => {
    return { ...state, error, load: { isLoading: false } };
  }),

  on(CustomerActionType.FIND_ALL_CUSTOMERS_TYPE, (state) => {
    return { ...state, load: { isLoading: true } };
  }),

  on(CustomerActionType.FIND_ALL_CUSTOMERS_SUCCESS, (state, { payload }) =>
    customerAdapter.setAll(payload, { ...state, load: { isLoading: false } })
  ),

  on(CustomerActionType.FIND_ALL_CUSTOMERS_FAILURE, (state, { error }) => {
    return { ...state, error, load: { isLoading: false } };
  }),

  on(CustomerActionType.DELETE_CUSTOMER_TYPE, (state, { customerId }) =>
    customerAdapter.removeOne(customerId, { ...state, load: { isLoading: false } })
  ),

  on(CustomerActionType.DELETE_CUSTOMER_FAILURE, (state, { error }) => {
    return { ...state, error, load: { isLoading: false } };
  })
);

export function customerReducer(state: CustomerState | undefined, action: Action) {
  return featureReducer(state, action);
}
