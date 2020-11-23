import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '@shared/services/base.service';
import { Product } from '@views/model/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseResourceService<Product> {
  constructor(injector: Injector) { 
    super(injector, "products");
  }

  public findByCode(code: string): Observable<Product> {
    return this.http.get<Product>(`${this.requestPath}/find-by-code/${code}`);
  }
}