# Generics в TypeScript

### Начало 10.03.2023 г. - конец **.**.**** г. 

### *<number> Уроков суммарно 

[Вернуться на главную страницу "TS-Practice"](https://github.com/skaylife/TS-Practice)

## Содержание и быстрое перемещение по темам <a name="start">

[1. Пример использования KeyOf ](#1)

[2. Упр Пишем функцию групировки ](#2)

[3. TypeOf ](#3)

[4. Использование в типах ](#4)

[5. Ограничения Generic ](#5)

[6. Упр. Функция сортировки](#6)

[7. Generics классы](#7)

[8. Mixins ](#8)


## 1. Пример использования KeyOf <a name="1"></a> 


```
interface IUser {
    name: string;
    age: number;
}

type KeysOfUser = keyof IUser;

const key: KeysOfUser = 'age';

// Функция использует generics <T> И ключ должен былть как сам объект Т
function getValue<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

const user: IUser = {
    name: 'Вася',
    age: 30
}

const userName = getValue(user, 'name')  // Если использовать names - будет ОШИБКА ERORR, так как ключ затипизирован
```

### - ([К списку других тем](#start))
## 2. Упр Пишем функцию групировки <a name="2"></a> 

Необходимо написать функцию группировки, которая принимает массив объектов
и его ключ, производит группировку по указанному ключу и возращает
сгруппированный объект.
Пример:
``` js
[
	{ group: 1, name: 'a' },
	{ group: 1, name: 'b' },
	{ group: 2, name: 'c' },
];
```

При группироке по 'group' ---->

``` js
{
	'1': [ { group: 1, name: 'a' }, { group: 1, name: 'b' } ],
	'2': [ { group: 2, name: 'c' } ]
}
```

Пример кода
```
interface Data {
    group: number;
    name: string;
}

const data: Data[] = [
    {group: 1, name: 'a'},
    {group: 1, name: 'b'},
    {group: 3, name: 'c'},
]

interface IGroup<T> {
    [key: string]: T[]; 
}

type key = string | number | symbol;

function group<T extends Record<string, any>>(array: T[], key: keyof T): IGroup<T> {
    return array.reduce<IGroup<T>>((map: IGroup<T>, item) => {
        const itemKey = item[key];
        let curEl = map[itemKey]
        if (Array.isArray(curEl)) {
            curEl.push(item);
        } else {
            curEl = [item];
        }
        map[itemKey] = curEl;
        return map;
    }, {})
}

const res = group<Data>(data, 'group')
console.log(res)
```
### - ([К списку других тем](#start))

## 3. TypeOf <a name="3"></a> 

```
let strOrNum: string | number = 5; // TypeScript это сделает явно number

if (Math.random() > 0.5) {
    strOrNum = 8;
} else {
    strOrNum = 'str'
}

if (typeof strOrNum === 'string') {
    console.log(strOrNum);
} else {
    console.log(strOrNum)
}

let str2OrNum: typeof strOrNum;

const user = {
    name: 'Вася'
};

type keyOfUser = keyof typeof user;

enum Direction {
    Up,
    Down
}

type d = keyof typeof Direction;
```

### - ([К списку других тем](#start))

## 4. Использование в типах <a name="4"></a> 

Использование типов интерфесов с `Generics`

```
function logMiddleware<T>(data: T): T {
    console.log(data);
    return data;
}

const res = logMiddleware<number>(10);

function getSplitedHalf<T>(data: Array<T>): Array<T> {
    const l = data.length / 2
    return data.splice(0, l);
}

getSplitedHalf<number>([1, 3, 4]);

const split: <T>(data: Array<T>) => Array<T> = getSplitedHalf;

interface ILogLine<T> {
    timeStamp: Date;
    data: T
}

type LogLineType<T> = {
    timeStamp: Date;
    data: T
}

const logLine: ILogLine<{a: number}> = {
    timeStamp: new Date(),
    data: {
        a: 1
    }
}
```

### - ([К списку других тем](#start))

## 5. Ограничения Generic <a name="5"></a>

Использвоать по макисимум `Strict` режим

Ограничения Generic и области видимости

```
class Vehile {
    run!: number;
}

function kmToMiles<T extends Vehile>(vehicle: T): T {
    vehicle.run = vehicle.run / 0.72;
    return vehicle;
}

class LCV extends Vehile {
    capacity!: number;
}

const vehicle = kmToMiles(new Vehile());
const lcv = kmToMiles(new LCV());
kmToMiles({run: 1});

function logId<T extends string | number, Y>(id: T, additionalData: Y): {id: T, data: Y} {
    console.log(id);
    console.log(additionalData);
    return {id, data: additionalData};
}   
```

### - ([К списку других тем](#start))

## 6. Упр. Функция сортировки <a name="6"></a>

Пример сортировки

```
const data = [
    {id: 1, name: 'Вася'},
    {id: 2, name: 'Петя'},
    {id: 3, name: 'Надя'},
];

interface ID {
    id: number;

}

function sort<T extends ID>(data: T[], type: 'asc' | 'desc' = 'asc'):T[] {
    return data.sort((a, b) => {
        switch (type) {
            case 'asc':
                return a.id - b.id;
            case 'desc':
                return b.id - a.id;
        }
    })
}

console.log(sort(data,'desc'))
console.log(sort(data))  
```

Результат сортировки 

```
[
  { id: 3, name: 'Надя' },
  { id: 2, name: 'Петя' },
  { id: 1, name: 'Вася' }
]
[
  { id: 1, name: 'Вася' },
  { id: 2, name: 'Петя' },
  { id: 3, name: 'Надя' }
]
```

### - ([К списку других тем](#start))

## 7. Generics и классы <a name="7"></a>

Пример кода: 
```
class Resp<D, E> {
    data?: D;
    error?: E;

    constructor(data?: D, error?: E) {
        if(data) {
           this.data = data;
        }
        if(error) {
            this.error = error;
        }
        
    }
}

const res = new Resp('data');

class HTTPResp<F> extends Resp<string, number> {
    // code: number | undefined;
    code!: F;

    setCode(code: F) {
        this.code = code;
    }
}

const res2 = new HTTPResp()

```

### - ([К списку других тем](#start))

## 8. Mixins <a name="8"></a>

- Mixins - дает возможность писать еще одну реализацию `extend`а и примиксовать еще какое то свойство к нашему классу.

- Микскины позволяют экстендить сразу несколько классов в один. 

- Если есть задача конструировать что то большое из разных маленьких свойств, то это можно легко сделать с помощью миксионов

```
type Constructor = new (...args: any[]) => {}
type GConstructor<T = {}> = new (...args: any []) => T

class List {
    constructor(public items: string[]) {}
}

class Accordion {
    isOpened: boolean | undefined;
}

type ListType = GConstructor<List>;
type AccordionType = GConstructor<Accordion>

class ExtendedListClass extends List {
    first() {
        return this.items[0];
    }
}

//Mixins

function ExtendedList<TBase extends ListType & AccordionType>(Base: TBase) {
    return class ExtendedList extends Base {
        first() {
            return this.items[0];
        }
    }
}

class AccordionList {
    isOpened: boolean | undefined;
    constructor(public items: string[]) {}
}

const list = ExtendedList(AccordionList);
const res = new list(['firs', 'second']);
console.log(res.first()) 
```

### - ([К списку других тем](#start))

