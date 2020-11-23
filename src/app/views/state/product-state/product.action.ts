import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { IPageResponse } from '@shared/interfaces';
import { Product } from '@views/model/product.model';

export class ProductActionType {
  //#region ERASE_SELECTED_ID
  public static ERASE_SELECTED_ID_TYPE = createAction('@tecsales/create-erase-selected-id');
  public static ERASE_SELECTED_ID_SUCCESS = createAction('@tecsales/create-erase-selected-id-success');
  public static ERASE_SELECTED_ID_FAILURE = createAction('@tecsales/create-erase-selected-id-failure');
  //#endregion ERASE_SELECTED_ID

  //#region CREATE_PRODUCT
  public static CREATE_PRODUCT_TYPE = createAction('@tecsales/create-product', props<{ product: Product }>());
  public static CREATE_PRODUCT_SUCCESS = createAction('@tecsales/create-product-success', props<{ payload: Product }>());
  public static CREATE_PRODUCT_FAILURE = createAction('@tecsales/create-product-failure', props<{ error: Error | any }>());
  //#endregion CREATE_PRODUCT

  //#region UPDATE_PRODUCT
  public static UPDATE_PRODUCT_TYPE = createAction('@tecsales/update-product', props<{ product: Product }>());
  public static UPDATE_PRODUCT_SUCCESS = createAction('@tecsales/update-product-success', props<{ payload: Update<Product> }>());
  public static UPDATE_PRODUCT_FAILURE = createAction('@tecsales/update-product-failure', props<{ error: Error | any }>());
  //#endregion UPDATE_PRODUCT

  //#region FIND_PRODUCT_BY_ID
  public static FIND_PRODUCT_BY_ID_TYPE = createAction('@tecsales/find-product-by-id', props<{ productId: string }>());
  public static FIND_PRODUCT_BY_ID_SUCCESS = createAction('@tecsales/find-product-by-id-success', props<{ payload: Product }>());
  public static FIND_PRODUCT_BY_ID_FAILURE = createAction('@tecsales/find-product-by-id-failure', props<{ error: Error | any }>());
  //#endregion FIND_PRODUCT_BY_ID

  //#region FIND_PRODUCT_BY_ID
  public static FIND_PRODUCT_BY_CODE_TYPE = createAction('@tecsales/find-product-by-code', props<{ code: string }>());
  public static FIND_PRODUCT_BY_CODE_SUCCESS = createAction('@tecsales/find-product-by-code-success', props<{ payload: Product }>());
  public static FIND_PRODUCT_BY_CODE_FAILURE = createAction('@tecsales/find-product-by-code-failure', props<{ error: Error | any }>());
  //#endregion FIND_PRODUCT_BY_ID

  //#region FIND_ALL_PRODUCTS
  public static FIND_ALL_PRODUCTS_TYPE = createAction('@tecsales/find-all-products', props<{ pageSize?: number, pageIndex?: number, sort?: string }>());
  public static FIND_ALL_PRODUCTS_SUCCESS = createAction('@tecsales/find-all-products-success', props<{ payload: IPageResponse<Product> }>());
  public static FIND_ALL_PRODUCTS_FAILURE = createAction('@tecsales/find-all-products-failure', props<{ error: Error | any }>());
  //#endregion FIND_ALL_PRODUCTS

  //#region DELETE_PRODUCT
  public static DELETE_PRODUCT_TYPE = createAction('@tecsales/delete-product', props<{ productId: string, pageSize: number, pageIndex: number }>());
  public static DELETE_PRODUCT_SUCCESS = createAction('@tecsales/delete-product-success');
  public static DELETE_PRODUCT_FAILURE = createAction('@tecsales/delete-product-failure', props<{ error: Error | any }>());
  //#endregion DELETE_PRODUCT

}
