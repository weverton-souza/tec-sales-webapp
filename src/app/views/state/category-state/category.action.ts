import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Category } from '@views/model/category.model';

export class CategoryActionType {
  //#region CREATE_CATEGORY
  public static CREATE_CATEGORY_TYPE = createAction('@tecsales/create-category', props<{ category: Category }>());
  public static CREATE_CATEGORY_SUCCESS = createAction('@tecsales/create-category-success', props<{ payload: Category }>());
  public static CREATE_CATEGORY_FAILURE = createAction('@tecsales/create-category-failure', props<{ error: Error | any }>());
  //#endregion CREATE_CATEGORY

  //#region UPDATE_CATEGORY
  public static UPDATE_CATEGORY_TYPE = createAction('@tecsales/update-category', props<{ category: Category }>());
  public static UPDATE_CATEGORY_SUCCESS = createAction('@tecsales/update-category-success', props<{ payload: Update<Category> }>());
  public static UPDATE_CATEGORY_FAILURE = createAction('@tecsales/update-category-failure', props<{ error: Error | any }>());
  //#endregion UPDATE_CATEGORY

  //#region FIND_CATEGORY_BY_ID
  public static FIND_CATEGORY_BY_ID_TYPE = createAction('@tecsales/find-category-by-id', props<{ categoryId: string }>());
  public static FIND_CATEGORY_BY_ID_SUCCESS = createAction('@tecsales/find-category-by-id-success', props<{ payload: Category }>());
  public static FIND_CATEGORY_BY_ID_FAILURE = createAction('@tecsales/find-category-by-id-failure', props<{ error: Error | any }>());
  //#endregion FIND_CATEGORY_BY_ID

  //#region FIND_ALL_CATEGORIES
  public static FIND_ALL_CATEGORIES_TYPE = createAction('@tecsales/find-all-categories');
  public static FIND_ALL_CATEGORIES_SUCCESS = createAction('@tecsales/find-all-categories-success', props<{ payload: any }>());
  public static FIND_ALL_CATEGORIES_FAILURE = createAction('@tecsales/find-all-categories-failure', props<{ error: Error | any }>());
  //#endregion FIND_ALL_CATEGORIES

  //#region DELETE_CATEGORY
  public static DELETE_CATEGORY_TYPE = createAction('@tecsales/delete-category', props<{ categoryId: string }>());
  public static DELETE_CATEGORY_SUCCESS = createAction('@tecsales/delete-category-success');
  public static DELETE_CATEGORY_FAILURE = createAction('@tecsales/delete-category-failure', props<{ error: Error | any }>());
  //#endregion DELETE_CATEGORY

}
