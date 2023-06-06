interface IUserService {
    users: number;
    getUserInDatabase(): number;
}

// Инициализация происходит в порядке в котором они написаны, а исполняются уже в обратном порядке
@threeUserAdvancend
@setUsers(2) // 2 вывод
@log() // 2 вывод
@setUserAdvancend(4) // 4 вывод
@nullUser
class UserService implements IUserService {
    users!: number;

    getUserInDatabase(): number {
        return this.users;
    }
}

function nullUser(target: Function) {
    target.prototype.users = 0;
}

function setUsers(users: number) {
    return (target: Function) => {
        target.prototype.users = users;
    } 
}

function log() {
    return (target: Function) => {

    }
}

function setUserAdvancend(users: number) {
    return <T extends {new(...args: any[]): {}}>(constructor: T) => {
        return class extends constructor {
            users = 3;
        }
    }
}

function threeUserAdvancend<T extends {new(...args: any[]): {}}>(constructor: T) {
    return class extends constructor {
        users = 3;
    }
}

console.log(new UserService().getUserInDatabase()); // 1000

