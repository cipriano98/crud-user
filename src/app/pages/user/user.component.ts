import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { faEdit, faSync, faTrash } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable, map, startWith } from 'rxjs'
import { NewUserComponent } from './components/new-user/new-user.component'
import { User } from './models/user.model'
import { UserService } from './service/user.service'

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(
    private readonly modal: NgbModal,
    private readonly service: UserService
  ) {}

  public readonly filter = new FormControl('', { nonNullable: true })
  public readonly icons = { faEdit, faTrash, faSync }
  public readonly users$: Observable<User[]> = this.startFilter()
  public loading = false

  private users: User[] = []
  private userSelected?: User = undefined

  ngOnInit(): void {
    this.getUsers()
  }

  public edit(user: User): void {
    this.userSelected = user
    this.openModal()
  }

  public syncUsers(): void {
    this.loading = true
    this.service.sync().subscribe({
      next: response => {
        this.getUsers()
        alert(response.message)
        this.loading = false
      },
      error: (err: HttpErrorResponse) => {
        alert(err.error.message)
        this.loading = false
      }
    })
  }

  public openModal(): void {
    this.modal.dismissAll()

    const modalRef = this.modal.open(NewUserComponent, {
      centered: true,
      size: 'xl',
      backdrop: 'static',
      keyboard: false
    })

    if (this.userSelected) {
      const user = this.userSelected
      modalRef.componentInstance.user = { ...user }
    }

    const userIndex = this.users.findIndex(user => {
      return user.id === this.userSelected?.id
    })

    modalRef.result.then(
      (user: User) => {
        userIndex === -1
          ? this.users.push(user)
          : this.users.splice(userIndex, 1, user)

        this.userSelected = undefined
        this.filter.setValue('')
      },
      () => {
        this.userSelected = undefined
      }
    )
  }

  public remove(user: User): void {
    const userIndex = this.users.findIndex(userFind => {
      return userFind.id === user.id
    })

    const message = `Tem certeza que deseja o usuário ${user.name}?`
    const remove = confirm(message)

    if (remove) {
      this.loading = true
      this.service.delete(user.id).subscribe({
        next: () => {
          this.users.splice(userIndex, 1)
          this.filter.setValue('')
          this.loading = false
        },
        error: (err: HttpErrorResponse) => {
          alert(err.error.message)
          this.loading = false
        }
      })
    }
  }

  private getUsers(): void {
    this.loading = true
    this.service.findMany().subscribe({
      next: data => {
        console.dir(data)
        this.users = data
        this.loading = false
        this.filter.setValue('')
      },
      error: (err: HttpErrorResponse) => {
        alert(err.error.message)
        this.loading = false
      }
    })
  }

  private startFilter(): Observable<User[]> {
    return this.filter.valueChanges.pipe(
      startWith(''),
      map(text => {
        const search = this.users.filter(data => {
          const term = text.toLowerCase()

          return (
            data.name.toString().toLowerCase().includes(term) ||
            data.username.toString().toLowerCase().includes(term) ||
            data.gender.toString().toLowerCase().includes(term) ||
            data.phone?.toString().toLowerCase().includes(term)
          )
        })

        return search
      })
    )
  }
}
