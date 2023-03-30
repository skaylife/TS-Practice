# Generics в TypeScript

### Начало 10.03.2023 г. - конец **.**.**** г. 

### *<number> Уроков суммарно 

[Вернуться на главную страницу "TS-Practice"](https://github.com/skaylife/TS-Practice)

## Содержание и быстрое перемещение по темам <a name="start">

[1. Пример использования KeyOf ](#1)

[2. Упр Пишем функцию групировки ](#2)

[3. TypeOf ](#3)

[4. Indexed Access Types ](#4)

[5. Conditional Types ](#5)

[6. Infer](#6)

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

## 4. Indexed Access Types <a name="4"></a> 

```
interface Role {
    name: string;
}

interface Permission {
    endDate: Date;
}

interface User {
    name: string;
    roles: Role[];
    permission: Permission
}

const user: User = {
    name: ' Вася',
    roles: [],
    permission: {
        endDate: new Date()
    }
}

const nameUser = user['name'];
const roleNames = 'roles'
let roleNames2: 'roles' = 'roles'

type rolesType = User['roles'];
type rolesType2 = User[typeof roleNames];
type rolesType3 = User[typeof roleNames2];

type roleType = User['roles'][number];
type dateType = User['permission']['endDate'];

const roles = ['admin', 'user', 'super-user'] as const;
type roleTypes = typeof roles[number]
```

### - ([К списку других тем](#start))

## 5. Conditional Types <a name="5"></a>

```
const a1: number = Math.random() > 0.5 ? 1 : 0; // Работа с JS

// Работа с типами
interface HTTPResponse<T extends 'success' | 'failed'> {
    code: number;
    data: T extends 'success' ? string : Error;
}

const suc: HTTPResponse<'success'> = {
    code: 200,
    data: 'done'
}

const err: HTTPResponse<'failed'> = {
    code: 200,
    data: new Error()
}

class User {
    id!: number;
    name!: string;
}

class UserPersistend extends User {
    dbId!: string;
}

function getUser(dbIdOrId: string | number): User | UserPersistend {
    if (typeof dbIdOrId === 'number') {
        return new User();
    } else {
        return new UserPersistend();
    }
}

type UserOrPersistend<T extends string | number> = T extends number ? User : UserPersistend;

function getUser2<T extends string | number>(id: T): UserOrPersistend<T>{
    if (typeof id === 'number') {
        return new User() as UserOrPersistend<T>;
    } else {
        return new UserPersistend();
    }
}

const res = getUser2(1)
const res2 = getUser2('asdsdf')
```

### - ([К списку других тем](#start))

## 6. Infer <a name="6"></a>

```
function runTransaction (transaction: {
    fromTo: [string, string]
}) {
    console.log(transaction)
}

const transaction: GetFirstArg<typeof runTransaction> = {
    fromTo: ['1', '2'] as [string, string]
}

runTransaction(transaction);

type GetFirstArg<T> = T extends (first: infer First, ...args: any[]) => any ? First : never  
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

