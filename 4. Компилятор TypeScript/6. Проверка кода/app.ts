// class User {
//     name: string;
//     constructor(name: string) {
//         this.name = name
//     }
// }
// Альтернативная запись
class User {
    role?: 'admin' | 'user' | undefined; // Необязательное свойство
    constructor(public name: string) {
    }
}

function createUser(user: User) {
    // Логика
    const defaultUser = new User('default');
    defaultUser.role = 'admin'

    switch(user.role) {
        case 'admin':
            const a =7;
            break;
        case 'user':
            return true;
            const c = 1;
    }
}

interface IChecks {
    [check: string]: boolean;
}

const c: IChecks = {

}
const d = c ['drive']