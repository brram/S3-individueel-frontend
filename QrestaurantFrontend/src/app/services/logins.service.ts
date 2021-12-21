import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Login } from '../model/login';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginsService {

  baseUrl : string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  post(data: any){
    return this.http.post<Login>(this.baseUrl + 'login/login', data);
  }

  validate(): Observable<Login> {
    return this.http.get<Login>(this.baseUrl + 'login/validate');
  }
}
