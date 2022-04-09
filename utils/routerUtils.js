const { ErrorResponse } = require("../models/ErrorResponse");
const { mongoose } = require("../mongoose");

const uuidValidator = (req, res, next) => {
    if (req.params.uuid) {
        if (!mongoose.Types.ObjectId.isValid(req.params.uuid)) {
            res.status(400).json(new ErrorResponse(1, "Invalid uuid"));
            return;
        }
    } else {
        res.status(400).json(new ErrorResponse(1, "Please provide uuid"));
        return;
    }
    next();
}


module.exports = {
    uuidValidator
}