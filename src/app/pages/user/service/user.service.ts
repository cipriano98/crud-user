import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, take } from 'rxjs'
import { environment } from 'src/environments/environment'
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  private readonly url = `${environment.api}`

  public sync(): Observable<any> {
    return this.http.post<any>(`${this.url}/user/sync`, null).pipe(take(1))
  }

  public create(data: User): Observable<User> {
    return this.http.post<User>(`${this.url}/user`, data).pipe(take(1))
  }

  public findMany(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/user`).pipe(take(1))
  }

  public findOne(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/user/${id}`).pipe(take(1))
  }

  public update(id: number, data: User): Observable<User> {
    return this.http.put<User>(`${this.url}/user/${id}`, data).pipe(take(1))
  }

  public delete(id: number): Observable<User> {
    return this.http.delete<User>(`${this.url}/user/${id}`).pipe(take(1))
  }
}
