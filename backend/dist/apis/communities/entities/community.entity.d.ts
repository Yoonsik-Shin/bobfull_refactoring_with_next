import { BaseEntity } from 'typeorm';
export declare class Community extends BaseEntity {
    number: number;
    writer: string;
    title: string;
    contents: string;
}
