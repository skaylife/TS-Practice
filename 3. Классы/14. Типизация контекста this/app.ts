class UserBuilder {
    name: string;

    setName(name: string): this {
        this.name = name; // Присвоение контекста 
        return this;
    }

    // TypeGuards Для проверки 
    isAdmin(): this is AdminBuilder { // Проверка что isAdmin Это Админ Билдер
        return this instanceof AdminBuilder;
    }
}

class AdminBuilder  extends UserBuilder {
    roles: string[]; // Специально сделано различие, если его не будет то в runtime не будет разницы 
}

const res = new UserBuilder().setName('Семен');
const res2 = new AdminBuilder().setName('Семен');

let user: AdminBuilder | UserBuilder = new UserBuilder()

if (user.isAdmin()) {
    console.log(user); // Типы user - AdminBuilder
} else {
    console.log(user); // Типы user - UserBuilder
}