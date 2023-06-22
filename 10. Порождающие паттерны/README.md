# Порождающие паттерны в TypeScript

### Начало 14.06.2023 г. - конец 15.06.2023 г.

### 4. Уроков суммарно

[Вернуться на главную страницу "TS-Practice"](https://github.com/skaylife/TS-Practice)

## Содержание и быстрое перемещение по темам <a name="start">

[1. Factory Method ](#1)

[2. Singleton ](#2)

[3. Prototype ](#3)

[4. Builder ](#4)


## 1. Factory Method <a name="1"></a> 

### Паттерн создание фабрики

Пример с двумя вариантами создания фабрики с опп и с дженериком

```
interface IInsurance {
    id: number;
    status: string;
    setVehicle(vehicle: any): void;
    submit(): Promise<boolean>;
}

class TFInsurance  implements IInsurance{
    id!: number;
    status!: string;
    private vehicle: any;
    setVehicle(vehicle: any): void {
        this.vehicle = vehicle
    }
    async submit(): Promise<boolean> {
        const res = await fetch('', 
            {
                method: 'POST', 
                body: JSON.stringify(
                    {vehicle: this.vehicle})
            })
        const data = await res.json()
        return data.isSuccess;
    }
}

class ABInsurance  implements IInsurance{
    id!: number;
    status!: string;
    private vehicle: any;
    setVehicle(vehicle: any): void {
        this.vehicle = vehicle
    }
    async submit(): Promise<boolean> {
        const res = await fetch('ab', 
            {
                method: 'POST', 
                body: JSON.stringify(
                    {vehicle: this.vehicle})
            })
        const data = await res.json()
        return data.yes;
    }
}
// Абстрактная Фабрика
abstract class InsuranceFactory {
    db: any
    abstract createInsurance(): IInsurance;

    saveHistory(ins: IInsurance) {
        this.db.save(ins.id, ins.status)
    }
}

class TFInsuranceFactory extends InsuranceFactory {
    createInsurance(): TFInsurance {
        return new TFInsurance();
    }
}

class ABInsuranceFactory extends InsuranceFactory {
    createInsurance(): ABInsurance {
        return new ABInsurance();
    }
}

const tfInsuranceFactory = new TFInsuranceFactory(); 
const ins = tfInsuranceFactory.createInsurance();
tfInsuranceFactory.saveHistory(ins);


const INSURANCE_TYPE = {
    tf: TFInsurance,
    ab: ABInsurance
};

type IT = typeof INSURANCE_TYPE;

class InsuranceFactoryAlt {
    db: any

    createInsurance<T extends keyof IT>(type: T): IT[T] {
        return INSURANCE_TYPE[type]
    }

    saveHistory(ins: IInsurance) {
        this.db.save(ins.id, ins.status)
    }
}

const insuranceFactoryAlt = new InsuranceFactoryAlt()
const ins2 = new(insuranceFactoryAlt.createInsurance('tf'))
insuranceFactoryAlt.saveHistory(ins2);
```

### - ([К списку других тем](#start))
## 2. Singleton <a name="2"></a> 

```
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
```

### - ([К списку других тем](#start))

## 3. Prototype <a name="3"></a> 

```
interface Prototype<T> {
    clone(): T;
}

class UserHistory implements Prototype<UserHistory> {
    createdAt: Date;

    constructor(public email: string, public name: string) {
        this.createdAt = new Date();
    }

    clone(): UserHistory {
        let target = new UserHistory(this.email, this.name)
        target.createdAt = this.createdAt;
        return target
    }
}

let user = new UserHistory('a@a.ru', 'Skay')
console.log(user)
let user2 = user.clone();
user2.email = "b@b.ru"
console.log(user2)
console.log(user)
```

### - ([К списку других тем](#start))

## 4. Builder <a name="4"></a> 

```
enum ImageFormat {
    Png = 'png',
    Jpeg = 'jpeg' 
}

interface IResolution {
    width: number,
    height: number
}

interface IImageConversion extends IResolution {
    format: ImageFormat
}

class ImageBuilder {
    private formats: ImageFormat[] = []
    private resolutions: IResolution[] = []

    addPng() {
        if(this.formats.includes(ImageFormat.Png)) {
            return this;
        }
        this.formats.push(ImageFormat.Png);
        return this;
    }

    addJpeg() {
        if(this.formats.includes(ImageFormat.Jpeg)) {
            return this;
        }
        this.formats.push(ImageFormat.Png);
        return this;
    }

    addResolution(width: number, height: number) {
        this.resolutions.push({ width, height });
        return this;
    }

    build(): IImageConversion[] {
        const res: IImageConversion[] = [];
        for (const r of this.resolutions) {
            for (const f of this.formats) {
                    res.push(
                        {   width: r.width, 
                            height: r.height, 
                            format: f });
                }
        }
        return res;
    }
}

console.log(new ImageBuilder()
    .addJpeg()
    .addPng()
    .addResolution(100, 50)
    .addResolution(100, 80)
    .build()
)

// Console log
  <!-- { width: 100, height: 50, format: 'png' },
  { width: 100, height: 80, format: 'png' } -->
```

### - ([К списку других тем](#start))

