# 🚀 Quick Authentication Testing Reference

## Fastest Way to Test

### Option 1: Use the Test Screen (Easiest)
```bash
# 1. Start the app
npm start

# 2. Navigate to the test screen in your app
# URL: /auth-test

# 3. Click "Run Quick Test" button
# This automatically tests: Sign Up → Sign Out → Sign In
```

### Option 2: Test Real Screens
```bash
# Test Sign Up
Navigate to /signup → Fill form → Click SIGN UP

# Test Sign In  
Navigate to /login → Enter credentials → Click SIGN IN
```

## Quick Test Commands

### In Browser Console (when app is running):
```javascript
// Import the debug utility
import { authDebug } from './utils/authDebug';

// Quick test
await authDebug.testSignUp();
await authDebug.testSignIn('test@example.com', 'password123');
await authDebug.checkAuthState();
```

## Test Credentials Generator

Use this pattern for unique test emails:
```javascript
const testEmail = `test${Date.now()}@example.com`;
const testPassword = 'Test123456';
```

## Expected Results

### ✅ Successful Sign Up
- Console shows: `[AuthService] Sign up completed successfully`
- Navigates to: `/choose-child`
- User appears in Firebase Console

### ✅ Successful Sign In
- Console shows: `[AuthService] Sign in completed successfully`
- Navigates to: `/choose-child` (reader) or `/(tabs)` (author)

### ❌ Common Errors (These are GOOD - means validation works!)
- "This email is already registered" - Email exists
- "Invalid email address" - Bad email format
- "Password should be at least 6 characters" - Weak password
- "Invalid email or password" - Wrong credentials

## Quick Debug Checklist

When something doesn't work:
1. ✓ Check console for `[AuthService]` logs
2. ✓ Verify internet connection
3. ✓ Check Firebase Console → Authentication
4. ✓ Check Firebase Console → Firestore → users collection
5. ✓ Try the `/auth-test` screen

## Files to Check

- **Firebase Config:** `config/firebase.ts`
- **Auth Service:** `services/authService.ts`
- **Login Screen:** `app/login.tsx`
- **Signup Screen:** `app/signup.tsx`
- **Test Screen:** `app/auth-test.tsx`
- **Debug Utility:** `utils/authDebug.ts`

## One-Line Tests

```bash
# Check TypeScript compilation
npx tsc --noEmit

# Start dev server
npm start

# Check for linting issues
npm run lint
```

## Emergency Reset

If auth is completely broken:
```bash
# 1. Clear app data/cache
# 2. Check Firebase Console for errors
# 3. Verify config/firebase.ts has correct API keys
# 4. Try the test screen: /auth-test
```

## Success Indicators

You'll know auth is working when:
- ✅ No TypeScript errors
- ✅ Console shows detailed `[AuthService]` logs
- ✅ Users appear in Firebase Console after signup
- ✅ Navigation works after login
- ✅ Error messages are user-friendly
- ✅ Sign out clears the session

## Need More Help?

See full guide: `AUTH_TESTING_GUIDE.md`
