class MyMap {
    private static instance: MyMap;

    map: Map<number, string> = new Map();

    private constructor() {}

    clean() {
        this.map = new Map();
    }

    public static get(): MyMap {
        if(!MyMap.instance) {
            MyMap.instance = new MyMap()
        }
        return MyMap.instance
    }
}

class Service1 {
    addMap(key: number, value: string) {
        // new MyMap() 
        const myMap = MyMap.get()
        myMap.map.set(key, value);
    }
}

class Service2 {
    getKeys(key: number) {
        // new MyMap() 
        const myMap = MyMap.get()
        myMap.clean();
        console.log(myMap.map.get(key))
    }
}

new Service1().addMap(1, 'Работает');
new Service2().getKeys(1)

// Ввыод в консоли =>
// Работает
// undefined 