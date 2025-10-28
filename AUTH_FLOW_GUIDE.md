# Authentication Flow Guide

## ✅ What's Been Implemented

A complete authentication flow with first-time user detection has been added to your app.

---

## 🔄 Navigation Flow

### **First Time User (Never opened app)**
```
App Launch
    ↓
Splash Screen (animated)
    ↓
Shows "I'm a reader" / "I'm an author" buttons
    ↓
User selects role
    ↓
Login Screen
    ↓
User logs in
    ↓
Main App (Home)
```

### **Returning User (Has logged in before)**
```
App Launch
    ↓
Splash Screen (animated)
    ↓
Auto-navigates to Main App (Home)
```

### **User Who Saw Splash But Didn't Login**
```
App Launch
    ↓
Splash Screen (animated)
    ↓
Auto-navigates to Login Screen
```

---

## 📁 Files Created/Modified

### **New Files (2)**
1. **`app/login.tsx`** - Login screen with email/password
2. **`utils/auth.ts`** - Authentication helper functions

### **Modified Files (3)**
1. **`app/splash.tsx`** - Added first-time user detection
2. **`app/(tabs)/profile.tsx`** - Added logout functionality
3. **`app/_layout.tsx`** - Added login route

### **Installed Package**
- `@react-native-async-storage/async-storage` - For data persistence

---

## 🎯 Features Implemented

### **1. Splash Screen Logic**
- ✅ Checks if user has logged in before
- ✅ Checks if user has seen splash screen
- ✅ Auto-navigates based on user status
- ✅ Smooth animations during check

### **2. Login Screen**
- ✅ Email and password inputs
- ✅ Form validation
- ✅ Loading state
- ✅ Sign up link (placeholder)
- ✅ Forgot password link (placeholder)
- ✅ Stores login status

### **3. User Type Selection**
- ✅ "I'm a reader" button
- ✅ "I'm an author" button
- ✅ Stores user preference

### **4. Logout Functionality**
- ✅ Logout button in profile
- ✅ Confirmation dialog
- ✅ Clears login status
- ✅ Redirects to login screen

---

## 💾 Data Storage

### **AsyncStorage Keys**
- `userLoggedIn`: 'true' if user has logged in
- `userEmail`: User's email address
- `userType`: 'reader' or 'author'
- `hasSeenSplash`: 'true' if user has seen splash screen

---

## 🔧 Authentication Helper Functions

Located in `utils/auth.ts`:

```typescript
// Check if user is logged in
await isUserLoggedIn()

// Get user type (reader/author)
await getUserType()

// Get user email
await getUserEmail()

// Logout user
await logout()

// Clear all data (for testing)
await clearAllData()
```

---

## 🧪 Testing the Flow

### **Test First Time User**
1. Clear app data (see below)
2. Restart app
3. Should see splash with buttons
4. Tap "I'm a reader" or "I'm an author"
5. Should navigate to login screen

### **Test Returning User**
1. Login once
2. Close and reopen app
3. Should skip splash and go directly to home

### **Test Logout**
1. Go to Profile tab
2. Tap "Logout" button
3. Confirm logout
4. Should navigate to login screen
5. Reopen app - should go to login (not home)

### **Clear App Data (For Testing)**

Add this temporary button anywhere to test:

```tsx
import { clearAllData } from '@/utils/auth'

<TouchableOpacity onPress={async () => {
  await clearAllData()
  alert('Data cleared! Restart app.')
}}>
  <Text>Clear Data</Text>
</TouchableOpacity>
```

---

## 🎨 Login Screen Features

### **Current Features**
- Email input with validation
- Password input (secure)
- Loading state during login
- Error handling
- Responsive design
- Keyboard handling

### **Placeholder Features (To Implement)**
- Sign up functionality
- Forgot password
- Social login (Google, Apple, etc.)
- Email verification

---

## 🔐 Security Notes

### **Current Implementation**
⚠️ **This is a demo implementation**. For production:

1. **Replace mock login** with actual API calls
2. **Add proper authentication** (JWT, OAuth, etc.)
3. **Encrypt sensitive data** in AsyncStorage
4. **Add biometric authentication** (Face ID, Touch ID)
5. **Implement token refresh** logic
6. **Add session timeout**
7. **Validate inputs** on backend

### **Example API Integration**

Replace the mock login in `app/login.tsx`:

```typescript
const handleLogin = async () => {
  setLoading(true)
  
  try {
    // Call your API
    const response = await fetch('YOUR_API_URL/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    
    const data = await response.json()
    
    if (response.ok) {
      // Store auth token
      await AsyncStorage.setItem('authToken', data.token)
      await AsyncStorage.setItem('userLoggedIn', 'true')
      await AsyncStorage.setItem('userEmail', email)
      
      router.replace('/(tabs)')
    } else {
      alert(data.message || 'Login failed')
    }
  } catch (error) {
    alert('Network error. Please try again.')
  } finally {
    setLoading(false)
  }
}
```

---

## 🚀 Next Steps

### **Immediate**
1. Test the authentication flow
2. Customize login screen design
3. Add your API endpoints

### **Short Term**
1. Implement sign up screen
2. Add forgot password flow
3. Add email verification
4. Implement proper API authentication

### **Medium Term**
1. Add social login (Google, Apple)
2. Add biometric authentication
3. Implement user profile editing
4. Add password change functionality

### **Long Term**
1. Add two-factor authentication
2. Implement session management
3. Add security features (rate limiting, etc.)
4. Add analytics tracking

---

## 📝 Customization

### **Change Login Screen Colors**

Edit `app/login.tsx`:
```typescript
style={{ backgroundColor: Colors.splashButton }}
// Change to your preferred color
```

### **Add More User Types**

Add buttons in `app/splash.tsx`:
```tsx
<TouchableOpacity onPress={async () => {
  await AsyncStorage.setItem('userType', 'publisher')
  router.replace('/login')
}}>
  <Text>I'm a publisher</Text>
</TouchableOpacity>
```

### **Skip Login for Testing**

Temporarily bypass login in `app/login.tsx`:
```typescript
const handleLogin = async () => {
  await AsyncStorage.setItem('userLoggedIn', 'true')
  router.replace('/(tabs)')
}
```

---

## 🐛 Troubleshooting

### **App always shows splash buttons**
- Clear AsyncStorage data
- Check `hasSeenSplash` is being set correctly

### **Login doesn't navigate to home**
- Check `userLoggedIn` is being set to 'true'
- Verify router.replace is called

### **Logout doesn't work**
- Check AsyncStorage.removeItem is called
- Verify navigation to /login

### **App crashes on launch**
- Check AsyncStorage is installed correctly
- Run: `npm install @react-native-async-storage/async-storage`
- Restart dev server

---

## 📊 Flow Diagram

```
┌─────────────────┐
│   App Launch    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Splash Screen   │
│  (Animated)     │
└────────┬────────┘
         │
         ▼
    Check Status
         │
    ┌────┴────┬──────────┐
    │         │          │
    ▼         ▼          ▼
First Time  Logged In  Seen Splash
    │         │          │
    ▼         ▼          ▼
Show Buttons  Home    Login
    │
    ▼
Select Role
    │
    ▼
  Login
    │
    ▼
  Home
```

---

## ✅ Summary

Your app now has a complete authentication flow:

1. **First-time users** see splash → select role → login
2. **Returning users** go directly to home
3. **Logged out users** go to login screen
4. **Logout** works from profile screen

All user data is persisted using AsyncStorage, and the flow is smooth with animations!

🎉 **Authentication flow is complete and ready to use!**
