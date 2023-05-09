import { IItem, IOrder } from "../../../../models/Order";

export declare interface IItemResponse extends IItem {
    typeDesc: string;
    shareTypeDesc: string;
}

export declare interface IOrderResponse extends IOrder {
    items: IItemResponse[];
    target1Total: number;
    target2Total: number;
}