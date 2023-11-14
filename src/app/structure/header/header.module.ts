import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { HeaderComponent } from './header.component'

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, RouterModule, NgbNavModule]
})
export class HeaderModule {}
