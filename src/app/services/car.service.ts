import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Car, CreateCarDTO, UpdateCarDTO} from "../models/car.entity";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class CarService {

    apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl + "/v1/car";
    }

    public createCar(car: CreateCarDTO): Observable<Car> {
        return this.http.post<Car>(this.apiUrl, car);
    }

    public getAllCars(): Observable<Array<Car>> {
        return this.http.get<Array<Car>>(this.apiUrl);
    }

    public getCar(id: number): Observable<Car> {
        return this.http.get<Car>(this.apiUrl + "/" + id);
    }

    public updateCar(car: UpdateCarDTO): Observable<Car> {
        return this.http.put<Car>(this.apiUrl, car);
    }

    public deleteCar(carId: number): Observable<void> {
        return this.http.delete<any>(this.apiUrl + "/" + carId);
    }

}
