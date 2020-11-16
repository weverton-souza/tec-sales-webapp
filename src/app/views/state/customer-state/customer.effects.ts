import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Customer } from '@views/model/customer.model';
import { CustomerService } from '@views/services/customer.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CustomerActionType } from './customer.action';

@Injectable()
export class CustomerEffects {
  constructor(private actions$: Actions, private customerService: CustomerService) { }

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActionType.CREATE_CUSTOMER_TYPE),
      switchMap(({ customer }) => {
        return this.customerService.save(customer).pipe(
          map((res: Customer) => CustomerActionType.CREATE_CUSTOMER_SUCCESS({ payload: res })),
          catchError((error) => {
            return of(CustomerActionType.CREATE_CUSTOMER_FAILURE({ error }))
          })
        )
      })
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActionType.UPDATE_CUSTOMER_TYPE),
      switchMap(({ customer }) =>
        this.customerService.save(customer).pipe(
          map((res: Customer) => CustomerActionType.UPDATE_CUSTOMER_SUCCESS({ payload: { id: res.id, changes: res } })),
          catchError((error) => of(CustomerActionType.UPDATE_CUSTOMER_FAILURE({ error })))
        )
      )
    )
  );

  findById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActionType.FIND_CUSTOMER_BY_ID_TYPE),
      switchMap(({ customerId }) =>
        this.customerService.findById(customerId).pipe(
          map((customer: Customer) => CustomerActionType.FIND_CUSTOMER_BY_ID_SUCCESS({ payload: customer })),
          catchError((error) => of(CustomerActionType.FIND_CUSTOMER_BY_ID_FAILURE({ error })))
        )
      )
    )
  );

  findAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActionType.FIND_ALL_CUSTOMERS_TYPE),
        switchMap(() =>
          this.customerService.findAll().pipe(
            map((res: any) =>  CustomerActionType.FIND_ALL_CUSTOMERS_SUCCESS({ payload: res }),
            catchError((error) => of(CustomerActionType.FIND_ALL_CUSTOMERS_FAILURE({ error })))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActionType.DELETE_CUSTOMER_TYPE),
      switchMap(({ customerId }) =>
        this.customerService.delete(customerId).pipe(
          map(() => CustomerActionType.DELETE_CUSTOMER_SUCCESS()),
          catchError((error) => of(CustomerActionType.DELETE_CUSTOMER_FAILURE({ error })))
        )
      )
    )
  );

}
