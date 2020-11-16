import { createFeatureSelector, createSelector } from '@ngrx/store';
import { categoryAdapter, CategoryState } from './category.state';


export const categoryState = createFeatureSelector<CategoryState>('CATEGORY_STATE');

const { selectAll } = categoryAdapter.getSelectors(categoryState)

export const getAllCategories = createSelector(selectAll, allCategories =>  Object.values(allCategories)) 

export const hasError = createSelector(categoryState, (state: CategoryState): any => state.error);

export const isLoading = createSelector(categoryState, (state: CategoryState): boolean => state.load.isLoading);
