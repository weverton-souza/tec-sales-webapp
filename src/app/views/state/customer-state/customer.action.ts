import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Customer } from '@views/model/customer.model';

export class CustomerActionType {
  //#region CREATE_CUSTOMER
  public static CREATE_CUSTOMER_TYPE = createAction('@tecsales/create-customer', props<{ customer: Customer }>());
  public static CREATE_CUSTOMER_SUCCESS = createAction('@tecsales/create-customer-success', props<{ payload: Customer }>());
  public static CREATE_CUSTOMER_FAILURE = createAction('@tecsales/create-customer-failure', props<{ error: Error | any }>());
  //#endregion CREATE_CUSTOMER

  //#region UPDATE_CUSTOMER
  public static UPDATE_CUSTOMER_TYPE = createAction('@tecsales/update-customer', props<{ customer: Customer }>());
  public static UPDATE_CUSTOMER_SUCCESS = createAction('@tecsales/update-customer-success', props<{ payload: Update<Customer> }>());
  public static UPDATE_CUSTOMER_FAILURE = createAction('@tecsales/update-customer-failure', props<{ error: Error | any }>());
  //#endregion UPDATE_CUSTOMER

  //#region FIND_CUSTOMER_BY_ID
  public static FIND_CUSTOMER_BY_ID_TYPE = createAction('@tecsales/find-customer-by-id', props<{ customerId: string }>());
  public static FIND_CUSTOMER_BY_ID_SUCCESS = createAction('@tecsales/find-customer-by-id-success', props<{ payload: Customer }>());
  public static FIND_CUSTOMER_BY_ID_FAILURE = createAction('@tecsales/find-customer-by-id-failure', props<{ error: Error | any }>());
  //#endregion FIND_CUSTOMER_BY_ID

  //#region FIND_CUSTOMER_BY_ID
  public static FIND_CUSTOMER_BY_CODE_TYPE = createAction('@tecsales/find-customer-by-code', props<{ customerCode: string }>());
  public static FIND_CUSTOMER_BY_CODE_SUCCESS = createAction('@tecsales/find-customer-by-code-success', props<{ payload: Customer }>());
  public static FIND_CUSTOMER_BY_CODE_FAILURE = createAction('@tecsales/find-customer-by-code-failure', props<{ error: Error | any }>());
  //#endregion FIND_CUSTOMER_BY_ID

  //#region FIND_ALL_CUSTOMERS
  public static FIND_ALL_CUSTOMERS_TYPE = createAction('@tecsales/find-all-customers');
  public static FIND_ALL_CUSTOMERS_SUCCESS = createAction('@tecsales/find-all-customers-success', props<{ payload: any }>());
  public static FIND_ALL_CUSTOMERS_FAILURE = createAction('@tecsales/find-all-customers-failure', props<{ error: Error | any }>());
  //#endregion FIND_ALL_CUSTOMERS

  //#region DELETE_CUSTOMER
  public static DELETE_CUSTOMER_TYPE = createAction('@tecsales/delete-customer', props<{ customerId: string }>());
  public static DELETE_CUSTOMER_SUCCESS = createAction('@tecsales/delete-customer-success');
  public static DELETE_CUSTOMER_FAILURE = createAction('@tecsales/delete-customer-failure', props<{ error: Error | any }>());
  //#endregion DELETE_CUSTOMER

}
