const { ItemSchema } = require("../../models/Order");
const { mongoose } = require("../../mongoose");
const { sendEmail } = require('../../utils/mailer');

/** Get filled object.
 * 
 * @param {import("../../models/Order").IOrder} order 
 */
const getFilledObject = (order) => {
    const totals = calculateTotalForTargets(order);
    order.target1Total = totals.target1Total.toFixed(2);
    order.target2Total = totals.target2Total.toFixed(2);

    let temp = [];
    for (let item of order.items) {
        item.price = parseFloat(item.price.toString()).toFixed(2);
        item.typeDesc = item.type === 'Individual' ? '个人' : item.type === 'Shared' ? '双人' : '三人';
        item.shareTypeDesc = getSharedTypeString(item.shareType, order.basicInfo.target1, order.basicInfo.target2);
        temp.push(item);
    }
    order.items = temp;

    return order;
}

const sendNotificationMail = async () => {
    const subject = "ATCWeb 新账单提醒";
    const text = "ATCWeb 收到了新的账单。请访问History页面查看详情。http://www.atcweb.ml";
    const html = "<p>ATCWeb 收到了新的账单。请访问History页面查看详情。http://www.atcweb.ml</p>";
    sendEmail(subject, text, html);
}

const sendFinishConfirmMail = async (uuid, time, target1, target2) => {
    const subject = "ATCWeb 有一个账单被标记为完成。";
    const text = `UUID: ${uuid}\nTime: ${time}\n对象: ${target1}, ${target2}`;
    const html = `<p>UUID: ${uuid}</p><p></p>Time: ${time}<p>对象: ${target1}, ${target2}</p>`;
    sendEmail(subject, text, html);
}

function getSharedTypeString(shareType, target1, target2) {
    if (shareType === 'WithT1') {
        return `账单登记者和${target1}`;
    }
    if (shareType === 'WithT2') {
        return `账单登记者和${target2}`;
    }
    else {
        return `${target1}和${target2}`;
    }
}

/**
 * 
 * @param {import("../../models/Order").IOrder} order 
 */
function calculateTotalForTargets(order) {
    const result = {
        target1Total: 0,
        target2Total: 0
    };
    result.target1Total += (order.basicInfo.amz +
        order.basicInfo.electric +
        order.basicInfo.internet +
        order.basicInfo.other) / 3;
    result.target2Total += (order.basicInfo.amz +
        order.basicInfo.electric +
        order.basicInfo.internet +
        order.basicInfo.other) / 3;
    
    for (let item of order.items) {
        const price = calculateItemPrice(item);
        if (item.type === "All") {
            result.target1Total += price / 3;
            result.target2Total += price / 3;
        }
        else if (item.type === "Shared") {
            if (item.shareType === "T1T2") {
                result.target1Total += price / 2;
                result.target2Total += price / 2;
            }
            else if (item.shareType === "WithT1") {
                result.target1Total += price / 2;
            }
            else {
                result.target2Total += price / 2;
            }
        }
        else {
            if (item.target === order.basicInfo.target1) {
                result.target1Total += price;
            }
            else {
                result.target2Total += price;
            }
        }
    }
    return result;
}

/**
 * 
 * @param {import("../../models/Order").IItem} item 
 */
function calculateItemPrice(item) {
    return item.price * item.quantity * (item.isTaxed ? 1.13 : 1);
}

module.exports = {
    getFilledObject,
    sendNotificationMail,
    sendFinishConfirmMail
}