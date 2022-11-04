# Продвинутые Типы

## Содержание и быстрое перемещение по темам <a name="start">

[1. Union Тип ](#Union_Тип)

[2. Literal Types ](#Literal_Types)

[3. Type Aliases ](#Type_Aliases)

[4. Interface ](#4)

[5. Types или Interfaces ](#5)

[6. Optional - Опциональные свойства ](#6)

[7. Типизация - ответа от сервера ](#7)

[8. Void ](#8)

[9. Unknown ](#9)

[10. Never ](#10)

[11. Null ](#11)

[12. Приведение переменных к типу (конвертация) ](#12)

[13. Type Guard - ограничение типов ](#13)


## 1. Union Тип <a name="Union_Тип"></a> 
Union тип - который может нескольких типов.

Например : 
- string 
- number 
- boolean 

```
function loginId(id: string | number | boolean) {
    if (typeof id === 'string'){
        console.log(id) // - Здесь только String
    } else if (typeof id === 'number') {
        console.log(id)
    } else {
        console.log(id)
    }
}
```
И Дальше мы можем применять к данному типу соответсвующие методы. 
В первой проверке мы можем примнять к `id` только методы которые можно применить к string. 
И к другим аналогично. 

### - ([К списку других тем](#start)) 

## 2. Literal Types <a name="Literal_Types"></a> 
Литеральный тип - явялется точной переменной от JavaScript

Пример: 

```
// Задаем url - тип строку и method - либо тип post или get 
function fetchWithAuth(url: string, method: 'post' | 'get'): 1 | -1 {
    return -1
}
// Передаем параметры
fetchWithAuth('a', 'post')
// Пример с ошибкой TS не пропустит данную строку
fetchWithAuth('a', 'post2')
```

```
Создаем метод - которые явялется типом строка
let method = 'post'
// Так будет ошибка - так как method строка, а 'post'
fetchWithAuth('s', method)
```
Как исправить ошибкку ? 
```
let method = 'post' // - не будет работать 

// Вместо let - написать const 
const method = 'post'

// Так не будет ошибки 
fetchWithAuth('s', method)
```
В примере выше мы строго задали константу.

А если нам нужен let как момжно его оставить, и избежать ошибки? 

Использовать аккуратно!

```
let method = 'post'
fetchWithAuth('s', method as 'post')
```
### - ([К списку других тем](#start)) 

## 3. Type Aliases  <a name="Type_Aliases"></a> 

Type Aliases -  создание типов, и их дальнешее использование.

Пример:

```
// Старая запись (типизация)
let userOld: {
    name: string,
    age: number,
    skills: string[]
} = {
    name : 'Petr',
    age: 11,
    skills: ['1', '2']
}

// Типизация через Aliases
type User = {
    name: string,
    age: number,
    skills: string[]
}

// Добавление еще одного типа
type Role = {
    id: number;
}
//  Использоваение нового типа id (Объеденение)
type UserWithRole = User & Role;

let user: UserWithRole = {
    name : 'Petr',
    age: 11,
    skills: ['1', '2'],
    id: 1
}
```

### - ([К списку других тем](#start)) 

## 4. Interface <a name="4"></a> 

Использование iterface
Пример кода:
```
interface Role {
    roleId: number
}

interface UserWithRoleAlt extends User, Role {
    createAt: Date;
}

let user: UserWithRoleAlt = {
    name : 'Petr',
    age: 11,
    skills: ['1', '2'],
    roleId: 1,
    createAt: new Date(),

    log(id) {
        return ''
    }
}

interface UserDic {
     // Мы получаем ключем ялвяется index, а значением User
    [index: number] : User
}
```

### - ([К списку других тем](#start)) 

## 5. Types или Interfaces <a name="5"></a> 

Type - используется в основном для примитивных типов

Interfaces - рекомендуется к использованию

### - ([К списку других тем](#start)) 

## 6. Optional - Опциональные свойства <a name="6"></a>

Типы которые могут быть необязательные использется - ? 

`second?: number`
`second!: number` - обязательный парметр что данные обязательные и будут типа `number`

```
interface User {
    login: string;
    password?: string; // ? - обозначает опциональность данного поля
    password: string | undefined; // обозначает опциональность данного поля но оно должно быть
}

function test(param?: string) {
    const t = param ?? multiply(5); // Проверка если params = null или undefined, если да то выполняем функцию multiply
}
```

### - ([К списку других тем](#start)) 

## 7. Типизация ответа от сервера <a name="7"></a>

Типизация JSON Запроса

```
// Запрос в виде платежа
{
    "sum": 10000,
    "from": 2,
    "to": 4
}
// Ответ 
[
    {
        "status": "success",
        "data": {
            "databaseId": 567,
            "sum": 10000,
            "from": 2,
            "to": 4
        }
    },
    {
        "status": "failed",
        "data": {
            "errorMessage": "Недостаточно средств",
            "errorCode": 4
        }
    }
]


```
Типизация на основе interface 
```
interface IPayment {
    sum: number
    from: number
    to: number
}

enum PaymentStatus {
    success = "success",
    failed = "failed"
}

interface IPaymentRequest extends IPayment {}

interface IDataFailed {
    errorMessage: string,
    errorCode: number
}

interface IDataSuccess extends IPayment {
    databaseId: number;
}

interface IResSuccess {
    status: PaymentStatus.success 
    data: IDataSuccess
}

interface IResFailed {
    status: PaymentStatus.failed
    data: IDataFailed
}

```

### - ([К списку других тем](#start)) 

## 8. Void <a name="8"></a>

#### Объявление тип void
```
function logId(id: string | number): void {
    console.log(id);
}
```
#### Разница между void и undefinded 
в том что если стотит `undefinded` тот там не может быть другого типа 

но напротив в `void` может быть и `undefinded` и любой другой тип.
```
const skills = ['Dev', 'DevOps'];

const user = {
    s: ['s']
}

skills.forEach((skill) => user.s.push(skill));
```
### - ([К списку других тем](#start)) 

## 9. Unknown <a name="9"></a>

### Проверка работы типа unknown 
```
function run(i: unknown) {
    if (typeof i == 'number') {
        i++
    } else {
        i
    }
}

run(input)
// Лучше испольщовать явную проверку
async function getData() {
    try {
        fetch('');
    } catch(error) {
        if (error instanceof Error) {
            console.log(error.message) // Делаем явную проверку // error с типом string
        }
        //console.log(erorr.message) - старый варинт с ошибкой сейчас будет. так как тип unknown
    }
}
// Пример с неявной проверкой 
async function getDataForce() {
    try {
        fetch('');
    } catch(error) {
        const a = error as Error
    }
}

type U1 = unknown | null;  // Если есть вариант с unknown, то применяется именно он.

type I1 = unknown & string; // Интерсектион - то здесь будет тип string
```
### - ([К списку других тем](#start)) 

## 10. Never - (никогда не будет возрата) <a name="10"></a>

### (никогда не будет возрата у функции)
```
function generateError(message: string): never {
    throw new Error(message) // Данная функция никогда не вернется 
}
```

### Как один из примера бесконесного цикла у которого не будет возврата 
```
function dumpErorr(): never {
    while (true) {

    }
}
```
Пример кода
```
function isString(x: string | number): boolean {
    if (typeof x === 'string') {
        return true;
    } else if (typeof x === 'number') { // Проверка на тот случай если попадет undefinded
        return false;
    }
    generateError('ssss Error')
}
```
### - ([К списку других тем](#start)) 

## 11. Null <a name="11"></a>

Если ожидается пустой объект, то нужно испольщовать `null`

Под `undefined` понимается что объект должен быть, а его нет.

Пример кода :

```
const n: null = null; // Можем присвоить строго хначение null, это не может быть undefinded/ 
const n1: any = null; 
const n2: number = null;  // Ошибка 
const n3: string = null;  // Ошибка 
const n4: boolean = null; // Ошибка 
const n5: undefined = null; // Ошибка 

interface User {
    name: string;
}

function getUser(): User {
    if (Math.random() > 0.5) {
        // return // Неправильная запись и возвратом будет undefined
        return null as any; // Решение проблемы 
    } else {
        return {
            name: 'Сергей'
        } as User 
    }
}
```

### - ([К списку других тем](#start)) 

## 12. Приведение переменных к типу (конвертация) <a name="12"></a>

Пример ковертации из олного типа в другой, можно использовать все методы по конвертации из JS 
```
let a = 5; 
let b: string = a.toString() // Преобразование типа number в string
let e: string = new String(a).valueOf() // String с большой буквы это конструктор типов 
let f: boolean = new Boolean(a).valueOf() 

let c = 'asd';
let d: number = parseInt(c);
```

```
// Создание интерфеса для пользователя с необходимыми типами
interface User { 
    name: string;
    email: string;
    login: string;
}

// Создание юзера с тпипами в интерфесе User 
const user: User = {
    name: 'Семен',
    email: 'semen@22.org',
    login: 'vasya'
}  

// Создание интерфеса для Админа с именем и ролью 
interface Admin {
    name: string;
    role: number;
}

// Присвоение переменной admin типа interface Admin
// В этом случае у аdmin будет, содержаться и email и login 
const admin: Admin = {
    ...user,
    role: 1
}

// Если использовать подобный подход, то тогда будет только у admin'a свойтво name = 'Семен'
function userToAdmin(user: User): Admin {
    return {
        name: user.name,
        role: 1
    }
}
```

### - ([К списку других тем](#start)) 

## 13. Type Guard - ограничение типов <a name="13"></a>

Ограничение типов `объявление user взято из примаера кода выше` ([12 тема](#12)) 

```
function isString(x: string | number): x is string {
    return typeof x === 'string'
}

function isAdmin(user: User | Admin): user is Admin {
    return 'role' in user; 
}

function isAdminAleternative(user: User | Admin): user is Admin {
    return (user as Admin).role !== 'undefined';
}

function setRoleZero(user: User | Admin) {
    if (isAdmin(user)) {
        user.role = 0
    } else {
        throw new Error('Пользователь не Админ')
    }
}
```

### - ([К списку других тем](#start)) 






