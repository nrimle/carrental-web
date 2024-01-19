import {Component, Input, OnChanges} from '@angular/core';
import {Car} from "../models/car.entity";
import {FormControl, FormGroup} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {TYPEOFCARS} from "../const/type-of-car.const";
import {TRANSMISSIONOFCARS} from "../const/transmission-of-cars.consts";
import {MatDialog} from "@angular/material/dialog";
import {CarService} from "../services/car.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DeleteCarPopupComponent} from "../popups/delete-car-popup.component";
import {SNACK_BAR_HORIZONTAL, SNACK_BAR_VERTICAL} from "../const/snack-bar.const";
import {ReservePopupComponent} from "../popups/reserve-popup.component";
import {User} from "../models/user.entity";
import {environment} from "../../environments/environment";
import {RentalService} from "../services/rental.service";
import {CreateRentalDTO, Rental} from "../models/rentals.entity";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrl: './rental-list.component.scss'
})
export class RentalListComponent implements OnChanges {
  // WHOLE DATA
  @Input() cars: Array<Car> = new Array<Car>();

  // DATE PICKER
  minDate: Date;
  range: FormGroup = new FormGroup<any>({
    start: new FormControl(new Date()),
    end: new FormControl()
  })

  // TYPES
  types: Array<string> = TYPEOFCARS;

  // SEARCH INPUT
  carSearch: FormControl = new FormControl("");

  // GEAR SHIFT DROPDOWN
  gearShift: FormControl = new FormControl("");
  gearShifts = TRANSMISSIONOFCARS;

  // MIN SEATS Number INCREMENT
  minSeats: FormControl = new FormControl<number>(0);

  // TYPE DROPDOWN
  type: FormControl = new FormControl("");

  // MIN & MAX Cost Per Day
  min: number = 1;
  max: number = 100000; // default VALUE
  selectedMin: number = 0;
  selectedMax: number = 100000;

  // BACKEND URL
  apiUrl: string;

  constructor(private dateAdapter: DateAdapter<any>, private dialog: MatDialog, private carService: CarService, private rentalService: RentalService, private snackBar: MatSnackBar) {
    this.dateAdapter.setLocale('de');
    this.minDate = new Date();
    this.apiUrl = environment.apiUrl + "/v1";
  }

  ngOnChanges() {
    let max = 0;
    for (let car of this.cars) {
      if (car.costPerDay > max) {
        max = Math.ceil(car.costPerDay);
      }
    }
    this.max = max; // overwrite with the most amount of cost per day
  }

  deleteCar(car: Car) {
    let dialogRef = this.dialog.open(DeleteCarPopupComponent, {
      data: car.name
    });
    dialogRef.afterClosed().subscribe((data: null | boolean) => {
      if (typeof data == "boolean") {
        if (data) {
          if (car.id != null) { // should not happen
            this.carService.deleteCar(car.id).subscribe(() => {
              this.snackBar.open("Car " + car.name + " has been deleted", "Success", {
                horizontalPosition: SNACK_BAR_HORIZONTAL,
                verticalPosition: SNACK_BAR_VERTICAL
              });
              this.cars.splice(this.cars.indexOf(car), 1); // removing old car
            }, error => {
              this.snackBar.open("Car " + car.name + " could not been deleted", "Error", {
                horizontalPosition: SNACK_BAR_HORIZONTAL,
                verticalPosition: SNACK_BAR_VERTICAL
              })
            }, () => {
              this.loadCars();
            })
          } else {
            console.error("Something went wrong, no car id found");
          }
        }
      }
    })
  }

  loadCars(): void {
    this.carService.getAllCars().subscribe(
      (response) => {
        this.cars = response;
      },
      (error) => {
        console.log('Error fetching cars: ', error);
      }
    )
  }

  reserveCar(car: Car) {
    let dialogRef = this.dialog.open(ReservePopupComponent, {
      data: car.rentals
    });
    dialogRef.afterClosed().subscribe((data: null | FormGroup) => {
      if (data != null && car.id != undefined) {
        let user: User = new User(
          data.controls['firstName'].value,
          data.controls['lastName'].value,
          data.controls['dateOfBirth'].value,
          {
            street: data.controls['bStreet'].value,
            houseNumber: data.controls['bHouseNumber'].value,
            zipCode: data.controls['bZipCode'].value,
            city: data.controls['bCity'].value
          }
        )
        this.rentalService.createRent(new CreateRentalDTO(
          car.id,
          data.controls['startRental'].value,
          data.controls['endRental'].value,
          user
        )).subscribe((rental: Rental) => {
            this.snackBar.open("Car " + car.name + " has successfully been reserved", "Success", {
              horizontalPosition: SNACK_BAR_HORIZONTAL,
              verticalPosition: SNACK_BAR_VERTICAL
            })
            this.loadCars();
          }, error => {
            this.snackBar.open("Car " + car.name + " could not be reserved", "Error", {
              horizontalPosition: SNACK_BAR_HORIZONTAL,
              verticalPosition: SNACK_BAR_VERTICAL
            })
          }
        )
      }
    })
  }
}
