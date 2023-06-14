function Uni(name: string): any {
    console.log(`Инициализация ${name}`)
    return function() {
        console.log(`Вызов: ${name}`)
    }
}

@Uni("Класс")
class MyClass {
    @Uni("Свойство")
    props?: any;

    @Uni('Свойство static')
    static prop2?: any;

    @Uni('Метод')
    method(@Uni('Параметр метода')_: string) {}

    
    @Uni('Метод')
    static method2(@Uni('Параметр метода static')_: string) {}

    constructor (@Uni('Параметр конструктора')_: string) {

    }
}