class Payment {
    private date: Date = new Date();

    getDate(this: Payment) {
        return this.date;
    }

   getDateArrow = () => {
        return this.date
   } 
}

const p = new Payment();

const user = {
    id: 1,
    // paymentDate: p.getDate - Потеря контекста this 
    paymentDate: p.getDate.bind(p), // С контекстом 
    paymentDateArrow: p.getDateArrow
}

console.log(p.getDate());
console.log(user.paymentDate());
console.log(user.paymentDateArrow());

class PaymentPersistent extends Payment {
    save() {
        // return super.getDate();
        return this.getDateArrow()
    }
}

console.log(new PaymentPersistent().save())