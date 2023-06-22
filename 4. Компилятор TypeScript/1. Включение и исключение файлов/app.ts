class User {
    name: string; // Если задвать свойство без конструктора будет ошибка

    constructor(name: string) { // Создание конструктора 
        this.name = name; // Инициализация свойств в констукторе
    }
}

const user = new User('Вася'); 
console.log(user);
user.name = 'Петя' // Задаем новое значение name = 'Петя'
console.log(user);

class Admin {
    // role: number; // Будет ошибка из-за "strictPropertyInitialization": true, нужно поставить false чтоб ушла ошибка
    role!: number; // Чтоб избежать ошибки, или раскоменнтировать. 
}

const admin = new Admin(); // присваиваем переменной admin = свойства класса Admin
admin.role = 1; // присватваем роль. 
