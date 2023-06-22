import { a, MyType2 } from './module/app2'
// import run , { a } from './module/app2'
import run from './module/app2' // default import
import * as all from './module/app2' // берем все export + default
import {Test as CL} from './module/app2' // берем Test export и переименовываем в CL
import {type MyType as MT} from './module/app2' // берем MyType и задаем для транспиляторов что там будет только tpye

run()
new CL();
console.log(a)
console.log(all.a)