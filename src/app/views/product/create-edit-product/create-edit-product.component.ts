import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { AbstractComponent } from '@shared/abstracts/shared.abstract';
import { Category } from '@views/model/category.model';
import { Product } from '@views/model/product.model';
import { CategoryActionType } from '@views/state/category-state/category.action';
import { getAllCategories } from '@views/state/category-state/category.selector';
import { ProductActionType } from '@views/state/product-state/product.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.scss']
})
export class CreateEditProductComponent extends AbstractComponent {
  public pageTitle: string;
  public currentPath: Array<any>;

  public product$: Observable<any>;
  public products$: Observable<any[]>;
  public currentAction: string;
  public productForm: FormGroup;
  public categories$: Observable<Category[]>;
  
  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInitExtend(): void {
    this.productForm = this.formBuilder.group({
      "id": null,
      "name": ['', [Validators.required]],
      "price": ['', [Validators.required]],
      "category": ['', [Validators.required]]
    });

    this.setPageTitle();
    this.findAllCategories();
  }

  public findAllCategories(): void {
    this.store.dispatch(CategoryActionType.FIND_ALL_CATEGORIES_TYPE())
    this.categories$ = this.store.select(getAllCategories)
  }

  public save(product: Product) {
    this.store.dispatch(ProductActionType.CREATE_PRODUCT_TYPE({ product }));
  }

  findById(product: Product): void{
    this.storage.set(product.id, product).subscribe(() => {});
  }

  private setPageTitle() {

    if(this.router.url.endsWith('create')) {

      this.pageTitle = 'Novo produto';
      this.currentPath = [{ text: 'Produto', link:'/product' }, { text: 'Adicionar Produto' }]
    } else {

      this.storage.get(this.route.snapshot.paramMap.get("productId")).subscribe((product: Product) => {
        this.pageTitle = `Produto: ${product.name}`;

        this.currentPath = [{ text: 'Produto', link: `/product/${product.id}` }, { text: 'Atualizar Produto' }]

        Object.keys(this.productForm.controls)
          .map(control => this.productForm.controls[control].setValue(product[control]));
      })
    }
  }

}
