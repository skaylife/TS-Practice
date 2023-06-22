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