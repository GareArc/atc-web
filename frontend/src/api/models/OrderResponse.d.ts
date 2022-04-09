import { IBasicInfo } from "../../../../models/Order";

export declare interface IItemResponse {
    title: string;
    type: 'Individual' | 'Shared' | 'All';
    shareType?: 'WithT1' | 'WithT2' | 'T1T2';
    target: 'Gareth' | 'Ethan' | 'Charlie';
    price: number;
    quantity: number;
    isTaxed: boolean;
    typeDesc: string;
    shareTypeDesc: string;
}

export declare interface IOrderResponse {
    date: Date;
    basicInfo: IBasicInfo;
    finished: boolean;
    items: IItemResponse[];
    target1Total: number;
    target2Total: number;
}