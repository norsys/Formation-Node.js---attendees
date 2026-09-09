export function getDisplayCity({address: {city} = {}}, fallbackValue) {
    console.log(city)
    if(city)
         return city
    else
        return fallbackValue

}