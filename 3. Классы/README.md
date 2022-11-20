# Классы в TypeScript

### Начало 06.11.2022 г. - конец ../../.... г.

## Содержание и быстрое перемещение по темам <a name="start">

[1. Создание класса ](#1)

[2. Конструктор (вариации) ](#2)

[3. Методы классов ](#3)

[4. Перегрузка сигнатуры ](#4)

[5. Getter и Setter ](#5)

[6. Implements - имплементация (передача объекту каких то свойтв)](#6)

[7. Extends - наследование и override](#7)

[8. Extends - наследование 2 ЧАСТЬ](#8)

[9. Композиция против наследования](#9)

[10. Видимость свойств](#10)     

[11. Упражнение делаем корзину товара](#11)

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

- Объявление и создание класса с имплементацией `IPayable`, и `IDeletable`  

- Имплементация происходит командой `implements`
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

## 7. Extends - наследование и override <a name="7"></a> 

- Через `extends` можно наследовать свойства и методы `class'a` для использования в другом классе. 

- `override` (модификатор) - Чтобы своевременно обнаружить изменение в сигнатуре метода у класса-предка (или интерфейса) (для переопределения существующего класса). 

- `constructor` - это специальный метод, служащий для создания и инициализации объектов, созданных с использованием `class`.

[Ссылка на документацию по методу constructor](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Classes/constructor)

- В конструкторе ключевое слово super() используется как функция, вызывающая родительский конструктор. Её необходимо вызвать до первого обращения к ключевому слову this в теле конструктора. Ключевое слово super также может быть использовано для вызова функций родительского объекта.

[Ссылка на документацию по методу super](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/super)

Пример кода:
```
type PaymentStatus = 'new' | 'paid';

class Payment {
    id: number;
    status: PaymentStatus = 'new';

    constructor(id: number) {
        this.id = id;
    }

    pay() {
        this.status = 'paid';
    }
}

class PersistentPayment extends Payment {
    databaseId: number;
    paidAt: Date;
        
    constructor() {
        const id = Math.random();
        super(id);
    }

    save() {
        // Сохранение в базу данных
    }

    // override pay(date?: Date) { // override (модификатор)
    pay(date?: Date) { // overrid (модификатор)
        super.pay(); // Можно сразу наследовать все от родителя extends но если метод будет удален, будет ошибка
        if(date) {
            this.paidAt = date;
        }
    }
}
```

### - ([К списку других тем](#start))

## 8. Extends - наследование 2 ЧАСТЬ <a name="8"></a> 

В наследуемом классе Admin, без `constructor()` и там `super();`, не будет в `console.log(this.name)` // admin. В консоле просто выйдет // user. И только после объявления конструктора и вывзова контекста `this.name` выйдет в терминале // `user` и на следующей строке `admin`. 

Пример кода
```
// Вторая часть (2)
class User {
    name: string = 'user';

    constructor() {
        console.log(this.name)
    }
}

class Admin extends User {
    name: string = 'admin';

    constructor() {
        super();
        console.log(this.name);
    }
}
```

### - ([К списку других тем](#start))

## 9. Композиция против наследования<a name="9"></a> 

Композиция кода нужна для отсутвия жесткой связанности сущностей, и в том случае если у нас кардинально разные объекты и разные у них задачи. 

в констуркторе (`constructor()`) у нас задется композиция. 

Пример кода 
```
class Payment {
    date: Date;
}

class UserWithPayment extends Payment {
    name: string;
}

class UserWithPayment2 extends Payment {
    user: User;
    payment: Payment;

    constructor(user: User, payment: Payment) {
        super();
        this.payment = payment;
        this.user = user;
    }
}
```

### - ([К списку других тем](#start))

## 10. Видимость свойств<a name="10"></a> 

`public` - по умолчанию стоит у каждого метода переменной и тд. можно не указывать. 

`private` - видимость будет только в рамках данного класса, в других класса к нему нельзя будет обратиться.

`protected` - видимость с которой можно будет обраититься в наследовании в созданном методе через контекст `this`

`#price` или просто `#` это приватность на языке `JS`, можно записывать и так, но в этом нет смысла если это не `frontend`, на `backend'e` нет смысла така записывать.

Пример кода     
```
class Vehicle {
    public make: string; // public можно не указаывать, оно стоит по умолчанию
    private damages: string[]; // private ное свойство - к которому можно обратиться только в рамках того же класса. 
    protected run: number; 
    #price: number; // private JS 
}

class EuroTruck extends Vehicle {
    setDamage(km: number) {
        this.run = km / 0.62 // Здесь не будет ошибки, но если private, то будет ошибка.
    }
}
```

### - ([К списку других тем](#start))

## 11. Упражнение делаем корзину товара <a name="11"></a> 

### Задача 

Необходимо сделать корзину (Cart) на сайте,

которая имееет список продуктов (Product), добавленных в корзину

и переметры доставки (Delivery). Для Cart реализовать методы:

- Добавить продукт в корзину
- Удалить продукт из корзины по ID
- Посчитать стоимость товаров в корзине
- Задать доставку
- Checkout - вернуть что всё ок, если есть продукты и параметры доставки

Product: id, название и цена

Delivery: может быть как до дома (дата и адрес) или до пункта выдачи (дата = Сегодня и Id магазина)

Пример кода
```
class Product {
constructor(
    public id: number,
    public title: string,
    public price: number,
) {}
}

class Delivery{
    constructor(
        public date: Date, 
    ) {}
}

class HomeDelivery extends Delivery {
    constructor( date: Date, public address: string
    ) {
        super(date);
    }
}

class ShopDelivery extends Delivery {
    constructor(public shopId: string) {
        super(new Date());
    }
}

type DeliveryOptions = HomeDelivery | ShopDelivery;

class Cart {
    private products: Product[] = [];
    private delivery: DeliveryOptions;

    // Добавление продукта 
    public addProduct(product: Product): void {
        this.products.push(product);
    } 

    public DeleteProductById(productId: number): void {
        this.products = this.products.filter((p: Product) => p.id !== productId);
    } 

    public getSum(): number {
        return this.products
            .map((p: Product) => p.price)
            .reduce((p1: number, p2: number) => p1 + p2);
    }

    public setDelivery(delivery: DeliveryOptions): void {
        this.delivery = delivery;
    }

    public checkOut() {
        if(this.products.length === 0) {
            throw new Error('Нет ни одного товара в корзине');
        }
        if(!this.delivery) {
            throw new Error('Не указан способ доставки');
        }
        return { success: true};
    }
}

const cart = new Cart();
cart.addProduct(new Product(1, 'Печенье', 1000))
cart.addProduct(new Product(2, 'Торт', 2000))
cart.addProduct(new Product(3, 'Конфета', 2000))
cart.DeleteProductById(1)
cart.setDelivery(new HomeDelivery(new Date(), ''))
console.log(cart.getSum())
console.log(cart.checkOut())
```

### - ([К списку других тем](#start)) 