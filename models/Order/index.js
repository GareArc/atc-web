const { mongoose } = require("../../mongoose");

const RatioSchema = new mongoose.Schema({
    target1: {
        type: mongoose.Types.Decimal128,
        default: 0
    },
    target2: {
        type: mongoose.Types.Decimal128,
        default: 0
    },
    self: {
        type: mongoose.Types.Decimal128,
        default: 0
    },
});

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Individual', 'Shared', 'All', 'Ratio'],
        required: true
    },
    shareType: {
        type: String,
        enum: ['WithT1', 'WithT2', 'T1T2'],
        default: 'WithT1'
    },
    target: {
        type: String,
        enum: ['Gareth', 'Ethan', 'Charlie'],
    },
    ratio: {
        type: RatioSchema
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    isTaxed: {
        type: Boolean,
        required: true
    },
});

const BasicInfoSchema = new mongoose.Schema({
    target1: {
        type: String,
        enum: ['Gareth', 'Ethan', 'Charlie'],
        required: true
    },
    target2: {
        type: String,
        enum: ['Gareth', 'Ethan', 'Charlie'],
        required: true
    },
    electric: {
        type: Number,
        required: true
    },
    amz: {
        type: Number,
        required: true
    },
    internet: {
        type: Number,
        required: true
    },
    other: {
        type: Number,
        required: true
    }
}, { _id : false });

const OrderSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    finished: {
        type: Boolean,
        default: false
    },
    transferT1: {
        type: Boolean,
        default: false
    },
    transferT2: {
        type: Boolean,
        default: false
    },
    basicInfo: {
        type: BasicInfoSchema,
        required: true,
    },
    items: [ItemSchema]
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = {
    RatioSchema,
    BasicInfoSchema,
    ItemSchema,
    OrderSchema,
    Order
}