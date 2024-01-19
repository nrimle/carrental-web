import {Component, OnInit} from '@angular/core';
import {Car, CreateCarDTO} from "./models/car.entity";
import {MatDialog} from "@angular/material/dialog";
import {CreateNewCarPopupComponent} from "./popups/create-new-car-popup.component";
import {FormGroup} from "@angular/forms";
import {CarService} from "./services/car.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SNACK_BAR_HORIZONTAL, SNACK_BAR_VERTICAL} from "./const/snack-bar.const";
import {ImageService} from "./services/image.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

    cars: Array<Car> = new Array<Car>();

    constructor(public dialog: MatDialog, private carService: CarService, private imageService: ImageService, private snackBar: MatSnackBar) {
    }

    ngOnInit() {
      this.loadCars();
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

    createNewCar() {
        const dialogRef = this.dialog.open(CreateNewCarPopupComponent);
        dialogRef.afterClosed().subscribe((data: FormGroup | null) => {
            if (data != null) {

                this.imageService.uploadImage(data.controls['uploadedFile'].value).subscribe((id: number) => {
                  let car = new CreateCarDTO(data.controls['name'].value,
                    data.controls['type'].value,
                    data.controls['transmission'].value,
                    data.controls['costPerDay'].value,
                    data.controls['seats'].value,
                    `/image/${id}`);
                this.carService.createCar(car).subscribe((car: Car) => {
                  this.snackBar.open("Car " + car.name + " has successfully been created", "Success", {
                    horizontalPosition: SNACK_BAR_HORIZONTAL,
                    verticalPosition: SNACK_BAR_VERTICAL
                  })
                  this.loadCars();
                }, error => {
                  this.snackBar.open("Car " + car.name + " could not have been created", "Error", {
                    horizontalPosition: SNACK_BAR_HORIZONTAL,
                    verticalPosition: SNACK_BAR_VERTICAL
                  })
                })
              })
            }
        })
    }
}
