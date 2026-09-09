export const renameCityShallow = (source, newCity) => {
  const copy = {...source};
  copy.address.city = newCity;
  return copy;
}