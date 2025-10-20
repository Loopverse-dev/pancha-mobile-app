import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ErrorBoundary } from '@/components'
import { useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import '../global.css'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

const RootLayout = (): React.JSX.Element => {
  useEffect(() => {
    // Hide the native splash screen after a short delay
    const timer = setTimeout(() => {
      SplashScreen.hideAsync()
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen 
            name="splash" 
            options={{ 
              headerShown: false,
              statusBarStyle: 'dark',
              statusBarTranslucent: true,
              navigationBarHidden: true,
            }} 
          />
          <Stack.Screen 
            name="user-selection" 
            options={{ 
              headerShown: false,
              statusBarStyle: 'dark',
              statusBarTranslucent: true,
              navigationBarHidden: true,
            }} 
          />
          <Stack.Screen name="login" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}

export default RootLayout