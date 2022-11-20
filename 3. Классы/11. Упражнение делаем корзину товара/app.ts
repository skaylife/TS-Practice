class Product {
constructor(
    public id: number,
    public title: string,
    public price: number,
) {}
}

class Delivery{
    constructor(
        public date: Date, 
    ) {}
}

class HomeDelivery extends Delivery {
    constructor( date: Date, public address: string
    ) {
        super(date);
    }
}

class ShopDelivery extends Delivery {
    constructor(public shopId: string) {
        super(new Date());
    }
}

type DeliveryOptions = HomeDelivery | ShopDelivery;

class Cart {
    private products: Product[] = [];
    private delivery: DeliveryOptions;

    // Добавление продукта 
    public addProduct(product: Product): void {
        this.products.push(product);
    } 

    public DeleteProductById(productId: number): void {
        this.products = this.products.filter((p: Product) => p.id !== productId);
    } 

    public getSum(): number {
        return this.products
            .map((p: Product) => p.price)
            .reduce((p1: number, p2: number) => p1 + p2);
    }

    public setDelivery(delivery: DeliveryOptions): void {
        this.delivery = delivery;
    }

    public checkOut() {
        if(this.products.length === 0) {
            throw new Error('Нет ни одного товара в корзине');
        }
        if(!this.delivery) {
            throw new Error('Не указан способ доставки');
        }
        return { success: true};
    }
}

const cart = new Cart();
cart.addProduct(new Product(1, 'Печенье', 1000))
cart.addProduct(new Product(2, 'Торт', 2000))
cart.addProduct(new Product(3, 'Конфета', 2000))
cart.DeleteProductById(1)
cart.setDelivery(new HomeDelivery(new Date(), ''))
console.log(cart.getSum())
console.log(cart.checkOut())
