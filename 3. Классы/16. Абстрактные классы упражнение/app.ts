abstract class Log {
    abstract log(message: string): void; 

    printDate(date: Date) {
        this.log(date.toString())
    }

}

class Logger extends Log {
    log(message: string): void {
        console.log(message)
    }

    LogWithDate(message: string) {
        this.printDate(new Date())
        this.log(message)
    }

}

const p = new Logger().LogWithDate('Сообщение')