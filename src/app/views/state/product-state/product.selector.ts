import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productAdapter, ProductState } from './product.state';


export const productState = createFeatureSelector<ProductState>('PRODUCT_STATE');

const { selectAll } = productAdapter.getSelectors(productState)

export const getPageData = createSelector(productState, (state: ProductState): any => state.pageData);

export const getAllProducts = createSelector(selectAll, allProducts =>  Object.values(allProducts)) 

export const getSelectProduct = createSelector(productState, (state: ProductState): any => state.entities[state.selectId])

export const hasError = createSelector(productState, (state: ProductState): any => state.error);

export const isLoading = createSelector(productState, (state: ProductState): boolean => state.load.isLoading);
