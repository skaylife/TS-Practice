# Продвинутые Типы

## Содержание и быстрое перемещение по темам <a name="start">

[1. Union Тип ](#Union_Тип)

[2. Literal Types ](#Literal_Types)

[3. Type Aliases ](#Type_Aliases)

[4. Interface ](#4)

## 1. Union Тип <a name="Union_Тип"></a> 
Union тип - который может нескольких типов.

Например : 
- string 
- number 
- boolean 

```
function loginId(id: string | number | boolean) {
    if (typeof id === 'string'){
        console.log(id) // - Здесь только String
    } else if (typeof id === 'number') {
        console.log(id)
    } else {
        console.log(id)
    }
}
```
И Дальше мы можем применять к данному типу соответсвующие методы. 
В первой проверке мы можем примнять к `id` только методы которые можно применить к string. 
И к другим аналогично. 

### - ([К списку других тем](#start)) 

## 2. Literal Types <a name="Literal_Types"></a> 
Литеральный тип - явялется точной переменной от JavaScript

Пример: 

```
// Задаем url - тип строку и method - либо тип post или get 
function fetchWithAuth(url: string, method: 'post' | 'get'): 1 | -1 {
    return -1
}
// Передаем параметры
fetchWithAuth('a', 'post')
// Пример с ошибкой TS не пропустит данную строку
fetchWithAuth('a', 'post2')
```

```
Создаем метод - которые явялется типом строка
let method = 'post'
// Так будет ошибка - так как method строка, а 'post'
fetchWithAuth('s', method)
```
Как исправить ошибкку ? 
```
let method = 'post' // - не будет работать 

// Вместо let - написать const 
const method = 'post'

// Так не будет ошибки 
fetchWithAuth('s', method)
```
В примере выше мы строго задали константу.

А если нам нужен let как момжно его оставить, и избежать ошибки? 

Использовать аккуратно!

```
let method = 'post'
fetchWithAuth('s', method as 'post')
```
### - ([К списку других тем](#start)) 

## 3. Type Aliases  <a name="Type_Aliases"></a> 

Type Aliases -  создание типов, и их дальнешее использование.

Пример:

```
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
```

### - ([К списку других тем](#start)) 

## 4. Interface <a name="4"></a> 

Использование iterface
Пример кода:
```
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
```

### - ([К списку других тем](#start)) 