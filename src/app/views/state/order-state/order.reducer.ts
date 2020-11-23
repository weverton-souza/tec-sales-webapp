import { Action, createReducer, on } from '@ngrx/store';
import { OrderActionType } from './order.action';
import { orderAdapter, OrderState, initialOrderState } from './order.state';

const featureReducer = createReducer(
  initialOrderState,

  on(OrderActionType.CREATE_ORDER_TYPE, (state) => {
    return { ...state, load: { isLoading: true } };
  }),

  on(OrderActionType.CREATE_ORDER_SUCCESS, (state, { payload }) =>
    orderAdapter.addOne(payload, { ...state, load: { isLoading: false }, selectId: payload.id })
  ),

  on(OrderActionType.CREATE_ORDER_FAILURE, (state, { error }) => {
    return { ...state, error, load: { isLoading: false } };
  }),

  on(OrderActionType.UPDATE_ORDER_TYPE, (state) => {
    return { ...state, load: { isLoading: true } };
  }),

  on(OrderActionType.UPDATE_ORDER_SUCCESS, (state, { payload }) =>
    orderAdapter.updateOne(payload, { ...state, load: { isLoading: false }, selectId: payload.id })
  ),

  on(OrderActionType.UPDATE_ORDER_FAILURE, (state, { error }) => {
    return { ...state, error, load: { isLoading: false } };
  }),

  on(OrderActionType.FIND_ORDER_BY_ID_TYPE, (state) => {
    return { ...state, load: { isLoading: true } };
  }),

  on(OrderActionType.FIND_ORDER_BY_ID_SUCCESS, (state, { payload }) =>
    orderAdapter.addOne(payload, { ...state, load: { isLoading: false }, selectId: payload.id })
  ),

  on(OrderActionType.FIND_ORDER_BY_ID_FAILURE, (state, { error }) => {
    return { ...state, error, load: { isLoading: false } };
  }),

  on(OrderActionType.FIND_ALL_ORDERS_TYPE, (state) => {
    return { ...state, load: { isLoading: true } };
  }),

  on(OrderActionType.FIND_ALL_ORDERS_SUCCESS, (state, { payload }) =>
    orderAdapter.setAll(payload.content, { ...state, pageData: payload, load: { isLoading: false } })
  ),

  on(OrderActionType.FIND_ALL_ORDERS_FAILURE, (state, { error }) => {
    return { ...state, error, load: { isLoading: false } };
  })
);

export function orderReducer(state: OrderState | undefined, action: Action) {
  return featureReducer(state, action);
}
