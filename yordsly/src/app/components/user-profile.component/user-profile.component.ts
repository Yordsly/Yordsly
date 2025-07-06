import { Component, inject, OnInit, OnDestroy } from '@angular/core';
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
import { Authentication } from '../../services/authentication/authentication.service';
import { UserService, UserProfile } from '../../services/user/user.service';
import { RouterLink, Router } from '@angular/router';
import { from, of, Subject, switchMap, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatError, MatCardHeader, MatCardTitle, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.sass'
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfileForm: FormGroup;
  private authenticationService = inject(Authentication);
  private userService = inject(UserService);
  private destroy$ = new Subject<void>();
  private router = inject(Router);
  
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder) {
    // Initialize the form with validation
    this.userProfileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      discordUserID: ['', [Validators.minLength(18), Validators.maxLength(18)]],
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.userProfileForm.valid) {
      this.isSubmitting = true;
      this.userService.currentUser$.pipe(take(1)).subscribe(currentUser => {
        if (currentUser) {
          const userProfile: UserProfile = {
            email: this.userService.getCurrentUser()?.email || '',
            username: this.userProfileForm.value.username || '',
            discordUserID: this.userProfileForm.value.discordUserID || ''
          };

          console.log('User profile data:', userProfile);

          this.userService.updateUserProfile(currentUser, userProfile).then(() => {
            console.log('User profile updated successfully');
            this.loadUserProfile(); // Reload profile to reflect changes
            this.isSubmitting = false;
            this.router.navigate(['../landing']);
          });
        }
      });
    } else {
      this.userProfileForm.markAllAsTouched();
      this.isSubmitting = false;
    }
  }

  loadUserProfile(): void {
    this.userService.currentUser$.pipe(
      takeUntil(this.destroy$),
      switchMap(currentUser => {
        if (currentUser) {
          return from(this.userService.getUserProfile(currentUser));
        } else {
          return of(null);
        }
      })
    ).subscribe({
      next: (profile) => {
        if (profile) {
          this.userProfileForm.patchValue({
            email: profile.email,
            username: profile.username,
            discordUserID: profile.discordUserID || ''
          });
        }
      },
      error: (error) => {
        console.error('Error loading user profile:', error);
        this.errorMessage = 'Failed to load user profile.';
      }
    });
  }

  // Getter methods for form validation
  get email() { return this.userProfileForm.get('email'); }
  get username() { return this.userProfileForm.get('username'); }
  get discordUserID() { return this.userProfileForm.get('discordUserID'); }
}