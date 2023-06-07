interface IUserService {
    users: number;
    getUsersInDatabase(): number;
}

class UserService implements IUserService {
    users: number = 1000;

    @Catch({ rethrow: true })
    getUsersInDatabase(): number {
        throw new Error('Ошибка ')
    }
}

function Catch({rethrow}: {rethrow: boolean} = {rethrow : true}) {
    return (
        target: Object,
        _: string | symbol,
        descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
    ) : TypedPropertyDescriptor<(...args: any[]) => any> | void => {
        const method = descriptor.value;
        descriptor.value = async (...args: any[]) => {
            try {
                return await method?.apply(target, args)
            } catch(e) {
                if (e instanceof Error) {
                    console.log(e.message)
                    if (rethrow) {
                        throw e;
                    }
                }
            }
        }
    }
}
