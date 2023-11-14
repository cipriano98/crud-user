import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { UserService } from '../../service/user.service'
import { NewUserComponent } from './new-user.component'

@NgModule({
  declarations: [NewUserComponent],
  exports: [NewUserComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [UserService]
})
export class NewUserModule {}
