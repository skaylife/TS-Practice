# Структурные паттерны в TypeScript

### Начало 15.06.2023 г. - конец **.**.2023 г.

### 5. Уроков суммарно

[Вернуться на главную страницу "TS-Practice"](https://github.com/skaylife/TS-Practice)

## Содержание и быстрое перемещение по темам <a name="start">

[1. Bridge ](#1)

[2. Facade ](#2)

[3. Adapter ](#3)

[4. Builder ](#4)


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

## 3. Prototype <a name="3"></a> 

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

## 4. Builder <a name="4"></a> 

```
enum ImageFormat {
    Png = 'png',
    Jpeg = 'jpeg' 
}

interface IResolution {
    width: number,
    height: number
}

interface IImageConversion extends IResolution {
    format: ImageFormat
}

class ImageBuilder {
    private formats: ImageFormat[] = []
    private resolutions: IResolution[] = []

    addPng() {
        if(this.formats.includes(ImageFormat.Png)) {
            return this;
        }
        this.formats.push(ImageFormat.Png);
        return this;
    }

    addJpeg() {
        if(this.formats.includes(ImageFormat.Jpeg)) {
            return this;
        }
        this.formats.push(ImageFormat.Png);
        return this;
    }

    addResolution(width: number, height: number) {
        this.resolutions.push({ width, height });
        return this;
    }

    build(): IImageConversion[] {
        const res: IImageConversion[] = [];
        for (const r of this.resolutions) {
            for (const f of this.formats) {
                    res.push(
                        {   width: r.width, 
                            height: r.height, 
                            format: f });
                }
        }
        return res;
    }
}

console.log(new ImageBuilder()
    .addJpeg()
    .addPng()
    .addResolution(100, 50)
    .addResolution(100, 80)
    .build()
)

// Console log
  <!-- { width: 100, height: 50, format: 'png' },
  { width: 100, height: 80, format: 'png' } -->
```

### - ([К списку других тем](#start))

