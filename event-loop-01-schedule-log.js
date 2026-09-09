/**
 * 
 * @param {(msg: string) => void}
 */
export function scheduleLog(msgFunction) {
  msgFunction("sync")
  Promise.resolve("microtask").then(msgFunction)
  setTimeout(() => {msgFunction("macrotask")})
}