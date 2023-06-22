"use strict";
class User {
}
class Auth {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStategy(strategy) {
        this.strategy = strategy;
    }
    authUser(user) {
        return this.strategy.auth(user);
    }
}
class JWTStrategy {
    auth(user) {
        if (user.jwtToken) {
            return true;
        }
        return false;
    }
}
class GitGubStrategy {
    auth(user) {
        if (user.githubToken) {
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
auth.setStategy(new GitGubStrategy);
console.log(auth.authUser(user));
