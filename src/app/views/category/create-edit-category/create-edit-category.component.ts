import { Component, Injector } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { AbstractComponent } from '@shared/abstracts/shared.abstract';
import { Category } from '@views/model/category.model';
import { CategoryActionType } from '@views/state/category-state/category.action';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-create-edit-category',
  templateUrl: './create-edit-category.component.html',
  styleUrls: ['./create-edit-category.component.scss']
})
export class CreateEditCategoryComponent extends AbstractComponent {
  public pageTitle: string;
  public currentPath: Array<any>;

  public category$: Observable<any>;
  public categories$: Observable<any[]>;
  public currentAction: string;
  public categoryForm: FormGroup;

  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInitExtend(): void {

    this.categoryForm = this.formBuilder.group({
      "id": null,
      "name": ['', [Validators.required]],
      "status": ['', [Validators.required]]
    });

    this.setPageTitle();
  }

  public save(category: Category){
    this.store.dispatch(CategoryActionType.CREATE_CATEGORY_TYPE({ category }));
  }

  private setPageTitle() {

    if(this.router.url.endsWith('create')) {

      this.pageTitle = 'Nova Categoria';
      this.currentPath = [{ text: 'Category', link:'/category' }, { text: 'Adicionar Categoria' }]
    } else {

      this.storage.get(this.route.snapshot.paramMap.get("categoryId")).subscribe((category: Category) => {
        this.pageTitle = `Categoria: ${category.name}`;

        this.currentPath = [{ text: 'Category', link: `/category/${category.id}` }, { text: 'Atualizar Categoria' }]

        Object.keys(this.categoryForm.controls)
          .map(control => this.categoryForm.controls[control].setValue(category[control]));
      })
    }
  }
}
