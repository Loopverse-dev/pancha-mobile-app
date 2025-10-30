# Quick Start Guide 🚀

Get your Pancha App up and running in minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js v18+ installed
- ✅ npm or yarn package manager
- ✅ Expo CLI (will be installed with dependencies)
- ✅ iOS Simulator (Mac) or Android Emulator

## Installation (3 Steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

### 3. Run on Device
Choose your platform:
- Press **`a`** for Android
- Press **`i`** for iOS
- Press **`w`** for Web
- Scan QR code with Expo Go app

## Project Structure at a Glance

```
pancha-app/
├── app/(tabs)/          # 📱 All your screens
│   ├── index.tsx        # Home screen
│   ├── category.tsx     # Categories
│   ├── products.tsx     # Products list
│   └── profile.tsx      # User profile
├── components/          # 🧩 Reusable components
├── constants/           # 🎨 Colors & constants
├── types/              # 📝 TypeScript types
├── utils/              # 🛠️ Helper functions
└── hooks/              # 🪝 Custom React hooks
```

## Common Commands

```bash
# Development
npm start              # Start dev server
npm run android        # Run on Android
npm run ios           # Run on iOS

# Code Quality
npm run lint          # Check for errors
npm run format        # Format code
npm run type-check    # Check TypeScript

# Clean Start
npm start -- --clear  # Clear cache and start
```

## Making Your First Change

1. **Edit Home Screen**: Open `app/(tabs)/index.tsx`
2. **Change the welcome text**
3. **Save the file** - changes appear instantly! ⚡

## Adding a New Screen

1. Create file in `app/(tabs)/newscreen.tsx`
2. Add tab in `app/(tabs)/_layout.tsx`
3. That's it! Expo Router handles the rest

## Styling with Tailwind

Use NativeWind classes directly:

```tsx
<View className="bg-blue-500 p-4 rounded-xl">
  <Text className="text-white font-bold">Hello!</Text>
</View>
```

## Using Components

Import from the component library:

```tsx
import { Button, Card } from '@/components'

<Button 
  title="Click Me" 
  onPress={() => alert('Clicked!')}
  variant="primary"
/>
```

## Troubleshooting

### App won't start?
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm start -- --clear
```

### Tailwind classes not working?
- Check `global.css` is imported in `app/_layout.tsx`
- Restart the dev server

### TypeScript errors?
```bash
npm run type-check
```

### Port already in use?
```bash
# Kill the process
npx kill-port 8081
npm start
```

## Next Steps

1. **Customize Colors**: Edit `constants/colors.ts`
2. **Add API Integration**: Create services in `services/` folder
3. **Add State Management**: Install Zustand or Redux
4. **Add Authentication**: Implement auth flow
5. **Deploy**: Build with `eas build`

## Useful Resources

- 📚 [Expo Docs](https://docs.expo.dev/)
- 🎨 [NativeWind Docs](https://www.nativewind.dev/)
- 🧭 [Expo Router Docs](https://docs.expo.dev/router/introduction/)
- 🎯 [TypeScript Docs](https://www.typescriptlang.org/)

## Need Help?

- Check `README.md` for detailed documentation
- Review `IMPROVEMENTS_SUMMARY.md` for all changes made
- Check `CHANGELOG.md` for version history

---

**Happy Coding! 🎉**

Built with ❤️ using Expo, React Native, and TypeScript
