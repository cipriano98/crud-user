/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { HttpErrorResponse } from '@angular/common/http'
import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs'
import { User } from '../../models/user.model'
import { UserService } from '../../service/user.service'

@Component({
  selector: 'wp-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  constructor(
    private readonly activeModal: NgbActiveModal,
    private readonly service: UserService
  ) {}

  @Input() public set user(user: User) {
    console.dir(user)

    if (user) {
      this.editingUser = user
      this.getUser(user.id)
    }
  }

  public readonly form: FormGroup = this.buildForm()

  public loading = false
  public editingUser?: User

  ngOnInit(): void {
    !this.editingUser &&
      this.form.addControl(
        'password',
        new FormControl('', [Validators.required])
      )
  }

  public save(): void {
    if (this.form.valid) {
      const user = this.editingUser ? this.update() : this.create()

      this.loading = true
      user.subscribe({
        next: user => {
          this.activeModal.close({ ...user })
          this.loading = false
        },
        error: (err: HttpErrorResponse) => {
          alert(err.error.message)
          this.loading = false
        }
      })

      return
    }

    alert('Ajuste os erros de formulário para prosseguir')
    this.form.markAllAsTouched()
  }

  public dismissModal(): void {
    this.activeModal.dismiss()
  }

  private update(): Observable<User> {
    return this.service.update(this.editingUser!.id, { ...this.form.value })
  }

  private create(): Observable<User> {
    console.dir(this.form.value)
    return this.service.create({ ...this.form.value })
  }

  private getUser(id: number): void {
    this.loading = true
    this.service.findOne(id).subscribe({
      next: response => {
        this.form.patchValue({ ...response })

        this.loading = false
      },
      error: (err: HttpErrorResponse) => {
        alert(err.error.message)
        this.loading = false
      }
    })
  }

  private buildForm(): FormGroup {
    const form = new FormBuilder().group({
      name: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      gender: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(50)]
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          ,
          Validators.maxLength(15)
        ]
      ],
      phone: ['', [Validators.minLength(3), Validators.maxLength(25)]]
    })

    return form
  }
}
