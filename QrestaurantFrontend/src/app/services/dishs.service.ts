import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dish } from '../model/dish';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishsService {
  baseUrl : string= environment.baseUrl;

  constructor(private http:HttpClient) { }

  get(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.baseUrl + 'dish/get');
  }

  getById(id: number): Observable<Dish> {
    return this.http.get<Dish>(this.baseUrl + 'dish/getbyid/' + id);
  }

  post(data: any){
    return this.http.post<Dish>(this.baseUrl + 'dish/post', data);
  }

  put(data: any){
    return this.http.put<Dish>(this.baseUrl + 'dish/put', data);
  }

  delete(id: number){
    return this.http.delete<Dish>(this.baseUrl + 'dish/delete/' + id);
  }

}
