/**
 * Authentication Debug Utility
 * Use this to test and debug authentication flows
 */

import { authService } from '@/services/authService';

export const authDebug = {
  /**
   * Test Sign Up with various scenarios
   */
  async testSignUp() {
    console.log('=== Testing Sign Up ===');
    
    const testCases = [
      {
        name: 'Valid Sign Up',
        email: `test${Date.now()}@example.com`,
        password: 'Test123456',
        userData: {
          email: `test${Date.now()}@example.com`,
          fullName: 'Test User',
          phoneNumber: '+1234567890',
          userType: 'reader' as const
        }
      },
      {
        name: 'Weak Password',
        email: `test${Date.now()}@example.com`,
        password: '123',
        userData: {
          email: `test${Date.now()}@example.com`,
          fullName: 'Test User',
          phoneNumber: '+1234567890',
          userType: 'reader' as const
        }
      },
      {
        name: 'Invalid Email',
        email: 'invalid-email',
        password: 'Test123456',
        userData: {
          email: 'invalid-email',
          fullName: 'Test User',
          phoneNumber: '+1234567890',
          userType: 'reader' as const
        }
      }
    ];

    for (const testCase of testCases) {
      try {
        console.log(`\nTest: ${testCase.name}`);
        const user = await authService.signUp(
          testCase.email,
          testCase.password,
          testCase.userData
        );
        console.log('✅ Success:', user.uid);
      } catch (error: any) {
        console.log('❌ Error:', error.message);
      }
    }
  },

  /**
   * Test Sign In with various scenarios
   */
  async testSignIn(email: string, password: string) {
    console.log('=== Testing Sign In ===');
    
    try {
      console.log(`Attempting to sign in with: ${email}`);
      const user = await authService.signIn(email, password);
      console.log('✅ Sign in successful:', user.uid);
      
      // Get user data
      const userData = await authService.getUserData(user.uid);
      console.log('User data:', userData);
      
      return { success: true, user, userData };
    } catch (error: any) {
      console.log('❌ Sign in failed:', error.message);
      return { success: false, error: error.message };
    }
  },

  /**
   * Test Sign Out
   */
  async testSignOut() {
    console.log('=== Testing Sign Out ===');
    
    try {
      await authService.signOut();
      console.log('✅ Sign out successful');
      return { success: true };
    } catch (error: any) {
      console.log('❌ Sign out failed:', error.message);
      return { success: false, error: error.message };
    }
  },

  /**
   * Check current authentication state
   */
  checkAuthState() {
    console.log('=== Checking Auth State ===');
    
    const currentUser = authService.getCurrentUser();
    const isAuthenticated = authService.isAuthenticated();
    
    console.log('Is Authenticated:', isAuthenticated);
    console.log('Current User:', currentUser ? {
      uid: currentUser.uid,
      email: currentUser.email,
      displayName: currentUser.displayName
    } : null);
    
    return { isAuthenticated, currentUser };
  },

  /**
   * Test Firebase connection
   */
  async testFirebaseConnection() {
    console.log('=== Testing Firebase Connection ===');
    
    try {
      const currentUser = authService.getCurrentUser();
      console.log('✅ Firebase Auth initialized');
      console.log('Current user:', currentUser?.email || 'No user signed in');
      return { success: true };
    } catch (error: any) {
      console.log('❌ Firebase connection error:', error.message);
      return { success: false, error: error.message };
    }
  }
};

// Export for console debugging
if (typeof window !== 'undefined') {
  (window as any).authDebug = authDebug;
}
