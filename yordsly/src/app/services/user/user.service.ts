import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Firestore, doc, getDoc, setDoc, updateDoc, serverTimestamp, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase.config';
import { onAuthStateChanged, User } from 'firebase/auth';

export interface UserProfile {
  email: string;
  username: string;
  discordUserID?: string;
}

export interface UserGameData {
  coinBalance: number;
  username?: string;
  updatedAt?: any;
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
      // Create user profile
      await setDoc(userDocRef, {
        email: user.email,
        createdAt: new Date().toISOString(),
        updatedAt: serverTimestamp(),
      });
      
      // Create initial game data
      await this.createUserGameData(user, { coinBalance: 100 }); // Start with 100 coins // coinBalance for new users by default.
      
      console.log('User profile and game data created successfully');

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

  async createUserGameData(user: User, gameData: UserGameData): Promise<void> {
    try {
      const gameDataDocRef = doc(db, 'users', user.uid, 'gameData', 'stats');
      
      await setDoc(gameDataDocRef, {
        coinBalance: gameData.coinBalance,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      console.log('User game data created successfully');
    } catch (error) {
      console.error('Error creating user game data:', error);
      throw error;
    }
  }

  async updateUserGameData(user: User, gameData: Partial<UserGameData>): Promise<void> {
    try {
      const gameDataDocRef = doc(db, 'users', user.uid, 'gameData', 'stats');
      
      // Check if document exists first
      const gameDataDoc = await getDoc(gameDataDocRef);
      
      if (gameDataDoc.exists()) {
        // Update existing document
        await updateDoc(gameDataDocRef, {
          ...gameData,
          updatedAt: serverTimestamp(),
        });
        console.log('User game data updated successfully');
      } else {
        // Create new document if it doesn't exist
        await setDoc(gameDataDocRef, {
          coinBalance: gameData.coinBalance || 0,
          updatedAt: serverTimestamp(),
        });
        console.log('User game data created (was missing)');
      }
    } catch (error) {
      console.error('Error updating user game data:', error);
      throw error;
    }
  }

  async getUserGameData(user: User): Promise<UserGameData | null> {
    try {
      const gameDataDocRef = doc(db, 'users', user.uid, 'gameData', 'stats');
      const userDocRef = doc(db, 'users', user.uid);
      
      // Fetch both game data and user profile concurrently
      const [gameDataDoc, userDoc] = await Promise.all([
        getDoc(gameDataDocRef),
        getDoc(userDocRef)
      ]);

      if (gameDataDoc.exists()) {
        const gameData = gameDataDoc.data();
        const userData = userDoc.exists() ? userDoc.data() : null;
        
        return {
          coinBalance: gameData['coinBalance'] || 0,
          username: userData ? userData['username'] : undefined,
          updatedAt: gameData['updatedAt'],
        } as UserGameData;
      } else {
        console.warn('No game data found for UID:', user.uid);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user game data:', error);
      throw error;
    }
  }
}