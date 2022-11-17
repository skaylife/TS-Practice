class Vehicle {
    public make: string;
    private damages: string[];
    private _model: string;
    protected run: number;
    #price: number; // private JS 

    set model(m: string) {
        this._model = m;
    }

    get model() {
        return this._model;  
    }

    addDamage(damage:  string) {
        this.damages.push(damage);
    }
}

class EuroTruck extends Vehicle {
    setDamage(km: number) {
        this.run = km / 0.62
    }
}

new Vehicle().make = 'dfdf'