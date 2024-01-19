import {Component} from "@angular/core";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {TRANSMISSIONOFCARS} from "../const/transmission-of-cars.consts";
import {TYPEOFCARS} from "../const/type-of-car.const";
import {CommonModule, NgForOf} from "@angular/common";

@Component({
    selector: 'app-create-new-car-popup',
    templateUrl: './create-new-car-popup.component.html',
    styleUrl: './create-new-car-popup.component.scss',
    standalone: true,
    imports: [MatDialogModule, MatFormFieldModule, MatButtonModule, CommonModule, ReactiveFormsModule, FormsModule, MatInputModule, MatSelectModule, NgForOf]
})
export class CreateNewCarPopupComponent {

    typeOfCars = TYPEOFCARS;
    gearShifts = TRANSMISSIONOFCARS;

    imageHasUploaded: boolean = false;

    formGroup: FormGroup = new FormGroup<any>(
        {
            name: new FormControl<string>("", [Validators.required, Validators.minLength(2), Validators.maxLength(35)]),
            type: new FormControl<string>("", [Validators.required, Validators.minLength(1)]),
            transmission: new FormControl<string>("", [Validators.required, Validators.minLength(1)]),
            costPerDay: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
            seats: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
            uploadedFile: new FormControl(null, [Validators.required])
        }
    )

    fileUpload(fileInputEvent: any) {
        if (fileInputEvent.target.files[0] != null) {
            this.formGroup.controls['uploadedFile'].setValue(fileInputEvent.target.files[0]);
            this.imageHasUploaded = true;
        }
    }
}
