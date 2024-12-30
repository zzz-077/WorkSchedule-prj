import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ServiceService } from '../../shared/service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isPassOneClicked: boolean = false;
  loginErrorResponse: { status: boolean | null; message: string } = {
    status: null,
    message: '',
  };
  userForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^[a-zA-Z0-7]+$/),
    ]),
  });
  constructor(private router: Router, private service: ServiceService) {
    this.service.saveUserLoginInLS(false);
  }

  passwordClick(num: number, str: string) {
    if (str === 'unhaid' && num === 1) this.isPassOneClicked = true;
    else if (str === 'haid' && num === 1) this.isPassOneClicked = false;
  }
  loginClick() {
    if (this.userForm) {
      const email = this.userForm.value.email as string;
      const pass = this.userForm.value.password as string;
      this.service
        .LoginUser(email, pass)
        .subscribe((res: { status: boolean; message: string }) => {
          if (res) {
            if (res.status === false) {
              this.loginErrorResponse = res;
              setTimeout(() => {
                this.loginErrorResponse = { status: null, message: '' };
              }, 4000);
            } else {
              this.service.saveUserLoginInLS(true);
              this.router.navigate(['/schedule']);
            }
          }
        });
    }
  }
}
