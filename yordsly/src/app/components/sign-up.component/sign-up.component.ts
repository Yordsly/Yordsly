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
import { Router, RouterLink } from '@angular/router';
import { Authentication } from '../../services/authentication/authentication.service'; // Adjust the import path as necessary

@Component({
  selector: 'app-sign-up',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatError, MatCardHeader, MatCardTitle, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.sass',
  standalone: true
})
export class SignUpComponent {
  signUpForm: FormGroup;
  private authenticationService = inject(Authentication);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  async onSubmit() {
    if (this.signUpForm.valid) {
      try {
        const user = await this.authenticationService.signUpWithEmailandPassword(
          this.signUpForm.value.email, 
          this.signUpForm.value.password
        );
        
        if (user) {
          console.log('Sign up successful:', user);
          // Optionally, redirect to another page or show a success message
          this.router.navigate(['/login']);
        } else {
          console.error('Sign up failed');
          // Handle sign-up failure (e.g., show an error message)
        }
      } catch (error) {
        console.error('Error during sign up:', error);
      }
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }

  // Helper methods for template (optional)
  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }
}
