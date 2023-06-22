const n: null = null; // Можем присвоить строго хначение null, это не может быть undefinded/ 
const n1: any = null; 
const n2: number = null;  // Ошибка 
const n3: string = null;  // Ошибка 
const n4: boolean = null; // Ошибка 
const n5: undefined = null; // Ошибка 

interface User {
    name: string;
}

function getUser(): User {
    if (Math.random() > 0.5) {
        // return // Неправильная запись и возвратом будет undefined
        return null as any; // Решение проблемы 
    } else {
        return {
            name: 'Сергей'
        } as User 
    }
}

const user = getUser();
if(user) {
    const param = user.name;
}