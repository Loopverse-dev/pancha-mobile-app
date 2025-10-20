# Pancha App 🛍️

A modern e-commerce mobile application built with Expo, React Native, and TypeScript.

## 🚀 Features

- **Tab Navigation**: Intuitive bottom tab navigation with Home, Categories, Products, and Profile screens
- **Modern UI**: Beautiful interface built with NativeWind (Tailwind CSS for React Native)
- **TypeScript**: Full type safety throughout the application
- **Error Handling**: Global error boundary for graceful error recovery
- **Reusable Components**: Well-structured component library
- **Safe Area Support**: Proper handling of device notches and system UI

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac only) or Android Emulator

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pancha-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration values.

## 🏃 Running the App

### Development

```bash
npm start
```

This will start the Expo development server. You can then:

- Press `i` to open iOS Simulator
- Press `a` to open Android Emulator
- Scan QR code with Expo Go app on your physical device

### Platform-specific

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📝 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## 📁 Project Structure

```
pancha-app/
├── app/                    # App screens and navigation
│   ├── (tabs)/            # Tab-based screens
│   │   ├── _layout.tsx    # Tab navigation layout
│   │   ├── index.tsx      # Home screen
│   │   ├── category.tsx   # Categories screen
│   │   ├── products.tsx   # Products screen
│   │   └── profile.tsx    # Profile screen
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── ErrorBoundary.tsx
│   └── index.ts
├── constants/            # App constants
│   ├── colors.ts
│   └── index.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── assets/             # Images, fonts, etc.
├── global.css         # Global Tailwind styles
└── package.json
```

## 🎨 Tech Stack

- **Framework**: [Expo](https://expo.dev/) ~54.0
- **Language**: [TypeScript](https://www.typescriptlang.org/) ~5.9
- **UI Library**: [React Native](https://reactnative.dev/) 0.81
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) ~6.0
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS) ^4.2
- **Icons**: [@expo/vector-icons](https://icons.expo.fyi/)
- **Code Quality**: ESLint, Prettier

## 🔧 Configuration

### TypeScript

TypeScript is configured with strict mode enabled. See `tsconfig.json` for details.

### ESLint

ESLint is configured with Expo's recommended rules. See `eslint.config.js`.

### Prettier

Code formatting is handled by Prettier with Tailwind CSS plugin. See `.prettierrc`.

## 🧩 Components

### Button
Reusable button component with variants (primary, secondary, danger) and loading states.

### Card
Container component for content sections with consistent styling.

### ErrorBoundary
Global error boundary that catches and displays errors gracefully.

## 📱 Screens

### Home
Welcome screen with featured sections and navigation cards.

### Categories
Grid view of product categories with icons.

### Products
List of products with ratings and add-to-cart functionality.

### Profile
User profile with settings and menu options.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email support@example.com or open an issue in the repository.

## 🙏 Acknowledgments

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [NativeWind Documentation](https://www.nativewind.dev/)
