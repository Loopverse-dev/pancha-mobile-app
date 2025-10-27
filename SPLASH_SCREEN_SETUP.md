# Splash Screen Setup Guide

## ✅ What's Been Implemented

### 1. **Splash Screen Component** (`app/splash.tsx`)
- Light blue background (#C8E3F5)
- Circular container for elephant character
- Two rounded buttons: "I'm a reader" and "I'm an author"
- Proper navigation to main app

### 2. **Color Theme** (`constants/colors.ts`)
- `splashBackground`: #C8E3F5 (light blue)
- `splashButton`: #2B5F7F (dark blue for buttons)
- `splashButtonAlt`: #3A6B8C (alternative blue)
- `splashCircle`: #A8D0E8 (circle background)

### 3. **Placeholder Component** (`components/ElephantPlaceholder.tsx`)
- Emoji-based placeholder (👑 🐘 📖)
- Can be replaced with actual image

### 4. **Navigation Flow**
- App starts at splash screen
- Buttons navigate to main tab navigation
- Smooth transition between screens

---

## 📸 Adding the Actual Elephant Image

### Option 1: Using a PNG/JPG Image

1. **Save the elephant image** as `elephant-reader.png` in:
   ```
   assets/images/elephant-reader.png
   ```

2. **Update the splash screen** (`app/splash.tsx`):
   ```tsx
   import { Image } from 'react-native'
   
   // Replace ElephantPlaceholder with:
   <Image
     source={require('@/assets/images/elephant-reader.png')}
     className="w-48 h-48"
     resizeMode="contain"
   />
   ```

3. **Remove the placeholder import**:
   ```tsx
   // Remove this line:
   import { ElephantPlaceholder } from '@/components'
   ```

### Option 2: Using expo-image (Recommended for Better Performance)

1. **The image is already in your assets**

2. **Update splash.tsx**:
   ```tsx
   import { Image } from 'expo-image'
   
   <Image
     source={require('@/assets/images/elephant-reader.png')}
     style={{ width: 192, height: 192 }}
     contentFit="contain"
   />
   ```

### Option 3: Using a Remote URL

```tsx
<Image
  source={{ uri: 'https://your-cdn.com/elephant-reader.png' }}
  className="w-48 h-48"
  resizeMode="contain"
/>
```

---

## 🎨 Customizing the Splash Screen

### Change Colors

Edit `constants/colors.ts`:
```typescript
splashBackground: '#YOUR_COLOR',
splashButton: '#YOUR_BUTTON_COLOR',
```

### Change Button Text

Edit `app/splash.tsx`:
```tsx
<Text>Your Custom Text</Text>
```

### Change Button Actions

Edit the handler functions in `app/splash.tsx`:
```tsx
const handleReaderPress = () => {
  // Add your custom logic
  router.replace('/(tabs)')
}
```

---

## 🔄 Navigation Flow

```
App Launch
    ↓
index.tsx (redirects)
    ↓
splash.tsx (Splash Screen)
    ↓
User selects role
    ↓
(tabs)/_layout.tsx (Main App)
```

---

## 🎯 Current File Structure

```
app/
├── index.tsx              # Entry point (redirects to splash)
├── splash.tsx             # Splash screen component
├── _layout.tsx            # Root layout with Stack navigation
└── (tabs)/               # Main app screens
    ├── _layout.tsx        # Tab navigation
    ├── index.tsx          # Home
    ├── category.tsx       # Categories
    ├── products.tsx       # Products
    └── profile.tsx        # Profile

components/
├── ElephantPlaceholder.tsx  # Temporary placeholder
└── ...

constants/
└── colors.ts              # Splash screen colors added
```

---

## 🧪 Testing the Splash Screen

1. **Start the app**:
   ```bash
   npm start
   ```

2. **You should see**:
   - Light blue background
   - Circular container with elephant placeholder
   - Two blue buttons

3. **Test navigation**:
   - Tap "I'm a reader" → Goes to main app
   - Tap "I'm an author" → Goes to main app

---

## 🚀 Next Steps

### Immediate
1. Add the actual elephant image to `assets/images/`
2. Update `splash.tsx` to use the real image
3. Test on both iOS and Android

### Optional Enhancements
1. **Add animation**: Fade in the elephant character
2. **Add loading state**: Show while checking user status
3. **Persist user choice**: Save reader/author preference
4. **Add skip button**: Allow users to skip splash screen
5. **Add version number**: Display app version at bottom

---

## 💡 Tips

- **Image Size**: Keep the elephant image around 512x512px for best quality
- **File Format**: PNG with transparency works best
- **File Size**: Optimize to < 200KB for faster loading
- **Aspect Ratio**: Square (1:1) works best with the circular container

---

## 🐛 Troubleshooting

### Image not showing?
- Check file path is correct
- Ensure image is in `assets/images/` folder
- Try restarting the dev server: `npm start -- --clear`

### Colors look different?
- Check `constants/colors.ts` values
- Verify hex codes match design
- Clear cache and rebuild

### Navigation not working?
- Check `useRouter` import from 'expo-router'
- Verify route names match file structure
- Check console for errors

---

## 📝 Code Example: Complete Splash Screen with Real Image

```tsx
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants'

const SplashScreen = (): React.JSX.Element => {
  const router = useRouter()

  return (
    <SafeAreaView 
      className="flex-1" 
      style={{ backgroundColor: Colors.splashBackground }}
    >
      <View className="flex-1 items-center justify-center px-8">
        <View className="mb-12">
          <View 
            className="w-64 h-64 rounded-full items-center justify-center"
            style={{ backgroundColor: Colors.splashCircle }}
          >
            <Image
              source={require('@/assets/images/elephant-reader.png')}
              style={{ width: 192, height: 192 }}
              resizeMode="contain"
            />
          </View>
        </View>

        <View className="w-full max-w-xs">
          <TouchableOpacity
            onPress={() => router.replace('/(tabs)')}
            className="rounded-full py-4 px-8 mb-4"
            style={{ backgroundColor: Colors.splashButton }}
          >
            <Text className="text-white text-center text-lg font-semibold">
              I&apos;m a reader
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace('/(tabs)')}
            className="rounded-full py-4 px-8"
            style={{ backgroundColor: Colors.splashButton }}
          >
            <Text className="text-white text-center text-lg font-semibold">
              I&apos;m an author
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SplashScreen
```
