import { BaseModel } from '@shared/interfaces/shared.interface';
import { Customer } from './customer.model';


export interface OrderItem {
    discount: number;
    amount: number;
    price: number;
}

export interface Order extends BaseModel {
    date: String,
    customer: Customer
    items: Array<OrderItem>
}
