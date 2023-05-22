# Манипуляция с типами в TypeScript

### Начало 10.03.2023 г. - конец 22.05.2022 г. 

### 9 Уроков суммарно 

[Вернуться на главную страницу "TS-Practice"](https://github.com/skaylife/TS-Practice)

## Содержание и быстрое перемещение по темам <a name="start">

[1. Пример использования KeyOf ](#1)

[2. Упр Пишем функцию групировки ](#2)

[3. TypeOf ](#3)

[4. Indexed Access Types ](#4)

[5. Conditional Types ](#5)

[6. Infer ](#6)

[7. Mapped Types ](#7)

[8. Упражнение - Валидация форм ](#8)

[9. Template Literal Types ](#9)



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

## 7. Mapped Types <a name="7"></a>

Пример кода: 
```
type Modifier = 'read' | 'update' | 'create';

type UserRoles = {
    customers: Modifier,
    projects?: Modifier,
    adminPanel?: Modifier,
}

type ModifierToAccess<Type> = {
    +readonly [Property in keyof Type as Exclude<`canAccess${string & Property}`, 'canAccessadminPanel'>]-?: boolean;
}

type UserAccess2 = ModifierToAccess<UserRoles>

type UserAccess1 = {
    customers: boolean,
    projects?: boolean,
    adminPanel?: boolean,
}

```

### - ([К списку других тем](#start))

## 8. Упражнение - Валидация форм <a name="8"></a>

Пример кода:
```
//Тип валидации
interface IForm {
    name: string;
    password: string;
}
// Данные для валидации
const form: IForm = {
    name: 'Вася',
    password: '123'
}
//Этап валидации
const formValidation: Validation<IForm> = {
    name: {isValid: true},
    password: {isValid: false, errorMessage: 'Пароль должен быть не меньше 5 символов'}
}
// Принцип валидации 
type  Validation<T> = {
    [K in keyof T]: {
        isValid: true
    } | {
        isValid: false;
        errorMessage: string;
    }
}
```

### - ([К списку других тем](#start))

## 9. Template Literal Types <a name="8"></a>
Код из примера:

```
type ReadOrWrite = 'read' | 'write'
type Bulk = 'bulk' | ''

// Получились union type 
type Access = `can${Capitalize<ReadOrWrite>}${Capitalize<Bulk>}`
// Infer вытаскивает для следующего использования
type ReadOrWriteBulk<T> = T extends `can${infer R}` ? R : never;

type T = ReadOrWriteBulk<Access>

type ErrorOrSuccess = 'error' | 'success';

type ResponseT = {
    result: `http${Capitalize<ErrorOrSuccess>}`
}

const a2: ResponseT = {
    result: 'httpSuccess'
}
```
### - ([К списку других тем](#start))

