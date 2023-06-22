//Тип валидации
interface IForm {
    name: string;
    password: string;
}
// Данные для валидации
const form: IForm = {
    name: 'Вася',
    password: '123'
}
//Этап валидации
const formValidation: Validation<IForm> = {
    name: {isValid: true},
    password: {isValid: false, errorMessage: 'Пароль должен быть не меньше 5 символов'}
}
// Принцип валидации 
type  Validation<T> = {
    [K in keyof T]: {
        isValid: true
    } | {
        isValid: false;
        errorMessage: string;
    }
}