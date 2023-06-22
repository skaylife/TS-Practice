class UserService {
    private static db: any;

    static getUser(id: number) {
        return UserService.db.findById(id);
    }

    create() {
        UserService.db
    }

    static { // Инициализатор статичного класса // Неасинхронный
        UserService.db = 'sdf';
    }
}

// UserService.db()

UserService.getUser(2)
const inst = new UserService()
inst.create()