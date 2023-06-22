# Структурные паттерны в TypeScript

### Начало 15.06.2023 г. - конец 15.06.2023 г.

### 5. Уроков суммарно

[Вернуться на главную страницу "TS-Practice"](https://github.com/skaylife/TS-Practice)

## Содержание и быстрое перемещение по темам <a name="start">

[1. Bridge ](#1)

[2. Facade ](#2)

[3. Adapter ](#3)

[4. Proxy  ](#4)

[5. Composite ](#5)


## 1. Bridge <a name="1"></a> 

```
interface IProvider {
    sendMessage(message: string): void;
    connect(config: unknown): void;
    disconnect(): void;
}

class TelegramProvider implements IProvider {
    sendMessage(message: string): void {
        console.log(message);
    }
    connect(config: string): void {
        console.log(config);
    }
    disconnect(): void {
        console.log('disconnect Telegram');
    }
}

class WhatsUpProvider implements IProvider {
    sendMessage(message: string): void {
        console.log(message);
    }
    connect(config: string): void {
        console.log(config);
    }
    disconnect(): void {
        console.log('disconnect WhatsApp');
    }
}

class NotificationSender {
    constructor(private provider: IProvider) {}

    send() {
        this.provider.connect('connect')
        this.provider.sendMessage('message')
        this.provider.disconnect();
    }
}

class DelayNotificationSender extends NotificationSender {

    constructor(provider: IProvider) {
        super(provider);
    }

    sendDelayed() {
        console.log('Delayed notification message')
    }
}

const sender = new DelayNotificationSender(new TelegramProvider())
sender.send();

const sender2 = new DelayNotificationSender(new WhatsUpProvider())
sender2.send();

//Console.log

connect
message
disconnect Telegram
connect
message
disconnect WhatsApp
```

### - ([К списку других тем](#start))
## 2. Facade <a name="2"></a> 

```
class Notify { 
    send(template: string, to: string) {
        console.log(`Отправляю ${template}, ${to}`);
    }
}

class Log {
    log(message: string) {
        console.log(message);
    }
}

class Template {
    private _template = [
        { name: 'other', template: '<h1>Шаблоно</h1>'}
    ]

    getByName(name: string) {
        return this._template.find(t => t.name === name)
    }
}

class NotificationFacade {
    private notify: Notify;
    private logger: Log;
    private template: Template;

    constructor() {
        this.notify = new Notify();
        this.logger = new Log();
        this.template = new Template();
    }

    send(to: string, templateName: string) {
        const data = this.template.getByName(templateName);
        if(!data) {
            this.logger.log('Не найден шаблон')
            return;
        }
        this.notify.send(data.template, to);
        this.logger.log('Шаблон отправлен');
    }
}

const s = new NotificationFacade()
s.send('a@A.ru', 'other')

//Console log 

Отправляю <h1>Шаблоно</h1>, a@A.ru
Шаблон отправлен
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

