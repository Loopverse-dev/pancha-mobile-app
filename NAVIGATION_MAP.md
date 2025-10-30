# 🗺️ Visual Navigation Map

```
┌─────────────────────────────────────────────────────────────────┐
│                        APP ENTRY POINT                          │
│                         app/index.tsx                           │
│                              ↓                                  │
│                         /splash                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────┴─────────┐
                    │  Check Storage    │
                    └─────────┬─────────┘
                              ↓
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   No flags            hasSeenSplash         userLoggedIn +
        │                     │              onboardingComplete
        ↓                     ↓                     ↓
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│user-selection│      │    /login    │      │   /(tabs)    │
└──────┬───────┘      └──────┬───────┘      └──────────────┘
       │                     │                   HOME SCREEN
   ┌───┴───┐                 │
   │       │                 │
Reader   Author              │
   │       │                 │
   ↓       ↓                 ↓
/login  /choose-avatar   ┌────────┐
   │       │             │Sign In │
   │       │             └───┬────┘
   │       │                 │
   │       │         ┌───────┴────────┐
   │       │         │                │
   │       │      Reader           Author
   │       │         │                │
   ↓       │         ↓                ↓
┌────────┐ │   /choose-child      /(tabs)
│Sign Up │ │         │
└───┬────┘ │         │
    │      │         │
    ↓      │         ↓
/choose-   │   ┌──────────┐
 child     │   │Has child?│
    │      │   └────┬─────┘
    │      │        │
    │      │    ┌───┴───┐
    │      │    │       │
    │      │   Yes     No
    │      │    │       │
    │      │    │       ↓
    │      │    │  /choose-avatar
    │      │    │       │
    │      ↓    ↓       │
    │  /choose-avatar   │
    │      │            │
    │      ↓            │
    └─────→ /enter-pin ←┘
              │
              ↓
          Save PIN +
       onboardingComplete
              │
              ↓
          /(tabs)
              │
    ┌─────────┼─────────┐
    │         │         │
    ↓         ↓         ↓
/stories  /lullabies /songs
          /author-stories


┌─────────────────────────────────────────┐
│         LOGOUT FLOWS                    │
├─────────────────────────────────────────┤
│  Settings → /login                      │
│  Profile  → /user-selection             │
└─────────────────────────────────────────┘
```

## 🔑 Key Navigation Patterns

### **Replace (→)** - No back button
Used for main flow transitions where user shouldn't go back

### **Push (⇢)** - With back button
Used for browsing content or optional flows

## 📱 User Journey Examples

### **New Reader Journey:**
```
index → splash → user-selection → login → signup → 
choose-child → choose-avatar → enter-pin → tabs
```

### **New Author Journey:**
```
index → splash → user-selection → choose-avatar → 
enter-pin → tabs
```

### **Returning User:**
```
index → splash → tabs (direct)
```

### **Incomplete Onboarding:**
```
index → splash → choose-child → enter-pin → tabs
```

## ✅ All Routes Working Correctly!

The navigation system is properly structured with:
- Clear entry point
- Proper onboarding flow
- User type differentiation
- Onboarding completion tracking
- Content browsing with back navigation
