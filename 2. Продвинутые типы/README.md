# Продвинутые Типы

## Содержание и быстрое перемещение по темам

[1. Union Тип ](#Union_Тип)

[2. Literal Types ](#Literal_Types)

[3. Type Aliases ](#Type_Aliases)

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

## 3. Type Aliases <a name="Type_Aliases"></a> 