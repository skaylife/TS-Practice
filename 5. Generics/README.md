# Generics в TypeScript

### Начало 14.02.2023 г. - конец //.//.//// г.

### *<number> Уроков суммарно 

[Вернуться на главную страницу "TS-Practice"](https://github.com/skaylife/TS-Practice)

## Содержание и быстрое перемещение по темам <a name="start">

[1. Пример встроенных Generics ](#1)

[2. Написание функции Generics ](#2)

[3. Упр. Преобразование функции в строку ](#3)

[4. Использование в типах ](#4)

[5. Strict режимы ](#5)

[6. Проверки кода)](#6)


## 1. Пример встроенных Generics <a name="1"></a> 

Array`<number>` - пример создание дженерика
```
const num: Array<number> = [1, 2, 3]; // Generic массив типа number

async function test() {
    const a = await new Promise<number>((resolve, reject) => {
        resolve(1);
    })
}

const check: Record<string, boolean> = {
    drive: true,
    kpp: false
}

```

### - ([К списку других тем](#start))
## 2. Написание функции Generics <a name="2"></a> 

Пример кода
```
function logMiddleware<T>(data: T): T  { // Можно предеать данные любого типа
    console.log(data);
    return data;
}

const res = logMiddleware<number>(10); // Res задаем определенный тип типа <number>

function getSplitHalf<T>(data: Array<T>): Array<T> { // Нужно строго задать Array, так как length есть именно там
    const l = data.length / 2;
    return data.splice(0, l);
}

getSplitHalf<number>([1, 3, 4]);
```
### - ([К списку других тем](#start))

## 3. Упр. Преобразование функции в строку <a name="3"></a> 

`Задача` - необходимо написать функцию toString, которая принимает любой тип и возвращает его строковое представление. Если не может, то возвращает undefined.

```
function toString<T>(data: T): string | undefined {
    if(Array.isArray(data)) {
        return data.toString();
    }
    switch (typeof data) {
        case 'string':
            return data;
        case 'number':
        case 'symbol':
        case 'bigint':
        case 'boolean':
        case 'function':
            return data.toString();
        case 'object':
            return JSON.stringify(data);
        default:
            return undefined;
    }
}

console.log(toString(3));
console.log(toString(true));
console.log(toString(['a', 'b']));
console.log(toString({a: 1}));
```

### - ([К списку других тем](#start))

## 4. Использование в типах <a name="4"></a> 

Использование типов интерфесов с `Generics`

```
function logMiddleware<T>(data: T): T {
    console.log(data);
    return data;
}

const res = logMiddleware<number>(10);

function getSplitedHalf<T>(data: Array<T>): Array<T> {
    const l = data.length / 2
    return data.splice(0, l);
}

getSplitedHalf<number>([1, 3, 4]);

const split: <T>(data: Array<T>) => Array<T> = getSplitedHalf;

interface ILogLine<T> {
    timeStamp: Date;
    data: T
}

type LogLineType<T> = {
    timeStamp: Date;
    data: T
}

const logLine: ILogLine<{a: number}> = {
    timeStamp: new Date(),
    data: {
        a: 1
    }
}
```

### - ([К списку других тем](#start))

## 5. Strict Режимы <a name="5"></a>

Использвоать по макисимум `Strict` режим

Файл `tsconfig.json`

```
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,     
```

### - ([К списку других тем](#start))

## 6. Проверки кода <a name="6"></a>

`tsconfig.json` 

```
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true     
```

### - ([К списку других тем](#start))

