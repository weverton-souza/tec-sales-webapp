import { Component, Injector } from '@angular/core';
import { AbstractComponent } from '@shared/abstracts/shared.abstract';
import { Product } from '@views/model/product.model';
import { ProductActionType } from '@views/state/product-state/product.action';
import { getAllProducts } from '@views/state/product-state/product.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent extends AbstractComponent {
  public product$: Observable<Product>;
  public products$: Observable<Product[]>;
  
  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInitExtend(): void {
    this.findAll();
  }

  findAll() {
    this.store.dispatch(ProductActionType.FIND_ALL_PRODUCTS_TYPE())
    this.products$ = this.store.select(getAllProducts)
    this.store.select(getAllProducts).subscribe(console.log)
  }

  public edit(product: Product): void {
    this.storage.set(product.id, product).subscribe(() => {});
  }

  public delete(product: Product): void {
    this.store.dispatch(ProductActionType.DELETE_PRODUCT_TYPE({ productId: product.id }))
  }

}
