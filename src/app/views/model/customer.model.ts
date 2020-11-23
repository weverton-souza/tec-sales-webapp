import { BaseModel } from '@shared/interfaces/shared.interface';
import { Order } from './order.model';

export interface Customer extends BaseModel {
    code?: string;
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
}
