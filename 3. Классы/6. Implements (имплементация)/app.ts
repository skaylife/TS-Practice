interface ILogger {
    log: (...args)=> void; // Альтернативная запись 
    error(...args): void;
}

class Loger implements ILogger {
    log: (...args: any[]) => void {
        console.log(...args);
    }
    async error(...args: any[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

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
    pay(paymentId: number): void {
        throw new Error('Method not implemented')
    }
    price?: number | undefined;
}