/**
 * 
 * @param {number[]} toSum
 * @returns {number}
 */
export function sum(toSum) {
  return toSum.reduce(add, 0);
}
/**
 * 
 * @param  {...number} args 
 * @returns {number}
 */
export function sum2(...args) {
  return args.reduce(add, 0);
}

/**
 * 
 * @param {number} accumulator 
 * @param {number} currentValue 
 * @returns {number}
 */
function add(accumulator, currentValue) {
  return accumulator + currentValue;
}