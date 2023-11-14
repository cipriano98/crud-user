import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, take } from 'rxjs'
import { environment } from 'src/environments/environment'
import { UserLoginResponse } from '../models/user-login-respose.model'
import { UserLogin } from '../models/user-login.model'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private readonly http: HttpClient) {}

  private readonly url = `${environment.api}`

  public authenticate(data: UserLogin): Observable<UserLoginResponse> {
    return this.http
      .post<UserLoginResponse>(`${this.url}/login`, data)
      .pipe(take(1))
  }
}
