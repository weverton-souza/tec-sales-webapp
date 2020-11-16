import { BaseModel } from '@shared/interfaces/shared.interface';

export interface Category extends BaseModel {
    name: string;
    status: Boolean;
}
