import { View, Image, StatusBar, TouchableOpacity, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { useEffect, useCallback, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence
} from 'react-native-reanimated'
import { Colors, Spacing } from '@/constants'

const SplashScreen = (): React.JSX.Element => {
  const router = useRouter()
  const [showDebug, setShowDebug] = useState(false)
  
  // Animation values - start with some visibility so logo shows immediately
  const opacity = useSharedValue(1)
  const scale = useSharedValue(0.8)

  const checkFirstTimeUser = useCallback(async () => {
    try {
      // Animate elephant entrance - bounce effect
      scale.value = withSequence(
        withTiming(1.1, { duration: 600 }),
        withTiming(1, { duration: 200 })
      )

      // Check if user has logged in before
      const userLoggedIn = await AsyncStorage.getItem('userLoggedIn')
      const hasSeenSplash = await AsyncStorage.getItem('hasSeenSplash')

      console.log('Splash Screen - userLoggedIn:', userLoggedIn)
      console.log('Splash Screen - hasSeenSplash:', hasSeenSplash)

      // Wait for animation to complete
      await new Promise(resolve => setTimeout(resolve, 1500))

      if (userLoggedIn === 'true') {
        // User has logged in before, show logo briefly then go to home
        console.log('Navigating to tabs')
        router.replace('/(tabs)')
      } else if (hasSeenSplash === 'true') {
        // User has seen splash but not logged in, show logo briefly then go to login
        console.log('Navigating to login')
        router.replace('/login')
      } else {
        // First time user, wait for full animation then go to user selection
        console.log('Navigating to user-selection')
        router.replace('/user-selection')
      }
    } catch (error) {
      console.error('Error checking first time user:', error)
      router.replace('/user-selection')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  useEffect(() => {
    checkFirstTimeUser()
  }, [checkFirstTimeUser])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }))

  const handleClearStorage = async () => {
    await AsyncStorage.clear()
    console.log('Storage cleared!')
    setShowDebug(false)
    // Reload the check
    checkFirstTimeUser()
  }

  return (
    <View 
      style={{ 
        flex: 1, 
        backgroundColor: Colors.splashBackground 
      }}
    >
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={Colors.splashBackground} 
        translucent={true}
      />
      <View 
        style={{ 
          flex: 1, 
          alignItems: 'center', 
          justifyContent: 'center',
          paddingHorizontal: Spacing.screenPadding,
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        {/* Elephant Character Container - Centered */}
        <View style={{ 
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Animated.View style={animatedStyle}>
            <View 
              style={{ 
                width: 256, 
                height: 256, 
                borderRadius: 128,
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: Colors.splashCircle 
              }}
            >
              <Image
                source={require('@/assets/images/elephant-reader.png')}
                style={{ width: 192, height: 192 }}
                resizeMode="contain"
              />
            </View>
          </Animated.View>
        </View>

        {/* Debug button - Long press on logo to show */}
        <TouchableOpacity
          onLongPress={() => setShowDebug(true)}
          style={{
            position: 'absolute',
            bottom: 40,
            alignSelf: 'center',
          }}
        >
          <Text style={{ color: 'transparent' }}>Debug</Text>
        </TouchableOpacity>

        {showDebug && (
          <View style={{
            position: 'absolute',
            bottom: 80,
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 8,
            gap: 8,
          }}>
            <TouchableOpacity
              onPress={handleClearStorage}
              style={{
                backgroundColor: Colors.splashButton,
                padding: 12,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: 'white', fontWeight: '600' }}>
                Clear Storage & Restart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowDebug(false)}
              style={{
                backgroundColor: '#ccc',
                padding: 12,
                borderRadius: 8,
              }}
            >
              <Text style={{ fontWeight: '600' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}

export default SplashScreen
