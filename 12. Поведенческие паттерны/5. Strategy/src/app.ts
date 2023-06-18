class User {
    githubToken!: string;
    jwtToken!: string;
}

interface AuthStratagy {
    auth(user: User): boolean;
}

class Auth {
    constructor(private strategy: AuthStratagy) {}

    setStategy(strategy: AuthStratagy) {
        this.strategy = strategy;
    }
    public authUser(user: User): boolean {
        return this.strategy.auth(user);
    }
}

class JWTStrategy implements AuthStratagy {
    auth(user: User): boolean {
        if(user.jwtToken) {
            return true;
        }
        return false;
    }
}

class GitGubStrategy implements AuthStratagy {
    auth(user: User): boolean {
        if(user.githubToken) {
            // Получае от api GitHub данные
            return true;
        }
        return false;
    }
}

const user = new User();
user.jwtToken = "token";
const auth = new Auth(new JWTStrategy());
console.log(auth.authUser(user));
auth.setStategy(new GitGubStrategy)
console.log(auth.authUser(user));