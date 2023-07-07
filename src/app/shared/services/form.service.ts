import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddUserForm, UserData, UserForm } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl

  getForm(): Observable<UserForm[]> {
    const url: string = this.baseUrl + '/controls';
    return this.http.get<UserForm[]>(url);
  }

  getUserData(): Observable<UserData[]> {
    const url: string = this.baseUrl + '/userInfo';
    return this.http.get<UserData[]>(url);
  }

  addUserData(data: AddUserForm): Observable<AddUserForm> {
    const url: string = this.baseUrl + '/userInfo';
    return this.http.post<AddUserForm>(url, data);
  }

  deleteUser(id: string): Observable<any> {
    const url: string = this.baseUrl + `/userInfo/${id}`;
    return this.http.delete(url)
  }

}
