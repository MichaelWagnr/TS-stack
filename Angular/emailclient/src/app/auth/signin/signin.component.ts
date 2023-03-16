import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, SigninCredentials } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/i),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.authForm.invalid) return;

    this.authService
      .signin(this.authForm.value as SigninCredentials)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/inbox');
        },
        error: ({ error }) => {
          if (error.username || error.password) {
            this.authForm.setErrors({ credentials: true });
          }
        },
      });
  }
}
