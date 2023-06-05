interface User {
    name: string;
    age?: number;
    email: string;
}

type partial = Partial<User>; // Делает необязательными все полям ? 
const p: partial = {}

type required = Required<User> // Поля объязательные у required 
type readonly = Readonly<User> // Поля доступны только для четния 
type requiredAndReadonly = Required<Readonly<User>> // Все поля обязательные и доступны только для четния