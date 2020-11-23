import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEditCategoryComponent } from './category/create-edit-category/create-edit-category.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { CreateUpdateCustomerComponent } from './customer/create-update-customer/create-update-customer.component';
import { ListCustomerComponent } from './customer/list-customer/list-customer.component';
import { HomeComponent } from './home/home.component';
import { CreateUpdateOrderComponent } from './order/create-update-order/create-update-order.component';
import { ListOrderComponent } from './order/list-order/list-order.component';
import { CreateEditProductComponent } from './product/create-edit-product/create-edit-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
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
  },
  {
    path: 'order',
    children: [
      {
        path: '',
        component: ListOrderComponent
      },
      {
        path: 'create',
        component: CreateUpdateOrderComponent
      },
      {
        path: 'update/:orderId',
        component: CreateUpdateOrderComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
