import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Order } from '@views/model/order.model';
import { OrderService } from '@views/services/order.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrderActionType } from './order.action';

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions, private orderService: OrderService) { }

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActionType.CREATE_ORDER_TYPE),
      switchMap(({ order }) => {
        return this.orderService.save(order).pipe(
          map((res: Order) => OrderActionType.CREATE_ORDER_SUCCESS({ payload: res })),
          catchError((error) => {
            return of(OrderActionType.CREATE_ORDER_FAILURE({ error }))
          })
        )
      })
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActionType.UPDATE_ORDER_TYPE),
      switchMap(({ order }) =>
        this.orderService.save(order).pipe(
          map((res: Order) => OrderActionType.UPDATE_ORDER_SUCCESS({ payload: { id: res.id, changes: res } })),
          catchError((error) => of(OrderActionType.UPDATE_ORDER_FAILURE({ error })))
        )
      )
    )
  );

  findById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActionType.FIND_ORDER_BY_ID_TYPE),
      switchMap(({ orderId }) =>
        this.orderService.findById(orderId).pipe(
          map((order: Order) => OrderActionType.FIND_ORDER_BY_ID_SUCCESS({ payload: order })),
          catchError((error) => of(OrderActionType.FIND_ORDER_BY_ID_FAILURE({ error })))
        )
      )
    )
  );

  findAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActionType.FIND_ALL_ORDERS_TYPE),
        switchMap(({ pageSize, pageIndex }) =>
          this.orderService.findAll(pageSize, pageIndex).pipe(
            map((res: any) =>  OrderActionType.FIND_ALL_ORDERS_SUCCESS({ payload: res }),
            catchError((error) => of(OrderActionType.FIND_ALL_ORDERS_FAILURE({ error })))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActionType.DELETE_ORDER_TYPE),
      switchMap(({ orderId }) =>
        this.orderService.delete(orderId).pipe(
          map(() => OrderActionType.DELETE_ORDER_SUCCESS()),
          catchError((error) => of(OrderActionType.DELETE_ORDER_FAILURE({ error })))
        )
      )
    )
  );

}
