# Модульность и библиотеки в TypeScript

### Начало 14.06.2023 г. - конец 14.06.2023 г.

### 5 Уроков суммарно

[Вернуться на главную страницу "TS-Practice"](https://github.com/skaylife/TS-Practice)

## Содержание и быстрое перемещение по темам <a name="start">

[1. Namespaces и reference ](#1)

[2. Модульность на backend ](#2)

[3. Модульность на frontend ](#3)

[4. Import и export ](#4)

[5. Типизация сторонних библиотек ](#5)


## 1. Namespaces и reference <a name="1"></a> 

Чтоб это работало нужно в `tsconfig.ts` в параметре поставить `AMD` `module: "AMD"` раскомментировать `"outFile": "./app.js"`

```
namespace A {
    export const a = 5;

    export interface B {
        c: number;
    }
}

// A.a 

// ./app2.ts
// FILE
/// <reference path="./module/app2.ts">
//console.log(A.a)
```

### - ([К списку других тем](#start))
## 2. Модульность на backend <a name="2"></a> 

+ folder `module` в котором есть файл `app2.ts` 

код из файла 

`app2.ts`
```
export const a = 5;

export interface B {
    c: number;
}
```

`./app.ts` -код из файла
```
import { a } from './module/app2'

console.log(a)
```

в `tsconfig.json`
используется `"module": "commonjs",`

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

Дальше в созданном файле `type.d.ts` типизируем функцию. 

Код из Файла - `type.d.ts`
```
declare module 'really-relaxed-json' {
    export function toJson(rjsonString: string, compact?: boolean): string
}
```

### - ([К списку других тем](#start))

