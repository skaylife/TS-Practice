# Манипуляция с типами в TypeScript

### Начало 05.06.2023 г. - конец **.**.2023 г. 

### * Уроков суммарно 

[Вернуться на главную страницу "TS-Practice"](https://github.com/skaylife/TS-Practice)

## Содержание и быстрое перемещение по темам <a name="start">

[1. Partial, Required, Readonly ](#1)

[2. Pick, Omit, Extract, Exclude ](#2)

[3. TypeOf ](#3)

[4. Indexed Access Types ](#4)

[5. Conditional Types ](#5)

[6. Infer ](#6)

[7. Mapped Types ](#7)

[8. Упражнение - Валидация форм ](#8)

[9. Template Literal Types ](#9)


## 1. Partial, Required, Readonly <a name="1"></a> 

Partial, Required, Readonly

```
interface User {
    name: string;
    age?: number;
    email: string;
}

type partial = Partial<User>; // Делает необязательными все полям ? 
const p: partial = {}

type required = Required<User> // Поля объязательные у required 
type readonly = Readonly<User> // Поля доступны только для четния 
type requiredAndReadonly = Required<Readonly<User>> // Все поля обязательные и доступны только для четния
```

### - ([К списку других тем](#start))
## 2. Pick, Omit, Extract, Exclude <a name="2"></a> 

 ```
interface PaymentPersistence {
    id: number;
    sum: number;
    from: string;
    to: string;
}

// Исключение id bp type Payment
type Payment = Omit<PaymentPersistence, "id">
// Вывод
// type Payment {
//     sum: number;
//     from: string;
//     to: string;
// }

// Pick взять только from и to
type PaymentRequisits = Pick<PaymentPersistence, "from" | "to"> 
// type PaymentPersistence {
//     from: string;
//     to: string;
// }

type ExtractEx = Extract<'from' | 'to' | Payment, string>; // Взять только from , to
type ExcludeEx = Exclude<'from' | 'to' | Payment, string>; // Наобарот будут все
 ```

### - ([К списку других тем](#start))

## 3. ReturnType, Parameters, ConstructorParameters <a name="3"></a> 

```
class User {
    constructor(public id: number, public name: string) {}
}

function getData(id: number): User {
    return new User(id, "Вася")
}

type RT = ReturnType<typeof getData> //RT = User
type RT2 = ReturnType<() => void> //RT = Void
type RT3 = ReturnType<<T>() => T> //RT = Unknown
type RT4 = ReturnType<<T extends string>() => T> //RT = string

type PT = Parameters<typeof getData> // PT = [id : number]
type PTnum = Parameters<typeof getData>[0] // Короткая запись, чтоб получить number

type first = PT[0] // Альтернативный вариант

type CP = ConstructorParameters<typeof User>
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

