// - //@ts-ignore // Для того чтоб отключить проверку ts
import {toJson} from 'really-relaxed-json'
const rjson = '[ one two three {foo:bar} ]'
const json = toJson(rjson)
console.log(json)