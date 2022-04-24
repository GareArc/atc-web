import { Model, Schema, Document, Decimal128 } from "mongoose";

export declare interface IItem {
    title: string;
    type: 'Individual' | 'Shared' | 'All';
    shareType?: 'WithT1' | 'WithT2' | 'T1T2';
    target: 'Gareth' | 'Ethan' | 'Charlie';
    price: Decimal128;
    quantity: number;
    isTaxed: boolean;
}

export declare interface IBasicInfo {
    target1: 'Gareth' | 'Ethan' | 'Charlie';
    target2: 'Gareth' | 'Ethan' | 'Charlie';
    electric: number;
    amz: number;
    internet: number;
    other: number;
}

export declare interface IOrder {
    date: Date;
    basicInfo: IBasicInfo;
    finished: boolean;
    transferT1: boolean;
    transferT2: boolean;
    items: IItem[]
}
export declare const ItemSchema: Schema<IItem>;
export declare const BasicInfoSchema: Schema<IBasicInfo>;
export declare const Order: Model<IOrder & Document>; 