# Классы в TypeScript

### Начало 06.11.2022 г. - конец ../../.... г.

## Содержание и быстрое перемещение по темам <a name="start">

[1. Создание класса ](#1)

[2. Конструктор (вариации) ](#2)

[3. Методы классов ](#3)

[4. Перегрузка сигнатуры ](#4)

[5. Getter и Setter ](#5)

[6. Implements - имплементация (передача объекту каких то свойтв)  ](#6)

## 1. Создание класса <a name="1"></a> 

- `constructor(name: string)` - передаем необходимые свойства класса. пр. #1
- Или без него, но с изменением tsconfig `strictPropertyInitialization` на `false` #2

```
// #1 С конструктором 
class User {
    name: string; // Если задвать свойство без конструктора будет ошибка

    constructor(name: string) { // Создание конструктора 
        this.name = name; // Инициализация свойств в констукторе
    }
}

const user = new User('Вася'); 
console.log(user);
user.name = 'Петя' // Задаем новое значение name = 'Петя'
console.log(user);

// #2 Без него 
class Admin {
    // role: number; // Будет ошибка из-за "strictPropertyInitialization": true, нужно поставить false чтоб ушла ошибка
    role!: number; // Чтоб избежать ошибки, или раскоменнтировать. 
}

const admin = new Admin(); // присваиваем переменной admin = свойства класса Admin
admin.role = 1; // присватваем роль. 

```

### - ([К списку других тем](#start))

## 2. Конструктор (вариации) <a name="2"></a> 

Создание необъязательности свойств у класса через `constructor` и их вариации

```
class User {
    // Чтоб не было ошибки у name и age - "strictPropertyInitialization": false, 
    name: string; // Если задвать свойство без конструктора будет ошибка
    age: number;

    // Конструктор возвращает User'a 
    constructor(); // Без передачи аргумента
    constructor(name: string); // только name
    constructor(age: number); // только возраст
    constructor(ageOrName?: string | number, age?: number) { // Создание конструктора 
        if (typeof ageOrName === 'string') {
            this.name = ageOrName; // Инициализация свойств в констукторе
        } else if (typeof ageOrName === 'number') {
            this.age = ageOrName;
        }
        if (typeof age === 'number') {
            this.age = age;
        }
    } 
}
```

### - ([К списку других тем](#start))

## 3. Методы классов <a name="3"></a> 

Метод класса `getPaymentLifeTime()`, и метод `unholdPayment(): void` (он ничего не возвращает, поэтому тип `void`)

```
enum PaymentStatus {
    Holded,
    Processed, 
    Reversed
}

class Payment {
    id: number;
    status: PaymentStatus = PaymentStatus.Holded;
    createdAt: Date = new Date();
    updateAt: Date;

    constructor(id:  number) {
        this.id = id;
    }
// Пример созданных методов класса
    getPaymentLifeTime(): number {
        return new Date().getTime() - this.createdAt.getTime(); // Возрат времени жизни платежа
    }

    unholdPayment(): void {
        if (this.status == PaymentStatus.Processed) {
            throw new Error('Платеж не может быть возвращен');
        }
        this.status = PaymentStatus.Reversed
    }
}
// Вызов методов 
const payment = new Payment(1);
payment.unholdPayment();
console.log(payment)
const time = payment.getPaymentLifeTime();
// payment.status = PaymentStatus.Reversed;
console.log(time);
```

### - ([К списку других тем](#start))

## 4. Перегрузка сигнатуры <a name="4"></a> 

И еще одна небольшая деталь: если ваши сигнатуры перегрузки возвращают разные типы, то в сигнатуре реализации нужно использовать не логическое «или», а логическое «и»: `"Хабр"`

Тело Сигнатруры перегрузки.

Идея в том что мы заранее можем объявить какие можно будете предовать аргументы в функцию

А потом есть и дальше есть проверка через `typeof` тела функции. 
```
function run(   distances: number): string
function run(   distances: string): number
function run(   distances: number | string): number | string
```

Релизация сигнатуры перегрузки

```
    if(typeof distances == 'string') {
        return 1;
    } else {
        return '';
    }
}   
run()
```

Весь код

```
function run(   distances: number): string
function run(   distances: string): number
function run(   distances: number | string): number | string {
    if(typeof distances == 'string') {
        return 1;
    } else {
        return '';
    }
}   

run()
```


[Статья на хабре про - Сигнатуру перегрузки, более подробно](https://habr.com/ru/company/otus/blog/688270/)
`https://habr.com/ru/company/otus/blog/688270/`

### - ([К списку других тем](#start))

## 5. Getter и Setter <a name="5"></a> 

**Не поддерживает аснихронный подход!**

`Setter` - устанваливает занчение. 

```
    // Сам Setter
    set Login(l: string) {
        this._login = 'user-' + l;
    } 
```

`Getter` - возвращает значение. 

```
    // Сам Getter
    get Login() {
        return 'No Login';
    }
```

Пример кода
```
class User {
    _login: string;
    password: string;

    // Сам Setter
    set Login(l: string) {
        this._login = 'user-' + l;
    } 

    // Сам Getter
    get Login() {
        return 'No Login';
    }
}

const user = new User(); 
user.Login = 'MyLogin';
console.log(user);
```

### - ([К списку других тем](#start))

## 6. Implements - имплементация (передача объекту каких то свойтв) <a name="6"></a> 

**Implements имплементация-** передача из интерфеса каких то свойств, но в самом классе есть надо их тоже описать. *(также там их можно расширить, если в `interface` отсутвует какой то тип, то этот тип можнон добавить в самом классе, в примере в коде)

-Объявление и создание класса с имплементацией `IPayable`, и `IDeletable`  

-Имплементация происходи командой `implements`
`class User implements IPayable, IDeletable`

Описание интерфейса - для дальнейшей имплементации
```
interface IPayable {
    pay(paymentId: number): void;
    price?: number;
}
```

Код из класса `User`
У `pay(paymentId: number |` добавляется еще и `string`, что дает возможность предачи строки в объект свойств.
```
    pay(paymentId: number | string): void {
        throw new Error('Method not implemented')
    }
```

Весь код
```
interface IPayable {
    pay(paymentId: number): void;
    price?: number;
}

interface IDeletable {
    delete(): void;
}

class User implements IPayable, IDeletable {
    delete(): void {
        throw new Error("Method not implemented.");
    }
    pay(paymentId: number | string): void {
        throw new Error('Method not implemented')
    }
    price?: number | undefined;
}
```

### - ([К списку других тем](#start)) 