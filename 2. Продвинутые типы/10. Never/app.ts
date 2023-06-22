function generateError(message: string): never {
    throw new Error(message) // Данная функция никогда не вернется 
}

function dumpErorr(): never {
    while (true) {

    }
}
// Пример рекурсии 
function rec(): never {
    return rec();
}

//const a: never = undefined;

type paymentAction = 'refund' | 'checkout' | 'reject';

function processAction(action: paymentAction) {
    switch(action) {
        case 'refund':
            //...
            break;
        case 'checkout':
            //...
            break;
        case 'reject':
            //...
            break;
        default:
            const _: never = action// _ пример неиспользуемая переменная 
            throw new Error('Нет такого action');
    }   
}



function isString(x: string | number): boolean {
    if (typeof x === 'string') {
        return true;
    } else if (typeof x === 'number') { // Проверка на тот случай если попадет undefinded
        return false;
    }
    generateError('ssss Error')
}