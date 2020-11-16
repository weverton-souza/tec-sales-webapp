import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '@shared/services/base.service';
import { Product } from '@views/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseResourceService<Product> {
  constructor(injector: Injector) { 
    super(injector, "products");
  }
}