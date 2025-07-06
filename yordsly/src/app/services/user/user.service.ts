import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Firestore, doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase.config';
import { onAuthStateChanged, User } from 'firebase/auth';

export interface UserProfile {
  email: string;
  username: string;
  discordUserID?: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  // Add a loading state to know when auth state is initialized
  private authInitializedSubject = new BehaviorSubject<boolean>(false);
  public authInitialized$: Observable<boolean> = this.authInitializedSubject.asObservable();


  constructor() {
  }


  setCurrentUser(user: any): void {
    // Store only in memory - more secure
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  clearCurrentUser(): void {
    // Clear from memory only
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!auth.currentUser;
  }

  async createUserProfile(user: User): Promise<void> {
    const userDocRef = doc(db, 'users', user.uid);
    
    try {
      await setDoc(userDocRef, {
        email: user.email,
        createdAt: new Date().toISOString(),
        updatedAt: serverTimestamp(),
      });
        console.log('User profile created successfully');
    } catch (error) {
        console.error('Error creating user profile:', error);
        throw error;
    }
  }

  async getUserProfile(user: User): Promise<UserProfile | null> {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        
        return {
          email: data['email'],
          username: data['username'],
          discordUserID: data['discordUserID'],
        } as UserProfile;
      } else {
        console.warn('No user profile found for UID:', user.uid);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

    async updateUserProfile(user: User, userProfile: UserProfile): Promise<void> {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        try {
          await setDoc(userDocRef, {
            email: user.email,
            username: userProfile['username'] || '', // Keep existing username if not provided
            discordUserID: userProfile['discordUserID'] || '', // Keep existing Discord ID if not provided
            updatedAt: serverTimestamp(),
          });
            console.log('User profile updated successfully');
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
      } else {
        console.warn('No user profile found for UID:', user.uid);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }


}