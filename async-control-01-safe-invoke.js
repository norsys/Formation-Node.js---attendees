// export const safeInvoke = async (f) => Promise.resolve(await f())

export const safeInvoke = (f) => Promise.resolve().then(f)
