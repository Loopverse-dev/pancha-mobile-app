# User Selection Screen

## Overview
The User Selection Screen is the second screen in the app flow, displayed after the splash screen for first-time users. It allows users to choose their role (Reader or Author) before proceeding to login.

## Design Specifications

### Colors (from Constants)
- **Background**: `#C8E3F5` (splashBackground) - Light blue
- **Container Background**: `#A8D0E8` (splashCircle) - Lighter blue
- **Button Background**: `#2B5F7F` (splashButton) - Dark blue
- **Button Text**: White

### Layout
- **Elephant Container**:
  - Size: 280x280 pixels
  - Border radius: 48px (rounded square)
  - Background: Light blue (#A8D0E8)
  - Shadow: Subtle drop shadow for depth
  - Image size: 220x220 pixels

- **Buttons**:
  - Width: 100% (max 280px)
  - Height: Auto (18px padding vertical)
  - Border radius: 16px
  - Gap between buttons: 16px
  - Font size: 18px
  - Font weight: 600 (semi-bold)
  - Letter spacing: 0.3px
  - Shadow: Subtle elevation

### Assets Used
- **Elephant Image**: `/assets/images/elephant-reader.png`
  - Shows elephant with crown reading a book
  - Transparent background
  - Size: 220x220 pixels in container

## User Flow

### Navigation Flow
1. **Splash Screen** (1.5 seconds)
   - Shows animated elephant logo
   - Checks user authentication status
   
2. **User Selection Screen** (First-time users only)
   - User selects "I'm a reader" or "I'm an author"
   - Selection is stored in AsyncStorage
   - Navigates to Login screen

3. **Login Screen**
   - User completes authentication

### Storage Keys
- `hasSeenSplash`: 'true' - Marks that user has seen splash
- `userType`: 'reader' | 'author' - Stores user's selected role

## File Structure
```
app/
├── splash.tsx              # Initial splash screen with animation
├── user-selection.tsx      # User role selection (NEW)
├── login.tsx              # Login/authentication screen
└── _layout.tsx            # Route configuration
```

## Implementation Details

### Key Features
1. **Clean Separation**: Splash screen now only handles animation and routing
2. **Dedicated Screen**: User selection has its own route and screen
3. **Consistent Design**: Uses same color scheme as splash screen
4. **Smooth Transitions**: Router.replace() for seamless navigation
5. **Error Handling**: Fallback navigation to user-selection on errors

### Code Quality
- ✅ TypeScript compilation: No errors
- ✅ ESLint: No warnings
- ✅ Proper React hooks usage
- ✅ Accessible text with proper escaping
- ✅ Consistent styling with design system

## Testing Checklist
- [ ] First-time user flow (splash → user-selection → login)
- [ ] Returning user flow (splash → login)
- [ ] Logged-in user flow (splash → home tabs)
- [ ] Button press interactions
- [ ] AsyncStorage persistence
- [ ] Screen transitions
- [ ] Visual design matches mockup

## Future Enhancements
- Add fade-in animation for buttons
- Add haptic feedback on button press
- Consider adding skip option for returning users
- Add accessibility labels for screen readers
