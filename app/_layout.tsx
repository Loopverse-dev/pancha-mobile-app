import { ErrorBoundary } from '@/components'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
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
              navigationBarHidden: true,
            }}
          />
          <Stack.Screen
            name="user-selection"
            options={{
              headerShown: false,
              statusBarStyle: 'dark',
              navigationBarHidden: true,
            }}
          />
          <Stack.Screen
            name="choose-avatar"
            options={{
              headerShown: false,
              statusBarStyle: 'dark',
              navigationBarHidden: true,
            }}
          />
          <Stack.Screen
            name="enter-pin"
            options={{
              headerShown: false,
              statusBarStyle: 'dark',
              navigationBarHidden: true,
            }}
          />
          <Stack.Screen
            name="choose-child"
            options={{
              headerShown: false,
              statusBarStyle: 'dark',
              navigationBarHidden: true,
            }}
          />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="stories"
            options={{
              headerShown: false,
              statusBarStyle: 'dark',
            }}
          />
          <Stack.Screen
            name="author-stories"
            options={{
              headerShown: false,
              statusBarStyle: 'dark',
            }}
          />
          <Stack.Screen
            name="lullabies"
            options={{
              headerShown: false,
              statusBarStyle: 'dark',
            }}
          />
          <Stack.Screen
            name="songs"
            options={{
              headerShown: false,
              statusBarStyle: 'dark',
            }}
          />
        </Stack>
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}

export default RootLayout
