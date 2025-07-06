import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatError } from '@angular/material/form-field';
import { MatCardHeader } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Authentication } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatError, MatCardHeader, MatCardTitle, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  loginForm: FormGroup;
  private authenticationService = inject(Authentication);
  private router = inject(Router);
  private userService = inject(UserService);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const user = await this.authenticationService.loginWithEmailandPassword(
          this.loginForm.value.email, 
          this.loginForm.value.password
        );
        
        if (user) {
          console.log('Login successful:', user);
          // Save User Data (if needed)
          this.userService.setCurrentUser(user);
          // Redirect to dashboard
          this.router.navigate(['/landing']);

        } else {
          console.error('Login failed');
          // Handle sign-up failure (e.g., show an error message)
        }
      } catch (error) {
        console.error('Error during Login:', error);
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  // Helper methods for template (optional)
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
