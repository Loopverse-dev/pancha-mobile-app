import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserData {
  email: string;
  fullName: string;
  phoneNumber: string;
  userType: 'reader' | 'author';
}

export const authService = {
  // Sign Up
  async signUp(email: string, password: string, userData: UserData): Promise<User> {
    console.log('[AuthService] Starting sign up process for:', email);
    try {
      // Create user in Firebase Auth
      console.log('[AuthService] Creating user in Firebase Auth...');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('[AuthService] User created successfully:', user.uid);

      // Update display name
      console.log('[AuthService] Updating user profile...');
      await updateProfile(user, {
        displayName: userData.fullName
      });

      // Create user document in Firestore with timeout
      console.log('[AuthService] Creating user document in Firestore...');
      try {
        // Add timeout to prevent hanging
        const firestorePromise = setDoc(doc(db, 'users', user.uid), {
          email: userData.email,
          fullName: userData.fullName,
          phoneNumber: userData.phoneNumber,
          userType: userData.userType,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Firestore timeout')), 3000)
        );
        
        await Promise.race([firestorePromise, timeoutPromise]);
        console.log('[AuthService] User document created successfully');
      } catch (firestoreError: any) {
        console.error('[AuthService] Firestore error:', firestoreError.message);
        console.warn('[AuthService] Continuing without Firestore document - user can still authenticate');
        // Don't throw error - allow sign up to complete even if Firestore fails
      }

      // Store in AsyncStorage
      console.log('[AuthService] Storing user data in AsyncStorage...');
      await AsyncStorage.setItem('userLoggedIn', 'true');
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userId', user.uid);
      await AsyncStorage.setItem('userType', userData.userType);

      console.log('[AuthService] Sign up completed successfully');
      return user;
    } catch (error: any) {
      console.error('Sign up error:', error);
      // Provide more user-friendly error messages
      let errorMessage = 'An error occurred during sign up';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection';
      } else if (error.message) {
        errorMessage = error.message;
      }
      throw new Error(errorMessage);
    }
  },

  // Sign In
  async signIn(email: string, password: string): Promise<User> {
    console.log('[AuthService] Starting sign in process for:', email);
    try {
      console.log('[AuthService] Authenticating with Firebase...');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('[AuthService] Authentication successful:', user.uid);

      // Get user data from Firestore
      console.log('[AuthService] Fetching user data from Firestore...');
      const userData = await this.getUserData(user.uid);
      console.log('[AuthService] User data retrieved:', userData?.userType);

      // Store in AsyncStorage
      console.log('[AuthService] Storing user data in AsyncStorage...');
      await AsyncStorage.setItem('userLoggedIn', 'true');
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userId', user.uid);
      if (userData) {
        await AsyncStorage.setItem('userType', userData.userType);
      }

      console.log('[AuthService] Sign in completed successfully');
      return user;
    } catch (error: any) {
      console.error('Sign in error:', error);
      // Provide more user-friendly error messages
      let errorMessage = 'An error occurred during sign in';
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later';
      } else if (error.message) {
        errorMessage = error.message;
      }
      throw new Error(errorMessage);
    }
  },

  // Sign Out
  async signOut(): Promise<void> {
    console.log('[AuthService] Starting sign out process');
    try {
      console.log('[AuthService] Signing out from Firebase...');
      await firebaseSignOut(auth);
      console.log('[AuthService] Clearing AsyncStorage...');
      await AsyncStorage.multiRemove([
        'userLoggedIn',
        'userEmail',
        'userId',
        'userType',
        'onboardingComplete'
      ]);
      console.log('[AuthService] Sign out completed successfully');
    } catch (error: any) {
      console.error('[AuthService] Sign out error:', error);
      throw new Error(error.message);
    }
  },

  // Get Current User
  getCurrentUser(): User | null {
    return auth.currentUser;
  },

  // Get User Data from Firestore
  async getUserData(userId: string): Promise<UserData | null> {
    console.log('[AuthService] Fetching user data for:', userId);
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        console.log('[AuthService] User data found');
        return userDoc.data() as UserData;
      }
      console.log('[AuthService] User data not found');
      return null;
    } catch (error: any) {
      console.error('[AuthService] Get user data error:', error);
      console.warn('[AuthService] Returning null - Firestore may be unavailable');
      // Return null instead of throwing to allow app to continue
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return auth.currentUser !== null;
  }
};
