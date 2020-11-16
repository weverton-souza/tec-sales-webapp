import { NgModule } from '@angular/core';

import { ViewsRoutingModule } from './views-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { CreateEditCategoryComponent } from './category/create-edit-category/create-edit-category.component';
import { ViewsComponent } from './views.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CreateEditProductComponent } from './product/create-edit-product/create-edit-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { ListCustomerComponent } from './customer/list-customer/list-customer.component';
import { CreateUpdateCustomerComponent } from './customer/create-update-customer/create-update-customer.component';
import { ListOrderComponent } from './order/list-order/list-order.component';
import { CreateUpdateOrderComponent } from './order/create-update-order/create-update-order.component';
import { categoryReducer } from './state/category-state/category.reducer';
import { productReducer } from './state/product-state/product.reducer';
import { ProductEffects } from './state/product-state/product.effects';
import { CategoryEffects } from './state/category-state/category.effects';
import { CustomerEffects } from './state/customer-state/customer.effects';
import { customerReducer } from './state/customer-state/customer.reducer';


@NgModule({
  declarations: [ListCategoryComponent, CreateEditCategoryComponent, ViewsComponent, CreateEditProductComponent, ListProductComponent, ListCustomerComponent, CreateUpdateCustomerComponent, ListOrderComponent, CreateUpdateOrderComponent],
  imports: [
    SharedModule,
    ViewsRoutingModule,
    StoreModule.forFeature('CATEGORY_STATE', categoryReducer),
    StoreModule.forFeature('PRODUCT_STATE', productReducer),
    StoreModule.forFeature('CUSTOMER_STATE', customerReducer),
    EffectsModule.forFeature([CategoryEffects, ProductEffects, CustomerEffects]),
  ]
})
export class ViewsModule { }
