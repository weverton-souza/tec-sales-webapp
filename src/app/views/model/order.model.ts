import { BaseModel } from '@shared/interfaces/shared.interface';
import { Category } from './category.model';
import { Customer } from './customer.model';
import { Product } from './product.model';

export interface OrderItemPK {
    product: Product,
    category: Category
}

export interface OrderItem {
    id: OrderItemPK,
    discount: number;
    amount: number;
    price: number;
}

export interface Order extends BaseModel {
    date: String,
    customer: Customer
    orders: Array<OrderItem>
}
