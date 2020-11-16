import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEditCategoryComponent } from './category/create-edit-category/create-edit-category.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { CreateUpdateCustomerComponent } from './customer/create-update-customer/create-update-customer.component';
import { ListCustomerComponent } from './customer/list-customer/list-customer.component';
import { CreateEditProductComponent } from './product/create-edit-product/create-edit-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';

const routes: Routes = [
  {
    path: 'category',
    children: [
      {
        path: '',
        component: ListCategoryComponent
      },
      {
        path: 'create',
        component: CreateEditCategoryComponent
      },
      {
        path: 'update/:categoryId',
        component: CreateEditCategoryComponent
      }
    ]
  },
  {
    path: 'product',
    children: [
      {
        path: '',
        component: ListProductComponent
      },
      {
        path: 'create',
        component: CreateEditProductComponent
      },
      {
        path: 'update/:productId',
        component: CreateEditProductComponent
      }
    ]
  },
  {
    path: 'customer',
    children: [
      {
        path: '',
        component: ListCustomerComponent
      },
      {
        path: 'create',
        component: CreateUpdateCustomerComponent
      },
      {
        path: 'update/:customerId',
        component: CreateUpdateCustomerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
