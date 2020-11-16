import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Category } from '@views/model/category.model';

export const categoryAdapter: EntityAdapter<Category> = createEntityAdapter<Category>({
  selectId: (payload) => payload.id,
});

export interface CategoryState extends EntityState<Category> {
  load: { isLoading: boolean };
  error: { isTrusted: boolean };
  selectId: string,
}

export const initialCategoryState: CategoryState = categoryAdapter.getInitialState({
  load: { isLoading: false },
  error: { isTrusted: false },
  selectId: null,
});
