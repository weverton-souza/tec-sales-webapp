import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '@shared/services/base.service';
import { Category } from '@views/model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category> {
  constructor(injector: Injector) { 
    super(injector, "categories");
  }
}
