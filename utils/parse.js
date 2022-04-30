const { mongoose } = require("../mongoose");

/** Parse Decimal128 to float.
 * If the given string cannot be parsed
 * into a number, null is returned.
 * 
 * @param {mongoose.Types.Decimal128} decimal 
 */
const parseDecimalHelper = (decimal) => {
    const result = parseFloat(decimal.toString());
    if (Number.isNaN(result)) return null;
    return result;
}

module.exports = {
    parseDecimalHelper
}