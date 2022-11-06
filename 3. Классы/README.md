# Классы в TypeScript

### Затрачено времени : `5 дней` которые растянулись в `90 дней`

### Начало 06.11.2022 г. - конец ../../.... г.

## Содержание и быстрое перемещение по темам <a name="start">

[1. Создание класса ](#1)

## 1. Создание класса <a name="1"></a> 

`constructor(name: string)` - передаем необходимые свойства класса. пр. #1
Или без него, но с изменением tsconfig `strictPropertyInitialization` на `false` #2

```
// #1 С конструктором 
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

// #2 Без него 
class Admin {
    // role: number; // Будет ошибка из-за "strictPropertyInitialization": true, нужно поставить false чтоб ушла ошибка
    role!: number; // Чтоб избежать ошибки, или раскоменнтировать. 
}

const admin = new Admin(); // присваиваем переменной admin = свойства класса Admin
admin.role = 1; // присватваем роль. 

```

### - ([К списку других тем](#start)) 