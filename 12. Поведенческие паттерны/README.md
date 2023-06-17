# Поведенческие паттерны в TypeScript

### Начало 16.06.2023 г. - конец **.06.2023 г.

### 5. Уроков суммарно

[Вернуться на главную страницу "TS-Practice"](https://github.com/skaylife/TS-Practice)

## Содержание и быстрое перемещение по темам <a name="start">

[1. Chain of Command ](#1)

[2. Mediator ](#2)

[3. Adapter ](#3)

[4. Proxy  ](#4)

[5. Composite ](#5)


## 1. Chain of Command <a name="1"></a> 

```
interface IMiddleware {
    next(mid: IMiddleware): IMiddleware
    handle(request: any): any;
}

abstract class AbstractMiddleware implements IMiddleware {
    private nextMiddleware!: IMiddleware;
    next(mid: IMiddleware): IMiddleware {
        this.nextMiddleware = mid;
        return mid;
    }
    handle(request: any) {
        if (this.nextMiddleware) {
            return this.nextMiddleware.handle(request);
        }
        return;
    }
}

class AuthMiddleware extends AbstractMiddleware {
    override handle(request: any) {
        console.log('AuthMiddleware')
        if (request.userId === 1) {
            return super.handle(request);
        }
        return {error: 'Вы не авторизованы'}
    }
}

class ValidateMiddleware extends AbstractMiddleware {
    override handle(request: any) {
        console.log('ValidateMiddleware')
        if (request.body) {
            return super.handle(request);
        }
        return {error: 'Нет body'}
    }
}

class Controller extends AbstractMiddleware {
    override handle(request: any) {
        console.log('Controller')
        return {success: request}
    }
}

const controller = new Controller();
const validate = new ValidateMiddleware();
const auth = new AuthMiddleware();

auth.next(validate).next(controller)
console.log(auth.handle({
    userId: 1,
    body: ("Working!")
}))

//Console.log

AuthMiddleware
ValidateMiddleware
Controller
{ success: { userId: 1, body: 'Working!' } }
```

### - ([К списку других тем](#start))

## 2. Mediator <a name="2"></a> 

```
interface Mediator {
    notify(sender: string, event: string): void 
}

abstract class Mediated {
    mediator!: Mediator;
    setMediator(mediator: Mediator) {
        this.mediator = mediator
    }
}

// Функции которые мы используем 
class Notifications {
    send() {
        console.log('Отправляю уведомление');
    }
}

class Log {
    log(message: string) {
        console.log(message);
    }
}

class EventHandler extends Mediated {
    myEvent() {
        this.mediator.notify("EventHandler", "MyEvent")
    }
}

// Основная близнес логика
class NotificationMediator implements Mediator {
    constructor(
        public notification: Notifications,
        public Logger: Log,
        public handler: EventHandler
    ) {}
    notify(_: string, event: string): void {
        switch(event) {
            case 'myEvent':
                this.notification.send();
                this.Logger.log("Отправленно")
                break;
        }
    }
}

const handler = new EventHandler()
const logger = new Log()
const notification = new Notifications()

const m = new NotificationMediator(
    notification,
    logger,
    handler
);
handler.setMediator(m);
handler.myEvent()
```

### - ([К списку других тем](#start))

## 3. Adapter <a name="3"></a> 

```
class KVDatabase {
    private db: Map<string, string> = new Map();
    save(key: string, value: string) {
        this.db.set(key, value);
    }
}

class PersistentDB {
    savePersistent(data: Object) {
        console.log(data)
    }
}

class PersistentDBAdapter extends KVDatabase {
    constructor(public database: PersistentDB) {
        super();
    }

    override save( key: string, value: string): void {
        this.database.savePersistent({key, value});
    }
}

function run(base: KVDatabase) {
    base.save("key", "myValue")
}

run(new PersistentDBAdapter(new PersistentDB))

//Console log

{ key: "key", value: "myValue" }
```

### - ([К списку других тем](#start))

## 4. Proxy <a name="4"></a> 

```
interface IPaymentAPI {
    getPaymentDetail(id: number): IPaymentDetail | undefined;
}

interface IPaymentDetail {
    id: number,
    sum: number,
}

class PaymentAPI implements IPaymentAPI {
    private data = [{id: 1, sum: 10000}]
    getPaymentDetail(id: number): IPaymentDetail | undefined {
        return this.data.find(d => d.id === id)
    }
}

class PaymentAccessProxy {
    constructor(private api: PaymentAPI, private userId: number) {}

    getPaymentDetail(id: number): IPaymentDetail | undefined {
        if (this.userId === 1) {
            return this.api.getPaymentDetail(id)
        }
        console.log("Попытка получить данные платежа!")
        return undefined;
    }
}

const proxy = new PaymentAccessProxy(new PaymentAPI(), 1)
console.log(proxy.getPaymentDetail(1))

const proxy2 = new PaymentAccessProxy(new PaymentAPI(), 2)
console.log(proxy2.getPaymentDetail(1))

// Console log

{ id: 1, sum: 10000 }
    Попытка получить данные платежа!
    undefined
```

### - ([К списку других тем](#start))

## 5. Composite <a name="5"></a> 

```
abstract class DeliveryItem {
    items: DeliveryItem[] = [];

    addItem(item: DeliveryItem){
        this.items.push(item);
    }

    getItemPrice(): number {
        return this.items.reduce((acc: number, i: DeliveryItem)=> acc += i.getPrice(), 0);
    };

    abstract getPrice(): number
}

export class DeliveryShop extends DeliveryItem {
    constructor(private deliveryFee: number) {
        super();
    }

    getPrice(): number {
        return this.getItemPrice() + this.deliveryFee;
    }
}

class Package extends DeliveryItem {
    getPrice(): number {
        return this.getItemPrice();
    }
}

class Product extends DeliveryItem {
    constructor(private price: number) {
        super();
    }
    getPrice(): number {
        return this.price
    }
}

const shop = new DeliveryShop(100);
shop.addItem(new Product(1000));

const pack1 = new Package()
pack1.addItem(new Product(200));
pack1.addItem(new Product(300));
shop.addItem(pack1);

const pack2 = new Package();
pack2.addItem(new Product(20));
shop.addItem(pack2);

console.log("Общая сумма: " + shop.getPrice())

// Console log

Общая сумма: 1620
```

### - ([К списку других тем](#start))

