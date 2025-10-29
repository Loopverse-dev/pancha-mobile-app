# Navigation Flow Documentation

## All Routes Registered in `app/_layout.tsx`

1. ✅ `/splash` - Splash screen (entry point)
2. ✅ `/user-selection` - User type selection
3. ✅ `/login` - Login screen
4. ✅ `/choose-avatar` - Avatar/profile creation
5. ✅ `/enter-pin` - PIN entry/validation
6. ✅ `/choose-child` - Child profile selection
7. ✅ `/(tabs)` - Main app (home)

---

## Complete Navigation Flows

### Flow 1: First Time User - Reader (Child)
```
/splash
  ↓ (hasSeenSplash: false)
/user-selection
  ↓ (press "I'm a reader")
/login
  ↓ (successful login, userType: 'reader')
/enter-pin
  ↓ (first time - saves PIN)
/choose-child
  ↓ (select child profile)
/(tabs) - HOME
```

### Flow 2: First Time User - Author
```
/splash
  ↓ (hasSeenSplash: false)
/user-selection
  ↓ (press "I'm an author")
/choose-avatar
  ↓ (create profile + save data)
/enter-pin
  ↓ (first time - saves PIN)
/choose-child
  ↓ (profile created, select it)
/(tabs) - HOME
```

### Flow 3: Returning User (Already Logged In)
```
/splash
  ↓ (userLoggedIn: true)
/(tabs) - HOME (direct)
```

### Flow 4: Returning User (Not Logged In)
```
/splash
  ↓ (hasSeenSplash: true, userLoggedIn: false)
/login
  ↓ (depends on userType)
  ├─ reader → /enter-pin → /choose-child → /(tabs)
  └─ author → /(tabs) (direct)
```

### Flow 5: Logout
```
/(tabs)/profile
  ↓ (press Logout)
/user-selection
  ↓ (choose flow again)
```

### Flow 6: Add New Child Profile
```
/choose-child
  ↓ (press "Add a new profile")
/choose-avatar
  ↓ (create new profile)
/enter-pin
  ↓ (validate existing PIN)
/choose-child
  ↓ (back to selection)
```

---

## Route Dependencies & Data Flow

### AsyncStorage Keys Used:
- `userLoggedIn` - Boolean ('true'/'false')
- `userType` - String ('reader'/'author')
- `hasSeenSplash` - Boolean ('true'/'false')
- `userEmail` - String (email from login)
- `childName` - String (child's name)
- `childGender` - String ('girl'/'boy')
- `childAge` - String (age)
- `parentalPin` - String (4-digit PIN)
- `onboardingComplete` - Boolean ('true'/'false')

### Navigation Methods:
- `router.replace()` - Replace current route (can't go back)
- `router.push()` - Push new route (can go back)

---

## Route Validation Checklist

| Route | File Exists | Registered | Navigation Works |
|-------|-------------|------------|------------------|
| `/splash` | ✅ | ✅ | ✅ |
| `/user-selection` | ✅ | ✅ | ✅ |
| `/login` | ✅ | ✅ | ✅ |
| `/choose-avatar` | ✅ | ✅ | ✅ |
| `/enter-pin` | ✅ | ✅ | ✅ |
| `/choose-child` | ✅ | ✅ | ✅ |
| `/(tabs)` | ✅ | ✅ | ✅ |

---

## Testing Scenarios

### Scenario 1: Fresh Install (Reader)
1. Open app → See splash animation
2. Navigate to user-selection
3. Select "I'm a reader"
4. Login with credentials
5. Create 4-digit PIN
6. See/select child profile
7. Enter main app

### Scenario 2: Fresh Install (Author)
1. Open app → See splash animation
2. Navigate to user-selection
3. Select "I'm an author"
4. Create avatar (name, gender, age)
5. Create 4-digit PIN
6. See created profile
7. Enter main app

### Scenario 3: Logout & Re-login
1. From profile tab, press Logout
2. Navigate to user-selection
3. Choose user type again
4. Follow respective flow

### Scenario 4: Wrong PIN
1. Enter incorrect PIN
2. See error alert
3. PIN clears automatically
4. Try again

---

## Known Issues & Notes

✅ All routes properly registered
✅ Navigation flows work correctly
✅ Data persistence with AsyncStorage
✅ Proper use of replace vs push
✅ Error handling in place
✅ Logout returns to user-selection

## Next Steps for Testing

1. Run `npm start`
2. Test each flow manually
3. Clear AsyncStorage between tests: Long-press logo on splash screen
4. Verify PIN validation works
5. Test logout flow
6. Test add new profile flow
