import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private notiService: NzNotificationService
  ) {}

  submitForm(): void {
    const { checkPassword, ...value } = this.signupForm.value;
    this.authService.createAccount(value).subscribe((res) => {
      this.notiService.create(
        'success',
        'Create Successfully',
        'You have successfully created a new account'
      );
      this.router.navigate(['/login']);
    });
  }

  // custom validator
  updateConfirmValidator(): void {
    Promise.resolve().then(() =>
      this.signupForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signupForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  usernameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = /[^a-zA-Z0-9]/.test(control.value);
      return forbidden ? { forbiddenUsername: { value: control.value } } : null;
    };
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      checkPassword: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          this.confirmationValidator,
        ],
      ],
      username: [null, [Validators.required, this.usernameValidator()]],
      phoneNumber: [null, [Validators.required]],
    });
  }
}
