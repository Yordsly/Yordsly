import { Injectable, inject } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../firebase.config'; // Ensure this path is correct based on your project structure
import { UserService } from '../user/user.service'; // Import UserService to manage user data

@Injectable({
  providedIn: 'root'
})
export class Authentication {
  private userService = inject(UserService); // Inject UserService to manage user data

  constructor() { this.initAuthStateListener(); }

  private initAuthStateListener(): void {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log('User is signed in:', user);
        this.userService.setCurrentUser(user);
      } else {
        // User is signed out
        console.log('User is signed out');
        this.userService.clearCurrentUser();
      }
    });
  }

  async signUpWithEmailandPassword(email: string, password: string): Promise<User | null> {
    console.log('Signing up with email:', email);
    
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed up successfully:', user);

        // Set the current user in UserService
        // Create user profile in Firestore
        // Logout after creating profile
        try {
          // Create user profile in Firestore
          this.userService.createUserProfile(user);
          console.log('User profile created successfully');
          this.logout();
        } catch (error) {
          console.error('Error creating user profile:', error);
          return null;
        }
        
        return user; // Return the user object
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error signing up:', errorCode, errorMessage);
        return null; // Return null on failure
      });
  }

  async loginWithEmailandPassword(email: string, password: string): Promise<User | null> {
    console.log('Logging in with email:', email);
    
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User logged in successfully:', user);
        return user; // Return the user object
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error logging in:', errorCode, errorMessage);
        return null; // Return null on failure
      });
  }

  async logout(): Promise<void> {
    console.log('Signing out user');
    // Use the auth instance from firebase.config
    return signOut(auth)
      .then(() => {
        console.log('User signed out successfully');

        // Clear any stored tokens
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  }
}