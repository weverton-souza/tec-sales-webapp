import { Action, createReducer, on } from '@ngrx/store';
import { ProductActionType } from './product.action';
import { productAdapter, ProductState, initialProductState } from './product.state';

const featureReducer = createReducer(
  initialProductState,

  on(ProductActionType.CREATE_PRODUCT_TYPE, (state) => {
    return { ...state, load: { isLoading: true } };
  }),

  on(ProductActionType.CREATE_PRODUCT_SUCCESS, (state, { payload }) =>
    productAdapter.addOne(payload, { ...state, load: { isLoading: false }, selectId: payload.id })
  ),

  on(ProductActionType.CREATE_PRODUCT_FAILURE, (state, { error }) => {
    return { ...state, error, load: { isLoading: false } };
  }),

  on(ProductActionType.FIND_PRODUCT_BY_ID_TYPE, (state) => {
    return { ...state, load: { isLoading: true } };
  }),

  on(ProductActionType.FIND_PRODUCT_BY_ID_SUCCESS, (state, { payload }) =>
    productAdapter.addOne(payload, { ...state, load: { isLoading: false }, selectId: payload.id })
  ),

  on(ProductActionType.FIND_PRODUCT_BY_ID_FAILURE, (state, { error }) => {
    return { ...state, error, load: { isLoading: false } };
  }),

  on(ProductActionType.FIND_ALL_PRODUCTS_TYPE, (state) => {
    return { ...state, load: { isLoading: true } };
  }),

  on(ProductActionType.FIND_ALL_PRODUCTS_SUCCESS, (state, { payload }) =>
    productAdapter.setAll(payload, { ...state, load: { isLoading: false } })
  ),

  on(ProductActionType.FIND_ALL_PRODUCTS_FAILURE, (state, { error }) => {
    return { ...state, error, load: { isLoading: false } };
  }),

  on(ProductActionType.DELETE_PRODUCT_TYPE, (state, { productId }) =>
    productAdapter.removeOne(productId, { ...state, load: { isLoading: false } })
  ),

  on(ProductActionType.DELETE_PRODUCT_FAILURE, (state, { error }) => {
    return { ...state, error, load: { isLoading: false } };
  })
);

export function productReducer(state: ProductState | undefined, action: Action) {
  return featureReducer(state, action);
}
