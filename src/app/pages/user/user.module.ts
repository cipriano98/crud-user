import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap'
import { NewUserModule } from './components/new-user/new-user.module'
import { UserService } from './service/user.service'
import { UserRoutingModule } from './user-routing.module'
import { UserComponent } from './user.component'

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NewUserModule
  ],
  providers: [UserService]
})
export class UserModule {}
