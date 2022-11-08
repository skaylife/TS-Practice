# Классы в TypeScript

### Начало 06.11.2022 г. - конец ../../.... г.

## Содержание и быстрое перемещение по темам <a name="start">

[1. Создание класса ](#1)

[2. Конструктор (вариации) ](#2)

[3. Методы классов ](#2)

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