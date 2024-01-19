import {Rental} from "./rentals.entity";


export class CreateCarDTO {
    name: string;
    type: string;
    transmission: string;
    costPerDay: number;
    seats: number;
    image: string;

    constructor(name: string, type: string, transmission: string, costPerDay: number, seats: number, image: string) {
        this.name = name;
        this.type = type;
        this.transmission = transmission;
        this.costPerDay = costPerDay;
        this.seats = seats;
        this.image = image;
    }
}

export class UpdateCarDTO extends CreateCarDTO {
    id?: number;

    constructor(id: number, name: string, type: string, transmission: string, costPerDay: number, seats: number, image: string) {
        super(name, type, transmission, costPerDay, seats, image);
        this.id = id;
    }
}


export class Car extends UpdateCarDTO {
    rentals: Array<Rental>;

    constructor(rentals: Array<Rental>, image: string, id: number, name: string, type: string, transmission: string, costPerDay: number, seats: number) {
        super(id, name, type, transmission, costPerDay, seats, image);
        this.rentals = rentals;
        this.image = image;
    }
}
