type PaymentStatus = 'new' | 'paid';

class Payment {
    id: number;
    status: PaymentStatus = 'new';

    constructor(id: number) {
        this.id = id;
    }

    pay() {
        this.status = 'paid';
    }
}

class PersistentPayment extends Payment {
    databaseId: number;
    paidAt: Date;
        
    constructor() {
        const id = Math.random();
        super(id);
    }

    save() {
        // Сохранение в базу данных
    }

    // override pay(date?: Date) { // overrid (модификатор)
    pay(date?: Date) { // overrid (модификатор)
        super.pay();
        if(date) {
            this.paidAt = date;
        }
    }
}

// new Payment().
// new PersistentPayment().

// Вторая часть (2)

class User {
    name: string = 'user';

    constructor() {
        console.log(this.name)
    }
}

class Admin extends User {
    name: string = 'admin';

    constructor() {
        super();
        console.log(this.name);
    }
}