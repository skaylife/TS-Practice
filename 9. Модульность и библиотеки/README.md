# Модульность и библиотеки в TypeScript

### Начало 14.06.2023 г. - конец **.**.2023 г. 

### ** Уроков суммарно

[Вернуться на главную страницу "TS-Practice"](https://github.com/skaylife/TS-Practice)

## Содержание и быстрое перемещение по темам <a name="start">

[1. Namespaces и reference ](#1)

[2. Модульность на backend ](#2)

[3. Модульность на frontend ](#3)

[4. Import и export ](#4)

[5. Декоратор метода ](#5)


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

## 5. Декоратор метода <a name="5"></a> 

Декоратор `@Log()` модифицирует и меняет результат работы метода класса `UserService` метод `getUsersInDatabase()` на 

```
descriptor.value = () => {
    console.log('no error')
}
```

в результате вывод будет не `throw new Error('Ошибка ')` а будет `console.log('no error')`

```javascript

interface IUserService {
    users: number;
    getUsersInDatabase(): number;
}

class UserService implements IUserService {
    users: number = 1000;

    @Log()
    getUsersInDatabase(): number {
        throw new Error('Ошибка ')
    }
}

function Log() {
    return (
        target: Object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
    ) : TypedPropertyDescriptor<(...args: any[]) => any> | void => {
        console.log(target) // target где метод находится 
        console.log(propertyKey) // propertykey понять что это за метод 
        console.log(descriptor) // descriptor где содержится сама эта функция и ее параметры
        descriptor.value = () => {
            console.log('no error')
        }
    }
}

```

### - ([К списку других тем](#start))

## 6. Упражнение - Декоратор перехвата ошибок <a name="6"></a> 

```
interface IUserService {
    users: number;
    getUsersInDatabase(): number;
}

class UserService implements IUserService {
    users: number = 1000;

    @Catch({ rethrow: true })
    getUsersInDatabase(): number {
        throw new Error('Ошибка ')
    }
}

function Catch({rethrow}: {rethrow: boolean} = {rethrow : true}) {
    return (
        target: Object,
        _: string | symbol,
        descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
    ) : TypedPropertyDescriptor<(...args: any[]) => any> | void => {
        const method = descriptor.value;
        descriptor.value = async (...args: any[]) => {
            try {
                return await method?.apply(target, args)
            } catch(e) {
                if (e instanceof Error) {
                    console.log(e.message)
                    if (rethrow) {
                        throw e;
                    }
                }
            }
        }
    }
}
```

### - ([К списку других тем](#start))

## 7. Декоратор свойства <a name="7"></a> 

Пример одной из валидаций через декоратор

```
interface IUserService {
    users: number;
    getUsersInDatabase(): number;
}

class UserService implements IUserService {
    @Max(100)
    users: number = 1000;

    getUsersInDatabase(): number {
        throw new Error('Ошибка ')
    }
}

function Max(max: number) {
    return(
        target: Object,
        propertyKey: string | symbol
    ) => {
        let value: number;
        const setter = function (newValue: number) {
            if (newValue > max) {
                console.log("Нельзя утсановить значение больше " + max)
            } else {
                value = newValue;
            }
        }

        const getter = function () {
            return value;
        }

        Object.defineProperty(target, propertyKey, {
            set: setter,
            get: getter
        })
    }
}

const userService = new UserService();
userService.users = 1;
console.log(userService.users)
userService.users = 1000;
console.log(userService.users)
```

### - ([К списку других тем](#start))

## 8. Декоратор accessor <a name="8"></a> 

`descriptor` настроен для `setter`a сототвенно декоартор `Log()` можно вызвать и дописать `getter` в функции `Log()`

Нельзя вставить два декоратора на `setter` и на `getter` одновременно в этом особенность `accessor'a`
Но действие будет распостраняться на оба.

```
interface IUserService {
    users: number;
    getUsersInDatabase(): number;
}

class UserService implements IUserService {
    private _users!: number;
    @Log()
    set users(num: number) {
        this._users = num;
    }

    get users() {
        return this._users;
    }

    getUsersInDatabase(): number {
        throw new Error('Ошибка ')
    }
}

function Log() {
    return(
        target: Object,
        _: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
        const set = descriptor.set;
        descriptor.set = (...args: any) => {
            console.log(args)
            set?.apply(target, args)
        }
    }
}

const userService = new UserService();
userService.users = 1;
console.log(userService.users)
```

### - ([К списку других тем](#start))

## 8. Декоратор accessor <a name="8"></a> 

```
interface IUserService {
    getUsersInDatabase(): number;
}

class UserService implements IUserService {
    private _users!: number;

    getUsersInDatabase(): number {
        return this._users
    }

    setUsersInDatabase(@Positive() num: number): void {
        this._users = num;
    }
}

function Positive() {
    return(
        target: Object,
        propertyKey: string | symbol,
        parameterIndex: number,
    ) => {
        console.log(target)
        console.log(propertyKey)
        console.log(parameterIndex)
    }
}

const userService = new UserService();
```

### - ([К списку других тем](#start))

## 9. Декоратор параметра <a name="9"></a> 

```
interface IUserService {
    getUsersInDatabase(): number;
}

class UserService implements IUserService {
    private _users!: number;

    getUsersInDatabase(): number {
        return this._users
    }

    setUsersInDatabase(@Positive() num: number): void {
        this._users = num;
    }
}

function Positive() {
    return(
        target: Object,
        propertyKey: string | symbol,
        parameterIndex: number,
    ) => {
        console.log(target)
        console.log(propertyKey)
        console.log(parameterIndex)
    }
}

const userService = new UserService();
```

### - ([К списку других тем](#start))

## 10. Метаданные <a name="10"></a> 

Тема не зафиксированна, Но смсыл в чем в том что код из примеров выше мы с вами валидируем раскомментируем строчку в `tsconfig.json` с названием `"emitDecoratorMetadata": true,` дальше в ран тайм у нас в итогов файле `js` появляются `_meatadate` с метаданными и в можем записать в них правильные реузлтаты и написать проверку если данные будут не верны. 

### - ([К списку других тем](#start))

## 11. Порядок декораторов <a name="11"></a>

```
function Uni(name: string): any {
    console.log(`Инициализация ${name}`)
    return function() {
        console.log(`Вызов: ${name}`)
    }
} 

@Uni("Класс")
class MyClass {
    @Uni("Свойство")
    props?: any;

    @Uni('Свойство static')
    static prop2?: any;

    @Uni('Метод')
    method(@Uni('Параметр метода')_: string) {}

    
    @Uni('Метод')
    static method2(@Uni('Параметр метода static')_: string) {}

    constructor (@Uni('Параметр конструктора')_: string) {

    }
}
```
Порядок вызовов и инициализаций декораторов `Исполнение файла ts`
```
Инициализация Свойство
Вызов: Свойство
Инициализация Метод
Инициализация Параметр метода
Вызов: Параметр метода
Вызов: Метод
Инициализация Свойство static
Вызов: Свойство static
Инициализация Метод
Инициализация Параметр метода static
Вызов: Параметр метода static
Вызов: Метод
Инициализация Класс
Инициализация Параметр конструктора
Вызов: Параметр конструктора
Вызов: Класс
```

### - ([К списку других тем](#start))
