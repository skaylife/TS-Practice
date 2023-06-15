# Порождающие паттерны в TypeScript

### Начало 14.06.2023 г. - конец **.**.2023 г.

### 4. Уроков суммарно

[Вернуться на главную страницу "TS-Practice"](https://github.com/skaylife/TS-Practice)

## Содержание и быстрое перемещение по темам <a name="start">

[1. Factory Method ](#1)

[2. Singleton ](#2)

[3. Модульность на frontend ](#3)

[4. Import и export ](#4)

[5. Типизация сторонних библиотек ](#5)


## 1. Factory Method <a name="1"></a> 

### Паттерн создание фабрики

Пример с двумя вариантами создания фабрики с опп и с дженериком

```
interface IInsurance {
    id: number;
    status: string;
    setVehicle(vehicle: any): void;
    submit(): Promise<boolean>;
}

class TFInsurance  implements IInsurance{
    id!: number;
    status!: string;
    private vehicle: any;
    setVehicle(vehicle: any): void {
        this.vehicle = vehicle
    }
    async submit(): Promise<boolean> {
        const res = await fetch('', 
            {
                method: 'POST', 
                body: JSON.stringify(
                    {vehicle: this.vehicle})
            })
        const data = await res.json()
        return data.isSuccess;
    }
}

class ABInsurance  implements IInsurance{
    id!: number;
    status!: string;
    private vehicle: any;
    setVehicle(vehicle: any): void {
        this.vehicle = vehicle
    }
    async submit(): Promise<boolean> {
        const res = await fetch('ab', 
            {
                method: 'POST', 
                body: JSON.stringify(
                    {vehicle: this.vehicle})
            })
        const data = await res.json()
        return data.yes;
    }
}
// Абстрактная Фабрика
abstract class InsuranceFactory {
    db: any
    abstract createInsurance(): IInsurance;

    saveHistory(ins: IInsurance) {
        this.db.save(ins.id, ins.status)
    }
}

class TFInsuranceFactory extends InsuranceFactory {
    createInsurance(): TFInsurance {
        return new TFInsurance();
    }
}

class ABInsuranceFactory extends InsuranceFactory {
    createInsurance(): ABInsurance {
        return new ABInsurance();
    }
}

const tfInsuranceFactory = new TFInsuranceFactory(); 
const ins = tfInsuranceFactory.createInsurance();
tfInsuranceFactory.saveHistory(ins);


const INSURANCE_TYPE = {
    tf: TFInsurance,
    ab: ABInsurance
};

type IT = typeof INSURANCE_TYPE;

class InsuranceFactoryAlt {
    db: any

    createInsurance<T extends keyof IT>(type: T): IT[T] {
        return INSURANCE_TYPE[type]
    }

    saveHistory(ins: IInsurance) {
        this.db.save(ins.id, ins.status)
    }
}

const insuranceFactoryAlt = new InsuranceFactoryAlt()
const ins2 = new(insuranceFactoryAlt.createInsurance('tf'))
insuranceFactoryAlt.saveHistory(ins2);
```

### - ([К списку других тем](#start))
## 2. Singleton <a name="2"></a> 

```
class MyMap {
    private static instance: MyMap;

    map: Map<number, string> = new Map();

    private constructor() {}

    clean() {
        this.map = new Map();
    }

    public static get(): MyMap {
        if(!MyMap.instance) {
            MyMap.instance = new MyMap()
        }
        return MyMap.instance
    }
}

class Service1 {
    addMap(key: number, value: string) {
        // new MyMap() 
        const myMap = MyMap.get()
        myMap.map.set(key, value);
    }
}

class Service2 {
    getKeys(key: number) {
        // new MyMap() 
        const myMap = MyMap.get()
        myMap.clean();
        console.log(myMap.map.get(key))
    }
}

new Service1().addMap(1, 'Работает');
new Service2().getKeys(1)

// Ввыод в консоли =>
// Работает
// undefined 
```

### - ([К списку других тем](#start))

## 3. Модульность на frontend <a name="3"></a> 

### Чтоб поднять сервер на `node js`

Нужно установить пакет => `npm i -g serve`

Запуск сервера => `serve .`

-в `tsconfig.json`
-Параметр `"module": "ES6",` на `ES6`
- Создана папка `src-test` с файлом `index.html`
При подключении и конвертации файла был использован файл `app.js`

Подключение к `index.html` конвертированного файла с TypeScript на JavaScript нужно добавить строчку `<script src="../app.js" type="module"></script>` `type="module"`

### - ([К списку других тем](#start))

## 4. Import и export <a name="4"></a> 

Файл `app.ts`
```
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
```

Файл `app2.ts`

```
export const a = 5;

export class  Test {}

export const obj = {}

export default function run() {
    console.log("run")
}

export interface B {
    c: number;
}

export type MyType = string | number;
export type MyType2 = string | number;
```

### - ([К списку других тем](#start))

## 5. Типизация сторонних библиотек <a name="5"></a> 

#### Устанавливаем библиотеку `npm i really-relaxed-json`

Берем пример кода работы библиотеки 

```
// - //@ts-ignore // Для того чтоб отключить проверку ts
import {toJson} from 'really-relaxed-json'
const rjson = '[ one two three {foo:bar} ]'
const json = toJson(rjson)
console.log(json)
```

- Создаем `file` => `type.d.ts` для типизации и создание сигнатуры функций библиотеки 

Дальше заходим в папку `node_modules` => `really-relaxed-json` => `scr` => `index.js` ищем функцию `toJson`

```
toJson: function (rjsonString, compact = true) {
    const parser = thePackage.RJsonParserFactory.Companion.getDefault().createParser();
    const value = parser.stringToValue(rjsonString);
    let opts;
    if (compact) {
        opts = thePackage.PrettyPrinter.Options.Companion.JsonCompact;
    } else {
        opts = thePackage.PrettyPrinter.Options.Companion.JsonPretty;
    }
    const printer = new thePackage.PrettyPrinter(opts);
    return printer.valueToString(value);
},
```

В созданном файле `type.d.ts` типизируем функцию. 

Код из Файла - `type.d.ts`
```
declare module 'really-relaxed-json' {
    export function toJson(rjsonString: string, compact?: boolean): string
}
```

### - ([К списку других тем](#start))

