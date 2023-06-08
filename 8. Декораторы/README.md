# Манипуляция с типами в TypeScript

### Начало 06.06.2023 г. - конец **.**.2023 г. 

### ** Уроков суммарно

[Вернуться на главную страницу "TS-Practice"](https://github.com/skaylife/TS-Practice)

## Содержание и быстрое перемещение по темам <a name="start">

[1. Паттерн декоратора ](#1)

[2. Декоратор класса ](#2)

[3. Фабрика декораторов ](#3)

[4. Упражнение - Декоратор CreatedAt ](#4)

[5. Декоратор метода ](#5)

[6. Упражнение - Декоратор перехвата ошибок ](#6)

[7. Декоратор свойства ](#7)

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

## 3. Фабрика декораторов <a name="3"></a> 

Инициализация происходит в порядке в котором они написаны, а исполняются уже в обратном порядке

```
interface IUserService {
    users: number;
    getUserInDatabase(): number;
}

// Инициализация происходит в порядке в котором они написаны, а исполняются уже в обратном порядке
@threeUserAdvancend
@setUsers(2) // 2 вывод
@log() // 2 вывод
@setUserAdvancend(4) // 4 вывод
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

function setUsers(users: number) {
    return (target: Function) => {
        target.prototype.users = users;
    } 
}

function log() {
    return (target: Function) => {

    }
}

function setUserAdvancend(users: number) {
    return <T extends {new(...args: any[]): {}}>(constructor: T) => {
        return class extends constructor {
            users = 3;
        }
    }
}

function threeUserAdvancend<T extends {new(...args: any[]): {}}>(constructor: T) {
    return class extends constructor {
        users = 3;
    }
}

console.log(new UserService().getUserInDatabase()); // 1000


```


### - ([К списку других тем](#start))

## 4. Упражнение - Декоратор CreatedAt <a name="4"></a> 

Пример создание декоратора, он не делает модфикацию class я создает экземпляр с дополнительным свойством `createAt = new Date()` сам декоратор `@CreatedAt`
```
interface IUserService {
    users: number;
    getUsersInDatabase(): number;
}

@CreatedAt
class UserService implements IUserService {
    users: number = 1000;
    getUsersInDatabase(): number {
        return this.users
    }
}

function CreatedAt<T extends {new(...args: any[]): {}}>(constructor: T) {
    return class extends constructor {
        createdAt = new Date();
    }
}

type CreatedAt = {
    createdAt: Date;
}

console.log((new UserService() as IUserService & CreatedAt).createdAt)
```

### - ([К списку других тем](#start))

## 5. Декоратор метода <a name="5"></a> 

Декоратор `@Log()` модифицирует и меняет результат работы метода класса `UserService` метод `getUsersInDatabase()` на 

```
descriptor.value = () => {
    console.log('no error')
}
```

в результате вывод будет не `throw new Error('Ошибка ')` а будет `console.log('no error')`

```javascript

interface IUserService {
    users: number;
    getUsersInDatabase(): number;
}

class UserService implements IUserService {
    users: number = 1000;

    @Log()
    getUsersInDatabase(): number {
        throw new Error('Ошибка ')
    }
}

function Log() {
    return (
        target: Object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
    ) : TypedPropertyDescriptor<(...args: any[]) => any> | void => {
        console.log(target) // target где метод находится 
        console.log(propertyKey) // propertykey понять что это за метод 
        console.log(descriptor) // descriptor где содержится сама эта функция и ее параметры
        descriptor.value = () => {
            console.log('no error')
        }
    }
}

```

### - ([К списку других тем](#start))

## 6. Упражнение - Декоратор перехвата ошибок <a name="6"></a> 

```
interface IUserService {
    users: number;
    getUsersInDatabase(): number;
}

class UserService implements IUserService {
    users: number = 1000;

    @Catch({ rethrow: true })
    getUsersInDatabase(): number {
        throw new Error('Ошибка ')
    }
}

function Catch({rethrow}: {rethrow: boolean} = {rethrow : true}) {
    return (
        target: Object,
        _: string | symbol,
        descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
    ) : TypedPropertyDescriptor<(...args: any[]) => any> | void => {
        const method = descriptor.value;
        descriptor.value = async (...args: any[]) => {
            try {
                return await method?.apply(target, args)
            } catch(e) {
                if (e instanceof Error) {
                    console.log(e.message)
                    if (rethrow) {
                        throw e;
                    }
                }
            }
        }
    }
}
```

### - ([К списку других тем](#start))

## 7. Декоратор свойства <a name="7"></a> 

Пример одной из валидаций через декоратор

```
interface IUserService {
    users: number;
    getUsersInDatabase(): number;
}

class UserService implements IUserService {
    @Max(100)
    users: number = 1000;

    getUsersInDatabase(): number {
        throw new Error('Ошибка ')
    }
}

function Max(max: number) {
    return(
        target: Object,
        propertyKey: string | symbol
    ) => {
        let value: number;
        const setter = function (newValue: number) {
            if (newValue > max) {
                console.log("Нельзя утсановить значение больше " + max)
            } else {
                value = newValue;
            }
        }

        const getter = function () {
            return value;
        }

        Object.defineProperty(target, propertyKey, {
            set: setter,
            get: getter
        })
    }
}

const userService = new UserService();
userService.users = 1;
console.log(userService.users)
userService.users = 1000;
console.log(userService.users)
```

### - ([К списку других тем](#start))
