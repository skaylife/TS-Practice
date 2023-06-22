class User {
    // Чтоб не было ошибки у name и age - "strictPropertyInitialization": false, 
    name: string; // Если задвать свойство без конструктора будет ошибка
    age: number;

    // Конструктор возвращает User'a 
    constructor(); // Без передачи аргумента
    constructor(name: string); // только name
    constructor(age: number); // только возраст
    constructor(ageOrName?: string | number, age?: number) { // Создание конструктора 
        if (typeof ageOrName === 'string') {
            this.name = ageOrName; // Инициализация свойств в констукторе
        } else if (typeof ageOrName === 'number') {
            this.age = ageOrName;
        }
        if (typeof age === 'number') {
            this.age = age;
        }
        } 
}

const user = new User('Вася'); 
const user2 = new User(); 
const user3 = new User(33); 
const user4 = new User('Семен', 11); 

