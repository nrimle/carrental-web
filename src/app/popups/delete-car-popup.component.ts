import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-delete-car-popup',
    templateUrl: './delete-car-popup.component.html',
    standalone: true,
    imports: [MatDialogModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, FormsModule, MatInputModule, MatSelectModule, NgForOf]
})
export class DeleteCarPopupComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public carName: string) {
    }
}
