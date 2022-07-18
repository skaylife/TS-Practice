enum StatusCode {
    SUCCESS = 1,
    IN_PROGRESS = 2,
    FAILED = 3
}

const res = { 
    message: 'Платеж успешен',
    statusCode: StatusCode.SUCCESS,
}

// 1 - Успех
// 2 - в процессе
// 3 - Отклонен

// Enum может быть string, number || Обращение правильней делать по StatusCode.SUCCESS

// Првоерка 

if (res.statusCode === StatusCode.SUCCESS) {
    
} 

function complete() {
    return 3;
}

const enum Roles {
    ADMIN = 1,
    USER = 2
}

const res2 = Roles.ADMIN