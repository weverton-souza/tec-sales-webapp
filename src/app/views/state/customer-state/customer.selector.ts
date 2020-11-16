import { createFeatureSelector, createSelector } from '@ngrx/store';
import { customerAdapter, CustomerState } from './customer.state';


export const customerState = createFeatureSelector<CustomerState>('CUSTOMER_STATE');

const { selectAll } = customerAdapter.getSelectors(customerState)

export const getAllCustomers = createSelector(selectAll, allCustomers =>  Object.values(allCustomers)) 

export const hasError = createSelector(customerState, (state: CustomerState): any => state.error);

export const isLoading = createSelector(customerState, (state: CustomerState): boolean => state.load.isLoading);
