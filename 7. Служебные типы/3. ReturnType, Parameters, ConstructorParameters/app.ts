class User {
    constructor(public id: number, public name: string) {}
}

function getData(id: number): User {
    return new User(id, "Вася")
}

type RT = ReturnType<typeof getData> //RT = User
type RT2 = ReturnType<() => void> //RT = Void
type RT3 = ReturnType<<T>() => T> //RT = Unknown
type RT4 = ReturnType<<T extends string>() => T> //RT = string

type PT = Parameters<typeof getData> // PT = [id : number]
type PTnum = Parameters<typeof getData>[0] // Короткая запись, чтоб получить number

type first = PT[0] // Альтернативный вариант

type CP = ConstructorParameters<typeof User>; // CP = [id: number, name: string]
type IT = InstanceType<typeof User>; // IT = User instance