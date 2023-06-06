# Манипуляция с типами в TypeScript

### Начало 06.06.2023 г. - конец **.**.2023 г. 

### ** Уроков суммарно

[Вернуться на главную страницу "TS-Practice"](https://github.com/skaylife/TS-Practice)

## Содержание и быстрое перемещение по темам <a name="start">

[1. Паттерн декоратора ](#1)

[2. Декоратор класса ](#2)

[3. ReturnType, Parameters, ConstructorParameters ](#3)

[4. Awaited ](#4)

## 1. Паттерн декоратора <a name="1"></a> 

Пример реализации декоратора через функцию(и)

```
interface IUserService {
    users: number;
    getUserInDatabase(): number;
}

class UserService implements IUserService {
    users: number = 1000;

    getUserInDatabase(): number {
        return this.users;
    }
}

function nullUser(obj: IUserService) {
    obj.users = 0;
    return obj;
}

function logUsers(obj: IUserService) {
    console.log('Users: ' + obj.users)
    return obj;
}

console.log(new UserService().getUserInDatabase()); // 1000
console.log(nullUser(new UserService).getUserInDatabase()); // 0
console.log(logUsers(nullUser(new UserService)).getUserInDatabase()); // 0
```

### - ([К списку других тем](#start))
## 2. Pick, Omit, Extract, Exclude <a name="2"></a> 

Чтоб не выдавало ошибку при использовании декораторов нужно в `tsconfig.json` активировать строчку `"experimentalDecorators": true,`

 ```
interface IUserService {
    users: number;
    getUserInDatabase(): number;
}

@threeUserAdvancend
@nullUser
class UserService implements IUserService {
    users!: number;

    getUserInDatabase(): number {
        return this.users;
    }
}

function nullUser(target: Function) {
    target.prototype.users = 0;
}

function threeUserAdvancend<T extends {new(...args: any[]): {}}>(constructor: T) {
    return class extends constructor {
        users = 3;
    }
}

console.log(new UserService().getUserInDatabase()); // 1000


 ```

### - ([К списку других тем](#start))

## 3. ReturnType, Parameters, ConstructorParameters <a name="3"></a> 

```
class User {
    constructor(public id: number, public name: string) {}
}

function getData(id: number): User {
    return new User(id, "Вася")
}

type RT = ReturnType<typeof getData> //RT = User
type RT2 = ReturnType<() => void> //RT = Void
type RT3 = ReturnType<<T>() => T> //RT = Unknown
type RT4 = ReturnType<<T extends string>() => T> //RT = string

type PT = Parameters<typeof getData> // PT = [id : number]
type PTnum = Parameters<typeof getData>[0] // Короткая запись, чтоб получить number

type first = PT[0] // Альтернативный вариант

type CP = ConstructorParameters<typeof User>; // CP = [id: number, name: string]
type IT = InstanceType<typeof User>; // IT = User instance
```


### - ([К списку других тем](#start))

## 4. Awaited <a name="4"></a> 

```
type A = Awaited<Promise<string>> // Вернет нам промис стринг
type A2 = Awaited<Promise<Promise<string>>> // Свложенным промисом 

interface IMenu {
    name: string;
    url: string;
}

async function getMenu():Promise<IMenu[]> {
    return [{name: "Аналитика", url: "analytics"}]
}

type R = Awaited<ReturnType<typeof getMenu>>

async function getArray<T>(x: T) {
    return [await x]
}
```

### - ([К списку других тем](#start))
