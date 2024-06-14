import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService
  ) {}

  createNotification(type: string, title: string): void {
    this.notification.create(
      type,
      title,
      'You have successfully logged into the system.'
    );
  }

  submitForm(): void {
    this.authService
      .checkExistAccount({
        username: this.validateForm.value.userName,
        password: this.validateForm.value.password,
      })
      .subscribe((res: boolean) => {
        if (res) {
          this.createNotification('success', 'Login successfully');
          this.authService.login();
          this.router.navigate(['/overview']);
        } else {
          this.createNotification('error', 'Login failed');
        }
      });
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }
}
