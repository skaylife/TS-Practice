class User {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Users extends Array<User> {
    searchByName(name: string) {
        return this.filter(u => name === name)
    }

    override toString(): string {
        return this.map(u => u.name).join(',');
    }
}

const users = new Users();
users.push(new User('Вася'));
users.push(new User('Александр'));
console.log(users.toString());

class UserList {
    users: User[];

    push(u: User) {
        this.users.push(u);
    }
}

class Payment {
    date: Date;
}

class UserWithPayment extends Payment {
    name: string;
}

class UserWithPayment2 extends Payment {
    user: User;
    payment: Payment;

    constructor(user: User, payment: Payment) {
        super();
        this.payment = payment;
        this.user = user;
    }
}