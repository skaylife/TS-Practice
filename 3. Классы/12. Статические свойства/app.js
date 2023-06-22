"use strict";
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus[PaymentStatus["Holded"] = 0] = "Holded";
    PaymentStatus[PaymentStatus["Processed"] = 1] = "Processed";
    PaymentStatus[PaymentStatus["Reversed"] = 2] = "Reversed";
})(PaymentStatus || (PaymentStatus = {}));
class Payment {
    constructor(id) {
        this.status = PaymentStatus.Holded;
        this.createdAt = new Date();
        this.id = id;
    }
    getPaymentLifeTime() {
        return new Date().getTime() - this.createdAt.getTime(); // Возрат времени жизни платежа
    }
    unholdPayment() {
        if (this.status == PaymentStatus.Processed) {
            throw new Error('Платеж не может быть возвращен');
        }
        this.status = PaymentStatus.Reversed;
    }
}
const payment = new Payment(1);
payment.unholdPayment();
console.log(payment);
const time = payment.getPaymentLifeTime();
// payment.status = PaymentStatus.Reversed;
console.log(time);
