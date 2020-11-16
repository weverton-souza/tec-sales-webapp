import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from '@views/model/product.model';

export const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (payload) => payload.id,
});

export interface ProductState extends EntityState<Product> {
  load: { isLoading: boolean };
  error: { isTrusted: boolean };
  selectId: string,
}

export const initialProductState: ProductState = productAdapter.getInitialState({
  load: { isLoading: false },
  error: { isTrusted: false },
  selectId: null,
});
