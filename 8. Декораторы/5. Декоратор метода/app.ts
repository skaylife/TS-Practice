interface IUserService {
    users: number;
    getUsersInDatabase(): number;
}

class UserService implements IUserService {
    users: number = 1000;

    @Log()
    getUsersInDatabase(): number {
        throw new Error('Ошибка ')
    }
}

function Log() {
    return (
        target: Object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
    ) : TypedPropertyDescriptor<(...args: any[]) => any> | void => {
        console.log(target) // target где метод находится 
        console.log(propertyKey) // propertykey понять что это за метод 
        console.log(descriptor) // descriptor где содержится сама эта функция и ее параметры
        descriptor.value = () => {
            console.log('no error')
        }
    }
}
