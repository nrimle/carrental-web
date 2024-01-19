import {Pipe, PipeTransform} from "@angular/core";
import {Car} from "../models/car.entity";

@Pipe({
    name: "filterPipe"
})

export class FilterPipe implements PipeTransform {

    transform(cars: Array<Car>,
              search: string,
              type: string,
              gearShift: string,
              minDate: Date,
              maxDate: Date,
              minSeats: number,
              minPrice: number,
              maxPrice: number): Array<Car> {
        if (cars.length == 0) {
            return cars;
        }
        if (search != "" && search != undefined) {
            cars = cars.filter(c => c.name.toUpperCase().includes(search.toUpperCase()));
        }
        if (type != "" && type != undefined) {
            cars = cars.filter(c => c.type == type);
        }
        if (gearShift != "" && gearShift != undefined) {
            cars = cars.filter(c => c.transmission == gearShift);
        }
        if (minDate && maxDate) {
            let availableCars = [];
            for (let c of cars) {
                let rented = false;
                for (let rent of c.rentals) {
                    if (rent.startDate.getTime() <= minDate.getTime() && rent.endDate.getTime() >= maxDate.getTime()) {  // car is rented during min and max
                        rented = true;
                    }
                }
                if (!rented) { // car is not fully rented between min start and max end time
                    availableCars.push(c);
                }
            }
        }
        if (minSeats != 0) {
            cars = cars.filter(c => c.seats >= minSeats);
        }
        cars = cars.filter(c => c.costPerDay >= minPrice && c.costPerDay <= maxPrice);
        return cars;
    }

}
