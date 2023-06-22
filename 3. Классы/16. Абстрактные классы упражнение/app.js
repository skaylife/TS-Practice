"use strict";
class Log {
    printDate(date) {
        this.log(date.toString());
    }
}
class Logger extends Log {
    log(message) {
        console.log(message);
    }
    LogWithDate(message) {
        this.printDate(new Date());
        this.log(message);
    }
}
const p = new Logger().LogWithDate('Сообщение');
