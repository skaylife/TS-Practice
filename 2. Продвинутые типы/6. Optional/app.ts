interface User {
    login: string;
    // password?: string; // ? - обозначает опциональность данного поля
    password: string | undefined; // обозначает опциональность данного поля но оно должно быть
}

const user: User = {
    login: 'a@a.ru',
    password: '1'
}

function multiply(first: number, second?: number): number {
    if (!second) {
        return first * first;
    } else {    
        return first * second;
    }
    
}

multiply(3, 2);

interface UserPro {
    login: string;
    password?: {
        type: 'primary' | 'secondary'
    };
}

function testPass(user: UserPro) {
    const t = user.password?.type;
}

function test(param?: string) {
    const t = param ?? multiply(5); // Проверка если params = null или undefined, если да то выполняем функцию multiply
}