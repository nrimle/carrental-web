import {User} from "./user.entity";

export class Rental {
    id?: number;
    startDate: Date;
    endDate: Date;


    constructor(id: number, startDate: Date, endDate: Date) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

export class CreateRentalDTO {
    carId: number;
    startDate: Date;
    endDate: Date;
    customer: User;


    constructor(carId: number, startDate: Date, endDate: Date, customer: User) {
        this.carId = carId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.customer = customer;
    }
}