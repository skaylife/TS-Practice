interface User {
    name: string,
    age: number,
    skills: string[]

    log: (id: number) => string;
}

// Наследуем свойства и типы, + и добавляем еще одно roleId
interface UserWithRole extends User {
    roleId: number
}

// Альтернативное объединениие
interface Role {
    roleId: number
}

interface UserWithRoleAlt extends User, Role {
    createAt: Date;
}

let user: UserWithRoleAlt = {
    name : 'Petr',
    age: 11,
    skills: ['1', '2'],
    roleId: 1,
    createAt: new Date(),

    log(id) {
        return ''
    }
}

interface UserDic {
     // Мы получаем ключем ялвяется index, а значением User
    [index: number] : User
}