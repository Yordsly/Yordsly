import { Injectable, inject } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, signOut } from "firebase/auth";
import { auth } from '../../firebase.config'; // Ensure this path is correct based on your project structure
import { UserService } from '../user/user.service'; // Import UserService to manage user data

@Injectable({
  providedIn: 'root'
})
export class Authentication {
  private userService = inject(UserService); // Inject UserService to manage user data

  constructor() { }

  signUpWithEmailandPassword(email: string, password: string): Promise<User | null> {
    console.log('Signing up with email:', email);
    
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed up successfully:', user);
        return user; // Return the user object
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error signing up:', errorCode, errorMessage);
        return null; // Return null on failure
      });
  }

  loginWithEmailandPassword(email: string, password: string): Promise<User | null> {
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

  logout(): Promise<void> {
    console.log('Signing out user');
    // Use the auth instance from firebase.config
    return signOut(auth)
      .then(() => {
        console.log('User signed out successfully');
        // Clear user data from UserService
        this.userService.clearCurrentUser();

        // Clear any stored tokens
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  }
}