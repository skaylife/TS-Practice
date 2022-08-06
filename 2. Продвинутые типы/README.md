## 1. Union Тип
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