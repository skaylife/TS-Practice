# Generics в TypeScript

### Начало 14.02.2023 г. - конец 24.02.2023 г. 

### *<number> Уроков суммарно 

[Вернуться на главную страницу "TS-Practice"](https://github.com/skaylife/TS-Practice)

## Содержание и быстрое перемещение по темам <a name="start">

[1. Пример встроенных Generics ](#1)

[2. Написание функции Generics ](#2)

[3. Упр. Преобразование функции в строку ](#3)

[4. Использование в типах ](#4)

[5. Ограничения Generic ](#5)

[6. Упр. Функция сортировки](#6)

[7. Generics классы](#7)

[8. Mixins ](#8)


## 1. Пример встроенных Generics <a name="1"></a> 

Array`<number>` - пример создание дженерика
```
const num: Array<number> = [1, 2, 3]; // Generic массив типа number

async function test() {
    const a = await new Promise<number>((resolve, reject) => {
        resolve(1);
    })
}

const check: Record<string, boolean> = {
    drive: true,
    kpp: false
}

```

### - ([К списку других тем](#start))
## 2. Написание функции Generics <a name="2"></a> 

Пример кода
```
function logMiddleware<T>(data: T): T  { // Можно предеать данные любого типа
    console.log(data);
    return data;
}

const res = logMiddleware<number>(10); // Res задаем определенный тип типа <number>

function getSplitHalf<T>(data: Array<T>): Array<T> { // Нужно строго задать Array, так как length есть именно там
    const l = data.length / 2;
    return data.splice(0, l);
}

getSplitHalf<number>([1, 3, 4]);
```
### - ([К списку других тем](#start))

## 3. Упр. Преобразование функции в строку <a name="3"></a> 

`Задача` - необходимо написать функцию toString, которая принимает любой тип и возвращает его строковое представление. Если не может, то возвращает undefined.

```
function toString<T>(data: T): string | undefined {
    if(Array.isArray(data)) {
        return data.toString();
    }
    switch (typeof data) {
        case 'string':
            return data;
        case 'number':
        case 'symbol':
        case 'bigint':
        case 'boolean':
        case 'function':
            return data.toString();
        case 'object':
            return JSON.stringify(data);
        default:
            return undefined;
    }
}

console.log(toString(3));
console.log(toString(true));
console.log(toString(['a', 'b']));
console.log(toString({a: 1}));
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

