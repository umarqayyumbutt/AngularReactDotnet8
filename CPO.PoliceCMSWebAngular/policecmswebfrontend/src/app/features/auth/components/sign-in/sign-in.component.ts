// features/auth/components/sign-in/sign-in.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  signInForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Initializing the sign-in form with email and password fields
    this.signInForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  // Sign-in method to call the AuthService
  onSubmit() {
    if (this.signInForm.valid) {
      const credentials = this.signInForm.value;
      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.router.navigate(['/province']);  // Redirect to dashboard on successful login
        },
        error: (err) => {
          this.errorMessage = 'Invalid credentials';  // Show error message on failed login
        }
      });
    }
  }
}
