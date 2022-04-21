/** Return parsed number given a number string. 
 * If the given string cannot be parsed
 * into a number, null is returned.
 * 
 * @param {string} num number string
 * @returns {number | null} number being parsed into.
 */
export const parseNumberHelper = (num) => {
    if (Number.isNaN(parseFloat(num))) return null;
    return parseFloat(num);
}