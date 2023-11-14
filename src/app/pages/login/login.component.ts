import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { UserLogin } from './models/user-login.model'
import { LoginService } from './service/login.service'

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private readonly service: LoginService) {}
  public userLogin: UserLogin = {
    username: '',
    password: ''
  }
  public loading = false

  ngOnInit(): void {
    this.isLoggedIn()
  }

  public authenticate(): void {
    this.loading = true
    this.service.authenticate(this.userLogin).subscribe({
      next: data => {
        localStorage.setItem('user', JSON.stringify(data))
        this.loading = false
        this.isLoggedIn()
      },
      error: (err: HttpErrorResponse) => {
        alert(err.error.message)
        this.loading = false
      }
    })
  }

  public isLoggedIn(): void {
    const isLoggedIn = localStorage.getItem('user')

    if (JSON.parse(isLoggedIn ?? '{}').ok) {
      location.href = ''
    }
  }
}
