import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuDish } from '../model/menudish';

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  baseUrl : string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  get(): Observable<MenuDish[]> {
    return this.http.get<MenuDish[]>(this.baseUrl + 'dish/getmenu');
  }
}
