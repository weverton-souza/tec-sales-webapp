import { BaseModel } from '@shared/interfaces/shared.interface';
import { Category } from './category.model';

export interface Product extends BaseModel {
    name: string;
    price: number;
    categories: Category[];
}
