let input: unknown;

input = 4;
input = ['sss', '111']

// let res: string = input;

function run(i: unknown) {
    if (typeof i == 'number') {
        i++
    } else {
        i
    }
}

run(input)
// Лучше испольщовать явную проверку
async function getData() {
    try {
        fetch('');
    } catch(error) {
        if (error instanceof Error) {
            console.log(error.message) // Делаем явную проверку // error с типом string
        }
        //console.log(erorr.message) - старый варинт с ошибкой сейчас будет. так как тип unknown
    }
}
// Пример с неявной проверкой 
async function getDataForce() {
    try {
        fetch('');
    } catch(error) {
        const a = error as Error
    }
}

type U1 = unknown | null;  // Если есть вариант с unknown, то применяется именно он.

type I1 = unknown & string; // Интерсектион - то здесь будет тип string

