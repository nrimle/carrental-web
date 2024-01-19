import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class ImageService {

    apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl + "/v1/image";
    }

    public uploadImage(image: any): Observable<any> {
      let formParams = new FormData();
      formParams.append('image', image)
      return this.http.post<any>(this.apiUrl, formParams);
    }

    public getImage(id: number): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/" + id);
    }
}
