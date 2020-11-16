import { Component, Injector } from '@angular/core';
import { AbstractComponent } from '@shared/abstracts/shared.abstract';
import { Category } from '@views/model/category.model';
import { CategoryActionType } from '@views/state/category-state/category.action';
import { getAllCategories } from '@views/state/category-state/category.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent extends AbstractComponent {
  
  public category$: Observable<Category>;
  public categories$: Observable<Category[]>;
  
  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInitExtend(): void {
    this.findAll();
  }

  findAll() {
    this.store.dispatch(CategoryActionType.FIND_ALL_CATEGORIES_TYPE())
    this.categories$ = this.store.select(getAllCategories)
  }

  public edit(category: Category): void {
    this.storage.set(category.id, category).subscribe(() => {});
  }

  public delete(category: Category): void {
    this.store.dispatch(CategoryActionType.DELETE_CATEGORY_TYPE({ categoryId: category.id }))
  }

}
