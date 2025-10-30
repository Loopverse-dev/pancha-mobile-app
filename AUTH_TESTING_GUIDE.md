# Authentication Testing Guide

## Overview
This guide will help you debug and test the authentication functionality in the Pancha app.

## What Was Fixed

### 1. Firebase Configuration (`config/firebase.ts`)
- ✅ Removed incorrect `getReactNativePersistence` import (not available in Firebase v12)
- ✅ Using `getAuth()` which automatically handles React Native persistence
- ✅ Proper Firebase initialization for Expo/React Native

### 2. Auth Service (`services/authService.ts`)
- ✅ Added comprehensive error handling with user-friendly messages
- ✅ Added detailed console logging for debugging
- ✅ Improved error messages for common scenarios:
  - Email already in use
  - Invalid email format
  - Weak password (< 6 characters)
  - Invalid credentials
  - Network errors
  - Too many failed attempts

## Testing Tools Created

### 1. Auth Debug Utility (`utils/authDebug.ts`)
Programmatic testing utility with methods:
- `testSignUp()` - Test sign up with various scenarios
- `testSignIn(email, password)` - Test sign in
- `testSignOut()` - Test sign out
- `checkAuthState()` - Check current authentication state
- `testFirebaseConnection()` - Verify Firebase is working

### 2. Auth Test Screen (`app/auth-test.tsx`)
Interactive UI for testing authentication flows.

## How to Test

### Method 1: Using the Test Screen (Recommended)

1. **Start the app:**
   ```bash
   npm start
   ```

2. **Navigate to the test screen:**
   - In your app, navigate to `/auth-test`
   - Or add a button to navigate there temporarily

3. **Run Quick Test:**
   - Click "🚀 Run Quick Test" button
   - This will automatically:
     - Create a new test account
     - Sign out
     - Sign back in
   - Watch the console logs for detailed output

4. **Manual Testing:**
   - Enter email and password
   - Click individual buttons to test:
     - **Sign Up** - Create new account
     - **Sign In** - Login with existing account
     - **Sign Out** - Logout
     - **Check State** - View current auth state

### Method 2: Using Actual Login/Signup Screens

1. **Test Sign Up Flow:**
   ```
   Navigate to /signup
   → Enter valid details
   → Click "SIGN UP"
   → Should navigate to /choose-child
   ```

2. **Test Sign In Flow:**
   ```
   Navigate to /login
   → Enter credentials
   → Click "SIGN IN"
   → Should navigate based on user type:
     - Reader → /choose-child
     - Author → /(tabs)
   ```

3. **Test Error Scenarios:**
   - Try signing up with existing email
   - Try weak password (< 6 chars)
   - Try invalid email format
   - Try signing in with wrong password
   - Try signing in with non-existent email

### Method 3: Console Debugging

1. **Open Developer Tools** in your browser or React Native debugger

2. **Use the authDebug utility:**
   ```javascript
   // In browser console or debugger
   import { authDebug } from './utils/authDebug';
   
   // Test sign up
   await authDebug.testSignUp();
   
   // Test sign in
   await authDebug.testSignIn('test@example.com', 'password123');
   
   // Check auth state
   authDebug.checkAuthState();
   ```

## Expected Behaviors

### Successful Sign Up
```
Console Output:
[AuthService] Starting sign up process for: test@example.com
[AuthService] Creating user in Firebase Auth...
[AuthService] User created successfully: abc123
[AuthService] Updating user profile...
[AuthService] Creating user document in Firestore...
[AuthService] Storing user data in AsyncStorage...
[AuthService] Sign up completed successfully

Navigation: → /choose-child
```

### Successful Sign In
```
Console Output:
[AuthService] Starting sign in process for: test@example.com
[AuthService] Authenticating with Firebase...
[AuthService] Authentication successful: abc123
[AuthService] Fetching user data from Firestore...
[AuthService] User data retrieved: reader
[AuthService] Storing user data in AsyncStorage...
[AuthService] Sign in completed successfully

Navigation: → /choose-child (reader) or /(tabs) (author)
```

### Failed Sign Up (Email Already Exists)
```
Console Output:
[AuthService] Starting sign up process for: existing@example.com
Sign up error: [Error details]

Alert: "This email is already registered"
```

### Failed Sign In (Invalid Credentials)
```
Console Output:
[AuthService] Starting sign in process for: test@example.com
Sign in error: [Error details]

Alert: "Invalid email or password"
```

## Common Issues & Solutions

### Issue: "Network error. Please check your connection"
**Solution:** 
- Check internet connection
- Verify Firebase project is active
- Check Firebase API keys in `config/firebase.ts`

### Issue: "This email is already registered"
**Solution:**
- Use a different email
- Or sign in with existing credentials
- Or delete the user from Firebase Console

### Issue: "Password should be at least 6 characters"
**Solution:**
- Use a password with 6+ characters

### Issue: Navigation doesn't work after sign in
**Solution:**
- Check that `/choose-child` route exists
- Verify user type is correctly stored
- Check console for navigation errors

## Debugging Checklist

- [ ] Firebase is properly initialized (check console for errors)
- [ ] Internet connection is active
- [ ] Firebase project credentials are correct
- [ ] User data is being saved to Firestore
- [ ] AsyncStorage is working properly
- [ ] Navigation routes exist
- [ ] Error messages are displaying correctly
- [ ] Console logs show expected flow

## Testing Scenarios

### Test Case 1: New User Sign Up
1. Use unique email (e.g., `test${Date.now()}@example.com`)
2. Enter strong password (6+ chars)
3. Fill all required fields
4. Submit
5. ✅ Should create account and navigate to /choose-child

### Test Case 2: Existing User Sign In
1. Use previously registered email
2. Enter correct password
3. Submit
4. ✅ Should sign in and navigate based on user type

### Test Case 3: Invalid Email Format
1. Enter invalid email (e.g., "notanemail")
2. Submit
3. ✅ Should show "Invalid email address" error

### Test Case 4: Weak Password
1. Enter password < 6 characters
2. Submit
3. ✅ Should show "Password should be at least 6 characters" error

### Test Case 5: Wrong Password
1. Use existing email
2. Enter wrong password
3. Submit
4. ✅ Should show "Invalid email or password" error

### Test Case 6: Sign Out
1. Sign in first
2. Click sign out
3. ✅ Should clear session and return to login

## Firebase Console Verification

1. **Check Authentication:**
   - Go to Firebase Console → Authentication → Users
   - Verify new users appear after sign up

2. **Check Firestore:**
   - Go to Firebase Console → Firestore Database
   - Check `users` collection
   - Verify user documents are created with correct data

3. **Check Logs:**
   - Go to Firebase Console → Functions → Logs (if using functions)
   - Look for any errors

## Next Steps

After testing is complete:
1. Remove or comment out the test screen (`/auth-test`)
2. Remove debug logs from production (optional)
3. Add proper error tracking (e.g., Sentry)
4. Implement password reset functionality
5. Add email verification (optional)

## Support

If you encounter issues:
1. Check console logs for detailed error messages
2. Verify Firebase configuration
3. Test with the auth-test screen
4. Check Firebase Console for backend errors
