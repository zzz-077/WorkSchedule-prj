import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatch } from '../../validation/passValidation';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ServiceService } from '../../shared/service.service';
import { uid } from 'uid';
import { USER } from '../../model/userM';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private router: Router, private service: ServiceService) {
    this.service.saveUserLoginInLS(false);
  }

  isPassOneClicked: boolean = false;
  isPassTwoClicked: boolean = false;
  userForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-7]+$/),
      Validators.minLength(4),
      Validators.maxLength(15),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^[a-zA-Z0-7]+$/),
    ]),
    confirmpassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^[a-zA-Z0-7]+$/),
      passwordMatch(),
    ]),
  });
  passwordClick(num: number, str: string) {
    if (str === 'unhaid' && num === 1) this.isPassOneClicked = true;
    else if (str === 'haid' && num === 1) this.isPassOneClicked = false;
    else if (str === 'unhaid' && num === 2) this.isPassTwoClicked = true;
    else if (str === 'haid' && num === 2) this.isPassTwoClicked = false;
  }
  signupClick() {
    const id = uid();
    let user: USER;
    const hashedPass: string = bcrypt.hashSync(
      this.userForm.value.password as string,
      10
    );
    if (this.userForm) {
      user = {
        id: id,
        name: this.userForm.value.name as string,
        email: this.userForm.value.email as string,
        password: hashedPass,
      };
      this.service.createUser(user).subscribe((res: Boolean) => {
        if (res) {
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
