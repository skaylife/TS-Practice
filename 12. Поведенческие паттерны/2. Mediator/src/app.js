"use strict";
class Mediated {
    setMediator(mediator) {
        this.mediator = mediator;
    }
}
// Функции которые мы используем 
class Notifications {
    send() {
        console.log('Отправляю уведомление');
    }
}
class Log {
    log(message) {
        console.log(message);
    }
}
class EventHandler extends Mediated {
    myEvent() {
        this.mediator.notify("EventHandler", "MyEvent");
    }
}
// Основная близнес логика
class NotificationMediator {
    constructor(notification, Logger, handler) {
        this.notification = notification;
        this.Logger = Logger;
        this.handler = handler;
    }
    notify(_, event) {
        switch (event) {
            case 'myEvent':
                this.notification.send();
                this.Logger.log("Отправленно");
                break;
        }
    }
}
const handler = new EventHandler();
const logger = new Log();
const notification = new Notifications();
const m = new NotificationMediator(notification, logger, handler);
handler.setMediator(m);
handler.myEvent();
