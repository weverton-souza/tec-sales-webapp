import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { IPageResponse } from '@shared/interfaces';
import { Order } from '@views/model/order.model';

export class OrderActionType {
  //#region CREATE_ORDER
  public static CREATE_ORDER_TYPE = createAction('@tecsales/create-order', props<{ order: Order }>());
  public static CREATE_ORDER_SUCCESS = createAction('@tecsales/create-order-success', props<{ payload: Order }>());
  public static CREATE_ORDER_FAILURE = createAction('@tecsales/create-order-failure', props<{ error: Error | any }>());
  //#endregion CREATE_ORDER

  //#region UPDATE_ORDER
  public static UPDATE_ORDER_TYPE = createAction('@tecsales/update-order', props<{ order: Order }>());
  public static UPDATE_ORDER_SUCCESS = createAction('@tecsales/update-order-success', props<{ payload: Update<Order> }>());
  public static UPDATE_ORDER_FAILURE = createAction('@tecsales/update-order-failure', props<{ error: Error | any }>());
  //#endregion UPDATE_ORDER

  //#region FIND_ORDER_BY_ID
  public static FIND_ORDER_BY_ID_TYPE = createAction('@tecsales/find-order-by-id', props<{ orderId: string }>());
  public static FIND_ORDER_BY_ID_SUCCESS = createAction('@tecsales/find-order-by-id-success', props<{ payload: Order }>());
  public static FIND_ORDER_BY_ID_FAILURE = createAction('@tecsales/find-order-by-id-failure', props<{ error: Error | any }>());
  //#endregion FIND_ORDER_BY_ID

  //#region FIND_ALL_ORDERS
  public static FIND_ALL_ORDERS_TYPE = createAction('@tecsales/find-all-orders', props<{ pageSize: number, pageIndex: number }>());
  public static FIND_ALL_ORDERS_SUCCESS = createAction('@tecsales/find-all-orders-success', props<{ payload: IPageResponse<Order> }>());
  public static FIND_ALL_ORDERS_FAILURE = createAction('@tecsales/find-all-orders-failure', props<{ error: Error | any }>());
  //#endregion FIND_ALL_ORDERS

  //#region DELETE_ORDER
  public static DELETE_ORDER_TYPE = createAction('@tecsales/delete-order', props<{ orderId: string }>());
  public static DELETE_ORDER_SUCCESS = createAction('@tecsales/delete-order-success');
  public static DELETE_ORDER_FAILURE = createAction('@tecsales/delete-order-failure', props<{ error: Error | any }>());
  //#endregion DELETE_ORDER

}
