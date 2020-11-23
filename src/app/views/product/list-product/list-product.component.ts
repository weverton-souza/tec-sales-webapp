import { Component, Injector, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AbstractComponent } from '@shared/abstracts/shared.abstract';
import { Product } from '@views/model/product.model';
import { ProductActionType } from '@views/state/product-state/product.action';
import { getAllProducts, getPageData } from '@views/state/product-state/product.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent extends AbstractComponent {
  displayedColumns: string[] = ['name', 'price', 'category', 'action'];

  resultsLength = 0;
  public pageIndex = 0;
  public pageSize = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  public product$: Observable<Product>;
  public pageData$: Observable<any>;
  public products$: Observable<Product[]>;
  
  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInitExtend(): void {
    this.findAll(5, 0);
  }

  pageSizeOptions(event: any) {
    const { pageIndex, pageSize } = event;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    this.store.dispatch(ProductActionType.FIND_ALL_PRODUCTS_TYPE({ pageSize, pageIndex }));
  }

  findAll(pageSize?: number, pageIndex?: number,  sort?: string) {
    pageSize  = pageSize ? pageSize : this.pageSize;
    pageIndex  = pageIndex ? pageIndex : this.pageIndex;

    this.store.dispatch(ProductActionType.FIND_ALL_PRODUCTS_TYPE({ pageSize, pageIndex, sort }));
    this.products$ = this.store.select(getAllProducts);
    this.pageData$ = this.store.select(getPageData);
  }

  public edit(product: Product): void {
    this.storage.set(product.id, product).subscribe(() => {});
  }

  public delete(product: Product): void {
    this.store.dispatch(ProductActionType.DELETE_PRODUCT_TYPE({ productId: product.id, pageSize: this.pageSize, pageIndex: this.pageIndex }));
  }

}
