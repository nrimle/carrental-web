import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {Rental} from "../models/rentals.entity";
import {DateAdapter, MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";

@Component({
  selector: 'app-reserve-popup',
  templateUrl: './reserve-popup.component.html',
  styleUrl: './reserve-popup.component.scss',
  standalone: true,
  imports: [MatDialogModule, CommonModule, ReactiveFormsModule, MatNativeDateModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, MatButtonModule]
})
export class ReservePopupComponent implements OnInit {
  birthStartDate = new Date(1990, 0, 1);
  maxDateOfBirth = new Date();

  reservedDates: Array<Date> = new Array<Date>();

  minDate: Date = new Date(); // calendar picker only available from today
  maxDate: Date | null = null; // max day to reserve

  formGroup: FormGroup = new FormGroup({
    startRental: new FormControl<Date | null>(null, [Validators.required, Validators.minLength(1)]),
    endRental: new FormControl<Date | null>(null, [Validators.required, Validators.minLength(1)]),
    firstName: new FormControl<string>("", [Validators.required, Validators.minLength(1)]),
    lastName: new FormControl<string>("", [Validators.required, Validators.minLength(1)]),
    dateOfBirth: new FormControl<Date | null>(null, [Validators.required, Validators.minLength(1)]),
    bStreet: new FormControl<string>("", [Validators.required, Validators.minLength(1)]),
    bHouseNumber: new FormControl<string>("", [Validators.required, Validators.minLength(1)]),
    bZipCode: new FormControl<number>(0, [Validators.required, Validators.minLength(4), Validators.maxLength(5)]),
    bCity: new FormControl<string>("", [Validators.required, Validators.minLength(1)])
  })

  constructor(@Inject(MAT_DIALOG_DATA) public rentals: Array<Rental>, private dateAdapter: DateAdapter<any>) {
    this.dateAdapter.setLocale('de');
    if (this.maxDate != null) {
      this.maxDate.setDate(this.maxDate.getDate() + 30); // max 30 days
    }
  }

  ngOnInit() {
    for (let rental of this.rentals) {
      let startDate: Date = new Date(rental.startDate);
      let endDate: Date = new Date(rental.endDate);
      startDate.setHours(0, 0, 0, 0); // setting start date to zero
      endDate.setHours(0, 0, 0, 0);
      let tempStartDate = new Date(startDate.getTime()); // fixing overwriting var in list
      this.reservedDates.push(tempStartDate);
      while (startDate.getTime() != endDate.getTime()) {
        let tomorrow = new Date(startDate.getTime() + (1000 * 60 * 60 * 24)); // adding one day
        this.reservedDates.push(tomorrow);
        startDate.setTime(tomorrow.getTime());
      }
    }
  }

  reservedFilter = (d: Date): boolean => {
    const modifiedDate = new Date(d);
    modifiedDate.setHours(0, 0, 0, 0);
    const time = modifiedDate.getTime();
    return !this.reservedDates.find(x => x.getTime() == time);
  }

  updateMaxDate() {
    let startDate: Date = this.formGroup.controls['startRental'].value;
    if (startDate == null) {
      this.maxDate = null
    } else {
      startDate.setHours(0, 0, 0, 0);

      // filters all dates from the past
      const futureDates = this.reservedDates.filter(date => date > startDate);

      // adds date 30 days in the future as maximum
      futureDates.push(new Date(startDate.getTime() + (30 * 1000 * 60 * 60 * 24)));

      this.maxDate = futureDates.reduce((prev, curr) =>
        Math.abs(curr.getTime() - startDate.getTime()) < Math.abs(prev.getTime() - startDate.getTime()) ? curr : prev
      );
    }
  }
}
