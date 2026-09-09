export const renameCitySafe = (source, newCity) => ({ ...source, address:{city : newCity}})
