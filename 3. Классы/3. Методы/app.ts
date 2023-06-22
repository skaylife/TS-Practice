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

const payment = new Payment(1);
payment.unholdPayment();
console.log(payment)
const time = payment.getPaymentLifeTime();
// payment.status = PaymentStatus.Reversed;
console.log(time);