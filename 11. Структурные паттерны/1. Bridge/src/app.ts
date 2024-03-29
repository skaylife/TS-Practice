interface IProvider {
    sendMessage(message: string): void;
    connect(config: unknown): void;
    disconnect(): void;
}

class TelegramProvider implements IProvider {
    sendMessage(message: string): void {
        console.log(message);
    }
    connect(config: string): void {
        console.log(config);
    }
    disconnect(): void {
        console.log('disconnect Telegram');
    }
}

class WhatsUpProvider implements IProvider {
    sendMessage(message: string): void {
        console.log(message);
    }
    connect(config: string): void {
        console.log(config);
    }
    disconnect(): void {
        console.log('disconnect WhatsApp');
    }
}

class NotificationSender {
    constructor(private provider: IProvider) {}

    send() {
        this.provider.connect('connect')
        this.provider.sendMessage('message')
        this.provider.disconnect();
    }
}

class DelayNotificationSender extends NotificationSender {

    constructor(provider: IProvider) {
        super(provider);
    }

    sendDelayed() {
        console.log('Delayed notification message')
    }
}

const sender = new DelayNotificationSender(new TelegramProvider())
sender.send();

const sender2 = new DelayNotificationSender(new WhatsUpProvider())
sender2.send();