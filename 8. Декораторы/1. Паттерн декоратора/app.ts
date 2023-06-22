interface IUserService {
    users: number;
    getUserInDatabase(): number;
}

class UserService implements IUserService {
    users: number = 1000;

    getUserInDatabase(): number {
        return this.users;
    }
}

function nullUser(obj: IUserService) {
    obj.users = 0;
    return obj;
}

function logUsers(obj: IUserService) {
    console.log('Users: ' + obj.users)
    return obj;
}

console.log(new UserService().getUserInDatabase()); // 1000
console.log(nullUser(new UserService).getUserInDatabase()); // 0
console.log(logUsers(nullUser(new UserService)).getUserInDatabase()); // 0