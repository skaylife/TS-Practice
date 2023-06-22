# Манипуляция с типами в TypeScript

### Начало 05.06.2023 г. - конец 05.06.2023 г. 

### 4 Уроков суммарно

[Вернуться на главную страницу "TS-Practice"](https://github.com/skaylife/TS-Practice)

## Содержание и быстрое перемещение по темам <a name="start">

[1. Partial, Required, Readonly ](#1)

[2. Pick, Omit, Extract, Exclude ](#2)

[3. ReturnType, Parameters, ConstructorParameters ](#3)

[4. Awaited ](#4)

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

type CP = ConstructorParameters<typeof User>; // CP = [id: number, name: string]
type IT = InstanceType<typeof User>; // IT = User instance
```


### - ([К списку других тем](#start))

## 4. Awaited <a name="4"></a> 

```
type A = Awaited<Promise<string>> // Вернет нам промис стринг
type A2 = Awaited<Promise<Promise<string>>> // Свложенным промисом 

interface IMenu {
    name: string;
    url: string;
}

async function getMenu():Promise<IMenu[]> {
    return [{name: "Аналитика", url: "analytics"}]
}

type R = Awaited<ReturnType<typeof getMenu>>

async function getArray<T>(x: T) {
    return [await x]
}
```

### - ([К списку других тем](#start))
