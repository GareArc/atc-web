import { get, deleteMethod, post, patch } from "../axios";
const pathName = (path) => `/order${path}`;

/**
 * 
 * @param {import("../../../../models/Order").IOrder} order 
 * @returns {Promise}
 */
export const postOrder = async (order) => {
    order.date = new Date();
    return post(pathName("/"), order);
}

export const getAllOrders = async () => {
    return get(pathName("/all"));
}

export const markAsFinished = async (uuid) => {
    return patch(pathName(`/finish/${uuid}`));
}

/** Mark one's transfer done.
 * 
 * @param {string} uuid 
 * @param {1 | 2} targetCode 
 * @returns 
 */
export const markTransfer = async (uuid, targetCode) => {
    return patch(pathName(`/trans/${uuid}`), { target: targetCode });
}