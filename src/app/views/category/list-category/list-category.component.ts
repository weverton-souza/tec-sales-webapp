import { Component, Injector } from '@angular/core';
import { AbstractComponent } from '@shared/abstracts/shared.abstract';
import { Category } from '@views/model/category.model';
import { CategoryActionType } from '@views/state/category-state/category.action';
import { getAllCategories, getCategoryPageData } from '@views/state/category-state/category.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent extends AbstractComponent {
  public displayedColumns: string[] = ['name', 'status', 'action'];
  public getCategoryPageData$: Observable<any>;
  public category$: Observable<Category>;
  public categories$: Observable<Category[]>;

  public pageSize: number = 5  ;
  public pageIndex: number = 0;

  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInitExtend(): void {
    this.findAll(5, 0);
  }

  pageSizeOptions(event: any) {
    const { previousPageIndex, pageIndex, pageSize, length } = event;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    this.store.dispatch(CategoryActionType.FIND_ALL_CATEGORIES_TYPE({ pageSize, pageIndex }));
  }

  findAll(pageSize?: number, pageIndex?: number,  sort?: string) {
    pageSize  = pageSize ? pageSize : this.pageSize;
    pageIndex  = pageIndex ? pageIndex : this.pageIndex;

    this.store.dispatch(CategoryActionType.FIND_ALL_CATEGORIES_TYPE({ pageSize, pageIndex }))
    this.categories$ = this.store.select(getAllCategories);
    this.getCategoryPageData$ = this.store.select(getCategoryPageData);
    this.getCategoryPageData$.subscribe(data => { 
      this.pageSize = data?.numberOfElements;
      this.pageIndex = data?.pageable?.pageNumber;
    });
  }

  public edit(category: Category): void {
    this.storage.set(category.id, category).subscribe(() => {});
  }

  public delete(category: Category): void {
    let categoryToUpdate: Category = Object.assign({}, category);
    categoryToUpdate.status = !categoryToUpdate.status
    this.store.dispatch(CategoryActionType.UPDATE_CATEGORY_TYPE({ category: categoryToUpdate } ));
  }

}
