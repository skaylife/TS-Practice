class Vehile {
    run!: number;
}

function kmToMiles<T extends Vehile>(vehicle: T): T {
    vehicle.run = vehicle.run / 0.72;
    return vehicle;
}

class LCV extends Vehile {
    capacity!: number;
}

const vehicle = kmToMiles(new Vehile());
const lcv = kmToMiles(new LCV());
kmToMiles({run: 1});

function logId<T extends string | number, Y>(id: T, additionalData: Y): {id: T, data: Y} {
    console.log(id);
    console.log(additionalData);
    return {id, data: additionalData};
}