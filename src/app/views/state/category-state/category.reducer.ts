import { Action, createReducer, on } from '@ngrx/store';
import { CategoryActionType } from './category.action';
import { categoryAdapter, CategoryState, initialCategoryState } from './category.state';

const featureReducer = createReducer(
  initialCategoryState,

  on(CategoryActionType.CREATE_CATEGORY_TYPE, (state) => {
    return { ...state, load: { isLoading: true } };
  }),

  on(CategoryActionType.CREATE_CATEGORY_SUCCESS, (state, { payload }) =>
    categoryAdapter.addOne(payload, { ...state, load: { isLoading: false }, selectId: payload.id })
  ),

  on(CategoryActionType.CREATE_CATEGORY_FAILURE, (state, { error }) => {
    return { ...state, error, load: { isLoading: false } };
  }),

  on(CategoryActionType.FIND_CATEGORY_BY_ID_TYPE, (state) => {
    return { ...state, load: { isLoading: true } };
  }),

  on(CategoryActionType.FIND_CATEGORY_BY_ID_SUCCESS, (state, { payload }) =>
    categoryAdapter.addOne(payload, { ...state, load: { isLoading: false }, selectId: payload.id })
  ),

  on(CategoryActionType.FIND_CATEGORY_BY_ID_FAILURE, (state, { error }) => {
    return { ...state, error, load: { isLoading: false } };
  }),

  on(CategoryActionType.FIND_ALL_CATEGORIES_TYPE, (state) => {
    return { ...state, load: { isLoading: true } };
  }),

  on(CategoryActionType.FIND_ALL_CATEGORIES_SUCCESS, (state, { payload }) =>
    categoryAdapter.setAll(payload, { ...state, load: { isLoading: false } })
  ),

  on(CategoryActionType.FIND_ALL_CATEGORIES_FAILURE, (state, { error }) => {
    return { ...state, error, load: { isLoading: false } };
  })
);

export function categoryReducer(state: CategoryState | undefined, action: Action) {
  return featureReducer(state, action);
}
