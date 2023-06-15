"use strict";
class Notify {
    send(template, to) {
        console.log(`Отправляю ${template}, ${to}`);
    }
}
class Log {
    log(message) {
        console.log(message);
    }
}
class Template {
    constructor() {
        this._template = [
            { name: 'other', template: '<h1>Шаблоно</h1>' }
        ];
    }
    getByName(name) {
        return this._template.find(t => t.name === name);
    }
}
class NotificationFacade {
    constructor() {
        this.notify = new Notify();
        this.logger = new Log();
        this.template = new Template();
    }
    send(to, templateName) {
        const data = this.template.getByName(templateName);
        if (!data) {
            this.logger.log('Не найден шаблон');
            return;
        }
        this.notify.send(data.template, to);
        this.logger.log('Шаблон отправлен');
    }
}
const s = new NotificationFacade();
s.send('a@A.ru', 'other');
