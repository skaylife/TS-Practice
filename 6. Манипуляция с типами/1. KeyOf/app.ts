interface IUser {
    name: string;
    age: number;
}

type KeysOfUser = keyof IUser;

const key: KeysOfUser = 'age';

// Функция использует generics <T> И ключ должен былть как сам объект Т
function getValue<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

const user: IUser = {
    name: 'Вася',
    age: 30
}

const userName = getValue(user, 'name')  // Если использовать names - будет ОШИБКА ERORR, так как ключ затипизирован