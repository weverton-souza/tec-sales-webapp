import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Product } from '@views/model/product.model';
import { ProductService } from '@views/services/product.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductActionType } from './product.action';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productService: ProductService) {}

  eraseSelectedId$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActionType.ERASE_SELECTED_ID_TYPE),
    switchMap(() => new BehaviorSubject<any>({}).asObservable().pipe(
      map(() => ProductActionType.ERASE_SELECTED_ID_SUCCESS())
    ))
  ));

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActionType.CREATE_PRODUCT_TYPE),
      switchMap(({ product }) => {
        return this.productService.save(product).pipe(
          map((res: Product) => ProductActionType.CREATE_PRODUCT_SUCCESS({ payload: res })),
          catchError((error) => {
            return of(ProductActionType.CREATE_PRODUCT_FAILURE({ error }))
          })
        )
      })
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActionType.UPDATE_PRODUCT_TYPE),
      switchMap(({ product }) =>
        this.productService.save(product).pipe(
          map((res: Product) => ProductActionType.UPDATE_PRODUCT_SUCCESS({ payload: { id: res.id, changes: res } })),
          catchError((error) => of(ProductActionType.UPDATE_PRODUCT_FAILURE({ error })))
        )
      )
    )
  );

  findById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActionType.FIND_PRODUCT_BY_ID_TYPE),
      switchMap(({ productId }) =>
        this.productService.findById(productId).pipe(
          map((product: Product) => ProductActionType.FIND_PRODUCT_BY_ID_SUCCESS({ payload: product })),
          catchError((error) => of(ProductActionType.FIND_PRODUCT_BY_ID_FAILURE({ error })))
        )
      )
    )
  );

  findByCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActionType.FIND_PRODUCT_BY_CODE_TYPE),
      switchMap(({ code }) =>
        this.productService.findByCode(code).pipe(
          map((product: Product) => ProductActionType.FIND_PRODUCT_BY_CODE_SUCCESS({ payload: product })),
          catchError((error) => of(ProductActionType.FIND_PRODUCT_BY_CODE_FAILURE({ error })))
        )
      )
    )
  );

  findAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActionType.FIND_ALL_PRODUCTS_TYPE),
        switchMap(({pageSize, pageIndex, sort}) =>
          this.productService.findAll(pageSize, pageIndex, sort).pipe(
            map((res: any) =>  ProductActionType.FIND_ALL_PRODUCTS_SUCCESS({ payload: res }),
            catchError((error) => of(ProductActionType.FIND_ALL_PRODUCTS_FAILURE({ error })))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActionType.DELETE_PRODUCT_TYPE),
      switchMap(({ productId, pageIndex, pageSize }) =>
        this.productService.delete(productId).pipe(
          map(() => { 
            this.productService.findAll(pageSize, pageIndex).pipe(
              map((res: any) =>  ProductActionType.FIND_ALL_PRODUCTS_SUCCESS({ payload: res }),
              catchError((error) => of(ProductActionType.FIND_ALL_PRODUCTS_FAILURE({ error })))
            ));

            return ProductActionType.DELETE_PRODUCT_SUCCESS();
          }),
          catchError((error) => of(ProductActionType.DELETE_PRODUCT_FAILURE({ error })))
        )
      )
    )
  );

}
