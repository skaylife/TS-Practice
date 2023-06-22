let a = 5; 
let b: string = a.toString() // Преобразование типа number в string
let e: string = new String(a).valueOf() // String с большой буквы это конструктор типов 
let f: boolean = new Boolean(a).valueOf() 

let c = 'asd';
let d: number = parseInt(c);

interface User {
    name: string;
    email: string;
    login: string;
}

const user: User = {
    name: 'Семен',
    email: 'semen@22.org',
    login: 'vasya'
}  

interface Admin {
    name: string;
    role: number;
}

// В этом случае у аdmin будет, содержаться и email и login 
const admin: Admin = {
    ...user,
    role: 1
}

// Если использовать подобный подход, то тогда будет только у admin'a свойтво name = 'Семен'
function userToAdmin(user: User): Admin {
    return {
        name: user.name,
        role: 1
    }
}