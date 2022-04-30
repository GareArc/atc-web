/** Return parsed number given a number string. 
 * If the given string cannot be parsed
 * into a number, null is returned.
 * 
 * @param {string} num number string
 * @returns {number | null} number being parsed into.
 */
export const parseNumberHelper = (num) => {
    const result = parseFloat(num);
    if (Number.isNaN(result)) return null;
    return result;
}

/** Parse Decimal128 to float.
 * If the given string cannot be parsed
 * into a number, null is returned.
 * 
 * @param {mongoose.Types.Decimal128} decimal 
 */
export const parseDecimalHelper = (decimal) => {
    const result = parseFloat(decimal.$numberDecimal);
    if (Number.isNaN(result)) return null;
    return result;
}