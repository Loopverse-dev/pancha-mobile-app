# Route Testing Guide

## Quick Route Check

Run this command to test all routes are accessible:
```bash
npm start
```

## Manual Testing Steps

### ✅ Test 1: Fresh Install - Reader Flow
1. **Clear Storage**: Long-press elephant logo on splash screen → Clear Storage
2. **Expected Flow**:
   - `/splash` → Animated elephant logo (3 seconds)
   - `/user-selection` → Two buttons: "I'm a reader" & "I'm an author"
   - Press **"I'm a reader"**
   - `/login` → Email & password fields
   - Enter any credentials → Press Login
   - `/enter-pin` → Number pad, 4 PIN dots
   - Enter 4 digits (e.g., 1234) → Press Continue
   - `/choose-child` → Shows created profile + "Add new profile"
   - Select profile
   - `/(tabs)` → Main app with bottom tabs

**Expected Result**: ✅ All screens load, navigation works

---

### ✅ Test 2: Fresh Install - Author Flow
1. **Clear Storage**: Long-press elephant logo on splash screen → Clear Storage
2. **Expected Flow**:
   - `/splash` → Animated elephant logo
   - `/user-selection` → Two buttons
   - Press **"I'm an author"**
   - `/choose-avatar` → Name input, gender selection, age picker
   - Fill details → Press Go
   - `/enter-pin` → Create PIN
   - Enter 4 digits → Press Continue
   - `/choose-child` → Shows profile
   - Select profile
   - `/(tabs)` → Main app

**Expected Result**: ✅ All screens load, data saves correctly

---

### ✅ Test 3: Returning User
1. **Don't clear storage**
2. **Close and reopen app**
3. **Expected Flow**:
   - `/splash` → Brief logo display
   - `/(tabs)` → Direct to home (skips login)

**Expected Result**: ✅ Skips onboarding, goes straight to home

---

### ✅ Test 4: Logout Flow
1. **From main app**:
   - Go to Profile tab
   - Press Logout button
   - Confirm logout
2. **Expected Flow**:
   - `/user-selection` → Back to user type selection
   - Can choose reader or author again

**Expected Result**: ✅ Returns to user selection

---

### ✅ Test 5: PIN Validation
1. **Navigate to** `/enter-pin` (via reader flow)
2. **Enter wrong PIN**
3. **Expected**:
   - Alert: "Incorrect PIN"
   - PIN dots clear
   - Can try again

**Expected Result**: ✅ PIN validation works

---

### ✅ Test 6: Add New Profile
1. **From** `/choose-child`
2. **Press** "Add a new profile"
3. **Expected Flow**:
   - `/choose-avatar` → Create new profile
   - Fill details → Press Go
   - `/enter-pin` → Validate existing PIN
   - Enter correct PIN → Press Continue
   - `/choose-child` → Back to selection

**Expected Result**: ✅ Can add multiple profiles

---

### ✅ Test 7: Age Picker
1. **Navigate to** `/choose-avatar`
2. **Press** age dropdown
3. **Expected**:
   - Modal appears with ages 3-12
   - Can select age
   - Modal closes
   - Selected age shows

**Expected Result**: ✅ Age picker works

---

### ✅ Test 8: Back Navigation
Test back button behavior:
- ❌ `/splash` → No back (entry point)
- ❌ `/user-selection` → No back (uses replace)
- ❌ `/login` → No back (uses replace)
- ✅ `/choose-avatar` → Can go back
- ✅ `/enter-pin` → Can go back
- ✅ `/choose-child` → Can go back
- ❌ `/(tabs)` → No back (uses replace)

**Expected Result**: ✅ Back navigation works as designed

---

## Route Status Summary

| Route | Status | File | Navigation |
|-------|--------|------|------------|
| `/` | ✅ | `app/index.tsx` | Redirects to `/splash` |
| `/splash` | ✅ | `app/splash.tsx` | Entry point |
| `/user-selection` | ✅ | `app/user-selection.tsx` | Reader/Author choice |
| `/login` | ✅ | `app/login.tsx` | Email/password |
| `/choose-avatar` | ✅ | `app/choose-avatar.tsx` | Profile creation |
| `/enter-pin` | ✅ | `app/enter-pin.tsx` | PIN entry |
| `/choose-child` | ✅ | `app/choose-child.tsx` | Profile selection |
| `/(tabs)` | ✅ | `app/(tabs)/_layout.tsx` | Main app |
| `/(tabs)/index` | ✅ | `app/(tabs)/index.tsx` | Home tab |
| `/(tabs)/category` | ✅ | `app/(tabs)/category.tsx` | Categories tab |
| `/(tabs)/products` | ✅ | `app/(tabs)/products.tsx` | Products tab |
| `/(tabs)/profile` | ✅ | `app/(tabs)/profile.tsx` | Profile tab |

---

## TypeScript Validation

```bash
npm run type-check
```

**Result**: ✅ No errors (all routes properly typed)

---

## Common Issues & Solutions

### Issue: "Route not found"
**Solution**: Check route is registered in `app/_layout.tsx`

### Issue: TypeScript route errors
**Solution**: Restart dev server - route types regenerate automatically

### Issue: Navigation doesn't work
**Solution**: 
- Check `router.push()` vs `router.replace()` usage
- Verify route path matches file name

### Issue: Data not persisting
**Solution**: Check AsyncStorage keys match across screens

---

## Debug Tools

### Clear All Data
Long-press elephant logo on splash screen → Shows debug menu → Clear Storage

### Check AsyncStorage
Add to any screen:
```typescript
const checkStorage = async () => {
  const keys = await AsyncStorage.getAllKeys()
  const data = await AsyncStorage.multiGet(keys)
  console.log('Storage:', data)
}
```

### Navigation Logs
Check console for navigation logs:
- "Navigating to tabs"
- "Navigating to login"
- "Navigating to user-selection"

---

## All Routes Working ✅

**Status**: All 12 routes are properly configured and working!

**Last Verified**: Oct 28, 2025
**TypeScript**: No errors
**Navigation**: All flows tested
**Data Flow**: AsyncStorage working
