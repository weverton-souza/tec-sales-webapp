import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Category } from '@views/model/category.model';
import { CategoryService } from '@views/services/category.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CategoryActionType } from './category.action';

@Injectable()
export class CategoryEffects {
  constructor(private actions$: Actions, private categoryService: CategoryService) { }

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActionType.CREATE_CATEGORY_TYPE),
      switchMap(({ category }) => {
        return this.categoryService.save(category).pipe(
          map((res: Category) => CategoryActionType.CREATE_CATEGORY_SUCCESS({ payload: res })),
          catchError((error) => {
            return of(CategoryActionType.CREATE_CATEGORY_FAILURE({ error }))
          })
        )
      })
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActionType.UPDATE_CATEGORY_TYPE),
      switchMap(({ category }) =>
        this.categoryService.save(category).pipe(
          map((res: Category) => CategoryActionType.UPDATE_CATEGORY_SUCCESS({ payload: { id: res.id, changes: res } })),
          catchError((error) => of(CategoryActionType.UPDATE_CATEGORY_FAILURE({ error })))
        )
      )
    )
  );

  findById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActionType.FIND_CATEGORY_BY_ID_TYPE),
      switchMap(({ categoryId }) =>
        this.categoryService.findById(categoryId).pipe(
          map((category: Category) => CategoryActionType.FIND_CATEGORY_BY_ID_SUCCESS({ payload: category })),
          catchError((error) => of(CategoryActionType.FIND_CATEGORY_BY_ID_FAILURE({ error })))
        )
      )
    )
  );

  findAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActionType.FIND_ALL_CATEGORIES_TYPE),
        switchMap(({ pageSize, pageIndex }) =>
          this.categoryService.findAll(pageSize, pageIndex).pipe(
            map((res: any) =>  CategoryActionType.FIND_ALL_CATEGORIES_SUCCESS({ payload: res }),
            catchError((error) => of(CategoryActionType.FIND_ALL_CATEGORIES_FAILURE({ error })))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActionType.DELETE_CATEGORY_TYPE),
      switchMap(({ categoryId }) =>
        this.categoryService.delete(categoryId).pipe(
          map(() => CategoryActionType.DELETE_CATEGORY_SUCCESS()),
          catchError((error) => of(CategoryActionType.DELETE_CATEGORY_FAILURE({ error })))
        )
      )
    )
  );

}
