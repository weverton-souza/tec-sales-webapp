import { createFeatureSelector, createSelector } from '@ngrx/store';
import { orderAdapter, OrderState } from './order.state';


export const orderState = createFeatureSelector<OrderState>('ORDER_STATE');

const { selectAll } = orderAdapter.getSelectors(orderState);

export const getOrderPageData = createSelector(orderState, (state: OrderState): any => state.pageData);

export const getAllOrders = createSelector(selectAll, allOrders =>  Object.values(allOrders)) 

export const hasError = createSelector(orderState, (state: OrderState): any => state.error);

export const isLoading = createSelector(orderState, (state: OrderState): boolean => state.load.isLoading);
