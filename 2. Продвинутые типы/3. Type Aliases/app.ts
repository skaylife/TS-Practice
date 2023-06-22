type httpMethod = 'post' | 'get'; // Тип Union

type coolString = string;

function fetchWithAuth(url: coolString, method: httpMethod | 'get'): 1 | -1 {
    return -1
}
fetchWithAuth('a', 'post')

let method = 'pos2'

fetchWithAuth('s', method as 'post')

// Старая запись (типизация)
let userOld: {
    name: string,
    age: number,
    skills: string[]
} = {
    name : 'Petr',
    age: 11,
    skills: ['1', '2']
}

// Типизация через Aliases

type User = {
    name: string,
    age: number,
    skills: string[]
}

// Добавление еще одного типа
type Role = {
    id: number;
}
//  Использоваение нового типа id (Объеденение)
type UserWithRole = User & Role;

let user: UserWithRole = {
    name : 'Petr',
    age: 11,
    skills: ['1', '2'],
    id: 1
}