
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

function logId(id: string | number) {
    if (isString(id)) {
        console.log(id); 
    } else if (typeof id === 'number') {
        console.log('number', id)
    }
    id 
}

function isString(x: string | number): x is string {
    return typeof x === 'string'
}

function isAdmin(user: User | Admin): user is Admin {
    return 'role' in user; 
}

function isAdminAleternative(user: User | Admin): user is Admin {
    return (user as Admin).role !== 'undefined';
}

function setRoleZero(user: User | Admin) {
    if (isAdmin(user)) {
        user.role = 0
    } else {
        throw new Error('Пользователь не Админ')
    }
}