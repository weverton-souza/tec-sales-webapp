import { BaseModel } from '@shared/interfaces/shared.interface';
import { Order } from './order.model';

export interface Customer extends BaseModel {
    name: string;
    email: string;
    password: string;
    phone: string;
    orders: Array<Order>;
}
