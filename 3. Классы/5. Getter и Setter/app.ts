class User {
    _login: string;
    password: string;

    // Сам Setter
    set Login(l: string) {
        this._login = 'user-' + l;
    } 

    // Сам Getter
    get Login() {
        return 'No Login';
    }
}

const user = new User(); 
user.Login = 'MyLogin';
console.log(user);