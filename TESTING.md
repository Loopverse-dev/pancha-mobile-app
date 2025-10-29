# Testing Checklist for Pancha App

## ✅ Build Status
- [x] TypeScript compilation: PASSED
- [x] ESLint: PASSED
- [x] Metro Bundler: RUNNING

## 🧪 Navigation Flow Testing

### New User Flow (Reader)
1. **Splash Screen** → `user-selection`
   - [ ] Test: First time user sees splash animation
   - [ ] Test: Navigates to user-selection after animation

2. **User Selection** → `login`
   - [ ] Test: Click "I'm a reader" button
   - [ ] Test: Stores userType='reader' in AsyncStorage
   - [ ] Test: Navigates to login screen

3. **Login** → `choose-child`
   - [ ] Test: Enter email and password
   - [ ] Test: Stores userLoggedIn='true' in AsyncStorage
   - [ ] Test: Navigates to choose-child screen

4. **Choose Child** → `choose-avatar` (auto-redirect for new user)
   - [ ] Test: Auto-redirects to choose-avatar if no childName exists
   - [ ] Test: Shows existing child profile if childName exists

5. **Choose Avatar** → `enter-pin`
   - [ ] Test: Enter child name (required)
   - [ ] Test: Select gender (girl/boy)
   - [ ] Test: Select age (3-12)
   - [ ] Test: Stores childName, childGender, childAge in AsyncStorage
   - [ ] Test: Navigates to enter-pin screen

6. **Enter PIN** → `(tabs)`
   - [ ] Test: Enter 4-digit PIN
   - [ ] Test: Stores parentalPin in AsyncStorage
   - [ ] Test: Stores onboardingComplete='true' in AsyncStorage
   - [ ] Test: Navigates to home (tabs) screen

### Returning User Flow
1. **Splash Screen** → `(tabs)`
   - [ ] Test: Checks userLoggedIn='true' in AsyncStorage
   - [ ] Test: Directly navigates to home (tabs)

### Author Flow
1. **User Selection** → `choose-avatar`
   - [ ] Test: Click "I'm an author" button
   - [ ] Test: Stores userType='author' in AsyncStorage
   - [ ] Test: Navigates to choose-avatar screen

## 🏠 Home Screen Features
- [ ] Test: Header with user avatar and welcome message
- [ ] Test: Search button in header
- [ ] Test: Hero banner with PANCHA branding
- [ ] Test: "Our Top Picks" horizontal scroll
- [ ] Test: 4 placeholder cards with heart icons
- [ ] Test: Content Library section with 4 buttons:
  - [ ] Stories button → navigates to /stories
  - [ ] Author Stories button → navigates to /author-stories
  - [ ] Lullabies button → navigates to /lullabies
  - [ ] Songs button → navigates to /songs

## 📱 Bottom Navigation Bar
- [ ] Test: 5 tabs visible
- [ ] Test: Home tab (active state shows blue circle)
- [ ] Test: Stories tab
- [ ] Test: Games tab
- [ ] Test: Rewards tab
- [ ] Test: Settings tab
- [ ] Test: Active tab color: #2563EB (blue)
- [ ] Test: Inactive tab color: #6B7280 (gray)

## 📖 Content Screens

### Stories Screen
- [ ] Test: Back button navigates to home
- [ ] Test: Featured story banner
- [ ] Test: 6 story categories displayed
- [ ] Test: Popular stories list with play buttons

### Author Stories Screen
- [ ] Test: Back button navigates to home
- [ ] Test: "Create Your Story" banner
- [ ] Test: Featured authors list
- [ ] Test: Latest stories feed

### Lullabies Screen
- [ ] Test: Back button navigates to home
- [ ] Test: Sleep timer banner with duration options
- [ ] Test: 4 lullaby categories
- [ ] Test: Popular lullabies with play buttons

### Songs Screen
- [ ] Test: Back button navigates to home
- [ ] Test: Now Playing banner with controls
- [ ] Test: Playlist carousel
- [ ] Test: 4 song categories
- [ ] Test: Popular songs list

### Settings Screen
- [ ] Test: Profile section with avatar
- [ ] Test: Switch child option
- [ ] Test: Notifications toggle
- [ ] Test: Auto-play toggle
- [ ] Test: Dark mode toggle
- [ ] Test: Parental controls options
- [ ] Test: Help & Support
- [ ] Test: About
- [ ] Test: Logout button

## 🔧 AsyncStorage Keys
- `userType`: 'reader' | 'author'
- `hasSeenSplash`: 'true'
- `userLoggedIn`: 'true'
- `userEmail`: string
- `childName`: string
- `childGender`: 'girl' | 'boy'
- `childAge`: string
- `parentalPin`: string (4 digits)
- `onboardingComplete`: 'true'

## 🐛 Known Issues to Test
- [ ] Test: PIN validation works correctly
- [ ] Test: Back navigation doesn't break the flow
- [ ] Test: App state persists after reload
- [ ] Test: Clear storage debug option works

## 📝 Manual Testing Steps

### Test 1: Complete New User Flow
1. Clear app storage (long press on splash screen)
2. Go through: user-selection → login → choose-child → choose-avatar → enter-pin → home
3. Verify all data is saved
4. Close and reopen app
5. Verify it goes directly to home

### Test 2: Existing User with Child
1. Have childName in storage
2. Go to choose-child
3. Select existing child
4. Enter PIN
5. Verify navigation to home

### Test 3: Content Navigation
1. From home, click each Content Library button
2. Verify correct screen opens
3. Test back navigation
4. Verify returns to home

### Test 4: Tab Navigation
1. Click each tab in bottom navigation
2. Verify correct screen displays
3. Verify active state styling

## 🎯 Performance Checks
- [ ] App loads within 2 seconds
- [ ] Animations are smooth (60fps)
- [ ] No memory leaks
- [ ] Images load properly
- [ ] Scrolling is smooth

## 🔐 Security Checks
- [ ] PIN is stored securely
- [ ] User data is validated
- [ ] No sensitive data in logs
