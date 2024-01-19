import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CreateRentalDTO, Rental} from "../models/rentals.entity";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class RentalService {

    apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl + "/v1/rental";
    }

    public createRent(rentDTO: CreateRentalDTO): Observable<Rental> {
        return this.http.post<Rental>(this.apiUrl, rentDTO);
    }

}
