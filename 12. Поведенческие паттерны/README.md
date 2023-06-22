# Поведенческие паттерны в TypeScript

### Начало 16.06.2023 г. - конец 19.06.2023 г.

### 8. Уроков суммарно

[Вернуться на главную страницу "TS-Practice"](https://github.com/skaylife/TS-Practice)

## Содержание и быстрое перемещение по темам <a name="start">

[1. Chain of Command ](#1)

[2. Mediator ](#2)

[3. Command ](#3)

[4. State  ](#4)

[5. Strategy ](#5)

[6. Iterator ](#6)

[7. Template Method ](#7)

[8. Observer ](#8)

## 1. Chain of Command <a name="1"></a> 

```
interface IMiddleware {
    next(mid: IMiddleware): IMiddleware
    handle(request: any): any;
}

abstract class AbstractMiddleware implements IMiddleware {
    private nextMiddleware!: IMiddleware;
    next(mid: IMiddleware): IMiddleware {
        this.nextMiddleware = mid;
        return mid;
    }
    handle(request: any) {
        if (this.nextMiddleware) {
            return this.nextMiddleware.handle(request);
        }
        return;
    }
}

class AuthMiddleware extends AbstractMiddleware {
    override handle(request: any) {
        console.log('AuthMiddleware')
        if (request.userId === 1) {
            return super.handle(request);
        }
        return {error: 'Вы не авторизованы'}
    }
}

class ValidateMiddleware extends AbstractMiddleware {
    override handle(request: any) {
        console.log('ValidateMiddleware')
        if (request.body) {
            return super.handle(request);
        }
        return {error: 'Нет body'}
    }
}

class Controller extends AbstractMiddleware {
    override handle(request: any) {
        console.log('Controller')
        return {success: request}
    }
}

const controller = new Controller();
const validate = new ValidateMiddleware();
const auth = new AuthMiddleware();

auth.next(validate).next(controller)
console.log(auth.handle({
    userId: 1,
    body: ("Working!")
}))

//Console.log

AuthMiddleware
ValidateMiddleware
Controller
{ success: { userId: 1, body: 'Working!' } }
```

### - ([К списку других тем](#start))

## 2. Mediator <a name="2"></a> 

```
interface Mediator {
    notify(sender: string, event: string): void 
}

abstract class Mediated {
    mediator!: Mediator;
    setMediator(mediator: Mediator) {
        this.mediator = mediator
    }
}

// Функции которые мы используем 
class Notifications {
    send() {
        console.log('Отправляю уведомление');
    }
}

class Log {
    log(message: string) {
        console.log(message);
    }
}

class EventHandler extends Mediated {
    myEvent() {
        this.mediator.notify("EventHandler", "MyEvent")
    }
}

// Основная близнес логика
class NotificationMediator implements Mediator {
    constructor(
        public notification: Notifications,
        public Logger: Log,
        public handler: EventHandler
    ) {}
    notify(_: string, event: string): void {
        switch(event) {
            case 'myEvent':
                this.notification.send();
                this.Logger.log("Отправленно")
                break;
        }
    }
}

const handler = new EventHandler()
const logger = new Log()
const notification = new Notifications()

const m = new NotificationMediator(
    notification,
    logger,
    handler
);
handler.setMediator(m);
handler.myEvent()
```

### - ([К списку других тем](#start))

## 3. Command <a name="3"></a> 

```
class User {
    constructor(public userId: number) {

    }
}

class CommandHistory {
    public commands: Command[] = [];
    push(command: Command) {
        this.commands.push(command);
    }
    remove(command: Command) {
        this.commands = this.commands.filter(c=> c.commandId !== command.commandId)
    }
}

abstract class Command {
    public commandId: number

    abstract execute(): void;

    constructor(public history:  CommandHistory) {
        this.commandId = Math.random()
    }
}

class AddUserCommand extends Command {
    constructor(
        private user: User, 
        private receiver: UserService, 
        history: CommandHistory) {
        super(history)
    }

    execute(): void {
        this.receiver.saveUser(this.user)
        this.history.push(this)
    }

    undo() {
        this.receiver.deleteUser(this.user.userId)
        this.history.remove(this)
    }
}

class UserService {
    saveUser(user: User) {
        console.log(`Сохраняю пользователя с id ${user.userId}`);
    }
    deleteUser(userId: number) {
        console.log(`Удаляю пользователя с id ${userId}`);
    }
}

class Controller {
    receiver!: UserService;
    history: CommandHistory = new CommandHistory;

    addReceiver(receiver: UserService) {
        this.receiver = receiver;
    }

    run() {
        const addUserCommand = new AddUserCommand(
            new User(1), 
            this.receiver, 
            this.history
        )
        addUserCommand.execute();
        console.log(addUserCommand.history)
        addUserCommand.undo();
        console.log(addUserCommand.history)
    }
}

const controller = new Controller();
controller.addReceiver(new UserService());
controller.run()

/// Console log

Сохраняю пользователя с id 1
<ref *1> CommandHistory {
  commands: [
    AddUserCommand {
      history: [Circular *1],
      commandId: 0.8042982789668081,
      user: [User],
      receiver: UserService {}
    }
  ]
}
Удаляю пользователя с id 1
CommandHistory { commands: [] }

```

### - ([К списку других тем](#start))

## 4. State <a name="4"></a> 

```
class DocumentItem {
    public text!: string;
    private state!: DocumentItemState;

    constructor() {
        this.setState(new DraftDocumentItemState())
    }

    getState() {
        return this.state;
    }

    setState(state: DocumentItemState) {
        this.state = state;
        this.state.setContext(this)
    }

    publishDoc() {
        this.state.publish()
    }

    deleteDoc() {
        this.state.delete()
    }
}

abstract class DocumentItemState {
    public name!: string;
    public item!: DocumentItem;

    public setContext(item: DocumentItem) {
        this.item = item;
    }

    public abstract publish(): void;
    public abstract delete(): void;
}

class DraftDocumentItemState extends DocumentItemState {
    constructor() {
        super();
        this.name = "DraftDocument"
    }

    public publish(): void {
        console.log(`На сайт отправлен текст ${this.item.text}`)
        this.item.setState(new PublishDocumentItemState)
    }
    public delete(): void {
        console.log(`Документ удален`)
    }
}

class PublishDocumentItemState extends DocumentItemState {
    constructor() {
        super();
        this.name = "PublishDocument"
    }

    public publish(): void {
        console.log("Нельзя опубликовать опубликованный документ")
    }
    public delete(): void {
        console.log("Снято с публикации")
        this.item.setState(new DraftDocumentItemState)
    }
}

const item = new DocumentItem();
item.text = "Мой пост"
console.log(item.getState());
item.publishDoc()
console.log(item.getState());
item.publishDoc()
item.deleteDoc()
console.log(item.getState());

// Console log

<ref *1> DraftDocumentItemState {
  name: 'DraftDocument',
  item: DocumentItem { state: [Circular *1], text: 'Мой пост' }
}
На сайт отправлен текст Мой пост
<ref *1> PublishDocumentItemState {
  name: 'PublishDocument',
  item: DocumentItem { state: [Circular *1], text: 'Мой пост' }
}
Нельзя опубликовать опубликованный документ
Снято с публикации
<ref *1> DraftDocumentItemState {
  name: 'DraftDocument',
  item: DocumentItem { state: [Circular *1], text: 'Мой пост' }
}
```

### - ([К списку других тем](#start))

## 5. Strategy <a name="5"></a> 

```
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

/// Console log

true
false
```

### - ([К списку других тем](#start))

## 6. Iterator <a name="6"></a> 

```
class Task {
    constructor(public priority: number) {}
}

class TaskList {
    private tasks: Task[] = []

    public sortByPriority() {
        this.tasks = this.tasks.sort((a, b) => {
            if(a.priority > b.priority) {
                return 1;
            } else if (a.priority  == b.priority) {
                return 0;
            } else {
                return -1;
            }
        })
    }    

    addTask(task: Task) {
        this.tasks.push(task)
    }

    public getTask() {
        return this.tasks;
    }

    public count() {
        return this.tasks.length;
    }

    public getIterator() {
        return new PriorityTaskIterator(this);
    }
}

interface IIterator<T> {
    current(): T | undefined;
    next(): T | undefined;
    prev(): T | undefined;
    index(): number;
}

class PriorityTaskIterator implements IIterator<Task> {
    private position: number = 0;
    private taskList: TaskList;

    constructor(taskList: TaskList) {
        // Приоритет
        taskList.sortByPriority()
        this.taskList = taskList;
    }

    current(): Task | undefined {
        return this.taskList.getTask()[this.position];
    }
    next(): Task | undefined {
        this.position++;
        return this.taskList.getTask()[this.position];
    }
    prev(): Task | undefined {
        this.position--;
        return this.taskList.getTask()[this.position];
    }
    index(): number {
        return this.position;
    }
}

const taskList = new TaskList();
taskList.addTask(new Task(8))
taskList.addTask(new Task(1))
taskList.addTask(new Task(3))

const iterator = taskList.getIterator()
console.log(iterator.current())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.prev())
console.log(iterator.index())

/// Console log

Task { priority: 1 }
Task { priority: 3 }
Task { priority: 8 }
Task { priority: 3 }
1
```

### - ([К списку других тем](#start))

## 7. Template Method <a name="7"></a> 

```
class Form {
    constructor(public name: string) {}
}

abstract class SaveForm<T> {
    public save(form: Form) {
        const res = this.fill(form);
        this.log(res);
        this.send(res)
    }

    protected abstract fill(form: Form): T;
    protected log(data: T): void {
        console.log(data)
    }
    protected abstract send(data: T): void
}

class FirstAPI extends SaveForm<string>{
    protected fill(form: Form): string {
        return form.name;
    }

    protected send(data: string): void {
        console.log(`Отправка ${data}`)
    }
}

class SecondAPI extends SaveForm<{fio: string}>{
    protected fill(form: Form): {fio: string}{
        return {fio: form.name}
    }
    
    protected send(data: {fio: string}): void {
        console.log(`Отправка ${data.fio}`)
    }
}

const form1 = new FirstAPI();
form1.save(new Form("Вася"))

const form2 = new SecondAPI();
form2.save(new Form("Вася 2"))

/// Console log

Вася
Отправка Вася
{ fio: 'Вася 2' }
Отправка Вася 2
```

### - ([К списку других тем](#start))

## 8. Observer <a name="8"></a> 

```
interface Observer {
    update(subject: Subject): void 
}

interface Subject {
    attach(observer: Observer): void
    detach(observer: Observer): void
    notify(): void
}

class Lead {
    constructor(public name: string, public phone: string) {}
}

class NewLead implements Subject{
    private observers: Observer[] = []
    public state!: Lead;

    attach(observer: Observer): void {
        if(this.observers.includes(observer)) {
            return;
        }
        this.observers.push(observer);
    }
    detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if(observerIndex == -1) {
            return
        }
        this.observers.splice(observerIndex, 1)
    }
    notify(): void {
        for (const observer of this.observers) {
            observer.update(this)
        }
    }
}

class NotificationService implements Observer{
    update(subject: Subject): void {
        console.log("NotificationService получил уведомление")
        console.log(subject)
    }
}

class LeadService implements Observer{
    update(subject: Subject): void {
        console.log("LeadService получил уведомление")
        console.log(subject)
    }
}

const subject = new NewLead();
subject.state = new Lead('Vasya', '00000')
const s1 = new NotificationService()
const s2 = new LeadService

subject.attach(s1);
subject.attach(s2);
subject.notify();
subject.detach(s1);
subject.notify();

/// Console log

NotificationService получил уведомление
NewLead {
  observers: [ NotificationService {}, LeadService {} ],
  state: Lead { name: 'Vasya', phone: '00000' }
}
LeadService получил уведомление
NewLead {
  observers: [ NotificationService {}, LeadService {} ],
  state: Lead { name: 'Vasya', phone: '00000' }
}
LeadService получил уведомление
NewLead {
  observers: [ LeadService {} ],
  state: Lead { name: 'Vasya', phone: '00000' }
}
```

### - ([К списку других тем](#start))