export function getDisplayCity({address: {city} = {}}, fallbackValue) {
    return city ?? fallbackValue;
}