import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ingredient } from '../model/ingredient';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  baseUrl : string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  get(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.baseUrl + 'ingredient/get');
  }

  getById(id: number): Observable<Ingredient> {
    return this.http.get<Ingredient>(this.baseUrl + 'ingredient/getbyid/' + id);
  }

  post(data: any){
    return this.http.post<Ingredient>(this.baseUrl + 'ingredient/post', data);
  }

  put(data: any){
    return this.http.put<Ingredient>(this.baseUrl + 'ingredient/put', data);
  }

  delete(id: number){
    return this.http.delete<Ingredient>(this.baseUrl + 'ingredient/delete/' + id);
  }

}
