# Generics в TypeScript

### Начало 14.02.2023 г. - конец //.//.//// г.

### *<number> Уроков суммарно 

[Вернуться на главную страницу "TS-Practice"](https://github.com/skaylife/TS-Practice)

## Содержание и быстрое перемещение по темам <a name="start">

[1. Пример встроенных Generics ](#1)

[2. Выводы компиляции ](#2)

[3. Методы классов ](#3)

[4. Перегрузка сигнатуры ](#4)

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

### Редактирование файла `tsconfig.json`

#### Включение областей 

Скомпелируются все файла кроме в `"files"` - а это `"app.ts"`
Файл - `tsconfig.json`
```
{
    "compilerOptions": {

    },
    "files": {
        "app.ts"
    }
}
```
Включение по определенному патерну
```
{
    "include": [
        "app*"
    ]
}
```
Любая папка 
```
    "include": [
        "/**/app*"
    ]
```
Конкретная папка `folder`
```
    "include": [
        "/folder/app*"
    ]
```
#### Исключение областей

`exclude` - исключает те файлы который там указаны.
В данном случае все файлы скомпелируются `app2.ts`, `app3.ts`, но `app.ts` не скомпелируется.
```
{
    "compilerOptions": {

    },
    "include": [
        "app*"
    ],
    "exclude": [
        "app.ts"
    ],
}
```

#### Наследование от других `tsconfig.json`

`"extends": "./"`
```
{
    "compilerOptions": {

    },
    "include": [
        "app*"
    ],
    "exclude": [
        "app.ts"
    ],
    "extends": "./"
}
```

#### Дополнительные опции - Если проект на `js` с `ts`

в `tsconfig.json` есть 

`allowJs: true`
`checkJs: true`

поумолчанию они выключены

### - ([К списку других тем](#start))
## 2. Выводы компиляции <a name="2"></a> 


- Все файлы которые будут билдиться - будут поммещаться в папку `build`
`tsconfig.json`
```
"outDir": "./build/"
```

- Отключение комментариев при компиляции 
`tsconfig.json`
```
"removeComments": true,
```

- Отключение компиляции при ошибке
`tsconfig.json`
```
"noEmitOnError": true,
```

- Создает связь между `JS` файлом и исходником `ts`


`tsconfig.json`
```
"sourceMap": true,
"inlineSourceMap": true, // Создает закоментированную строку в base64 (Что увеличивает объем файла)
"inlineSources": true, // Создает закоментированную строку в base64 (Что увеличивает объем файла)
```

- Создание файла с декларацией для авто комплита и что использовалось в `ts` файл с раширением `name.d.ts`
`tsconfig.json`
```
"declaration": true,
```

- Билд только с декларациями 
`tsconfig.json`
```
"emitDeclarationOnly": true,
```

### - ([К списку других тем](#start))

## 3. Язык и окружение <a name="3"></a> 

- target, lib
`tsconfig.json`
```
"target": "ES2016" // Используемый стандарт
"lib": [
    "DOM",
    "ES2016"
]
```

### - ([К списку других тем](#start))

## 4. Модули <a name="4"></a> 


`tsconfig.json`
```
"module": "commonjs" // Используемый стандарт
"rootDir": "./src" // Путь в котром будет происходить компиляция проекта

"path": {
    "@lib": ["./lib/my-lib] // Можно здать алиас и потом в проекте его ипортить import from @lib....
}

"resolveJsonModule": true, // Можно работать с JSon как с файлами JS
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

