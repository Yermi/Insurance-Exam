import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + 'users');
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(environment.apiUrl + 'users/' + userId);
  }

  addUser(user: User) {
    return this.http.post(environment.apiUrl + 'users', user);
  }

  updateUser(user: User) {
    return this.http.put(environment.apiUrl + 'users/' + user.id, user);
  }

  addOrUpdateUser(user: User, isUpdate: boolean) {
    return isUpdate ? this.updateUser(user) : this.addUser(user);
  }

  deleteUser(userId: string) {
    return this.http.delete(environment.apiUrl + 'users/' + userId);
  }
}
