import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private readonly router: Router) {}

  public logout(): void {
    localStorage.removeItem('user')
    this.router.navigate(['login'])
  }
}
