const a1: number = Math.random() > 0.5 ? 1 : 0; // Работа с JS

// Работа с типами
interface HTTPResponse<T extends 'success' | 'failed'> {
    code: number;
    data: T extends 'success' ? string : Error;
}

const suc: HTTPResponse<'success'> = {
    code: 200,
    data: 'done'
}

const err: HTTPResponse<'failed'> = {
    code: 200,
    data: new Error()
}

class User {
    id!: number;
    name!: string;
}

class UserPersistend extends User {
    dbId!: string;
}

function getUser(dbIdOrId: string | number): User | UserPersistend {
    if (typeof dbIdOrId === 'number') {
        return new User();
    } else {
        return new UserPersistend();
    }
}

type UserOrPersistend<T extends string | number> = T extends number ? User : UserPersistend;

function getUser2<T extends string | number>(id: T): UserOrPersistend<T>{
    if (typeof id === 'number') {
        return new User() as UserOrPersistend<T>;
    } else {
        return new UserPersistend();
    }
}

const res = getUser2(1)
const res2 = getUser2('asdsdf')