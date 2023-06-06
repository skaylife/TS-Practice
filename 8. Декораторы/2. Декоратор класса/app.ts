interface IUserService {
    users: number;
    getUserInDatabase(): number;
}

@threeUserAdvancend
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

function threeUserAdvancend<T extends {new(...args: any[]): {}}>(constructor: T) {
    return class extends constructor {
        users = 3;
    }
}

console.log(new UserService().getUserInDatabase()); // 1000

