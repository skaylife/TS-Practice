abstract class Controller { // Класс // Абстрактный класс нельзя инстансировать 
    abstract handle(req: any): void; // Свойство класса

    handleWithLogs(req: any): void {
        console.log('Start');
        this.handle(req);
        console.log('End');
    }
}

class UserController extends Controller {
    handle(req: any): void { // В абстрактоном свойстве при наследовании, нужно дублировать абстрактное свойство
        console.log()
    }
}
const c = new UserController() // Не будет ошибки
c.handleWithLogs('Req')

// new Controller() - будет error без дублирование handle 