const router = require("express").Router();
const { ErrorResponse } = require("../../models/ErrorResponse");
const { Order } = require("../../models/Order");
const { uuidValidator } = require("../../utils/routerUtils");
const { getFilledObject, sendNotificationMail, sendFinishConfirmMail } = require("./manager");


const pathName = (path) => `/order${path}`;

/** Get all orders stored in database.
 * 
 */
router.get(pathName("/all"), async (req, res) => {
    try {
        const results = await Order.find().sort('-date');
        const ret = results.map(order => getFilledObject(order.toObject()));
        res.json(ret);
    } catch (e) {
        res.status(500).json(new ErrorResponse(0, "Database error", e));
    }
});

/** Post a new order. 
 * Expected body: OrderSchema
 */
router.post(pathName("/"), async (req, res) => {
    if (req.body) {
        try {
            if (!req.body.date) req.body.date = new Date();
            if (req.body.id) delete req.body.id;
            const order = new Order(req.body);
            const ret = await order.save();
            sendNotificationMail();
            res.json(ret);
        } catch (e) {
            res.status(500).json(new ErrorResponse(0, "Database error", e));
        }
    }
    else {
        res.status(400).json(new ErrorResponse(2, "Request body required."));
    }
});

/** Delete an order by uuid.
 * 
 */
router.delete(pathName("/:uuid"), uuidValidator, async (req, res) => {
    try {
        const order = await Order.findById(req.params.uuid);
        if (!order) {
            res.status(404).json(new ErrorResponse(-1, "Order not found"));
            return;
        }
        await order.delete();
        res.json("success");
    } catch (e) {
        res.status(500).json(new ErrorResponse(0, "Database error", e));
    }
});

/** Mark an order as finished and delete it in database.
 * (currently it is the same as delete, but may consider keeping these orders later)
 */
router.patch(pathName("/finish/:uuid"), uuidValidator, async (req, res) => {
    if (req.body) {
        try {
            const order = await Order.findById(req.params.uuid);
            if (!order) {
                res.status(404).json(new ErrorResponse(-1, "Order not found"));
                return;
            }
            order.finished = true;
            await order.save();
            sendFinishConfirmMail(order._id, order.date.toString(), order.basicInfo.target1, order.basicInfo.target2);
            res.json("success");
        } catch (e) {
            res.status(500).json(new ErrorResponse(0, "Database error", e));
        }
    } else {
        res.status(400).json(new ErrorResponse(2, "Request body required."));
    }
});

/** Report one target that has done the bill transfer.
 * Expected request body:
 * {
 *      target: 1 | 2
 * }
 */
router.patch(pathName("/trans/:uuid"), uuidValidator, async (req, res) => {
    if (req.body) {
        const order = await Order.findById(req.params.uuid);
        if (req.body.target === 1) order.transferT1 = true;
        else order.transferT2 = true;
    
        order.save()
            .then(() => res.json("success"))
            .catch(e => res.status(500).json(new ErrorResponse(0, "Database error", e)));
        return;
    }
    else res.status(400).json(new ErrorResponse(2, "Request body required."));
});

module.exports = { router };