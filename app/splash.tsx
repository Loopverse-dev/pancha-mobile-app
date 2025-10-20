import { View, Text, TouchableOpacity, Image, StatusBar, Dimensions } from 'react-native'
import { useRouter } from 'expo-router'
import { useEffect, useState, useCallback } from 'react'
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
  const [showButtons, setShowButtons] = useState(false)
  
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

      if (userLoggedIn === 'true') {
        // User has logged in before, show logo briefly then go to home
        await new Promise(resolve => setTimeout(resolve, 1000))
        router.replace('/(tabs)')
      } else if (hasSeenSplash === 'true') {
        // User has seen splash but not logged in, show logo briefly then go to login
        await new Promise(resolve => setTimeout(resolve, 1000))
        router.replace('/login')
      } else {
        // First time user, wait for full animation then show buttons
        await new Promise(resolve => setTimeout(resolve, 1000))
        await AsyncStorage.setItem('hasSeenSplash', 'true')
        setShowButtons(true)
      }
    } catch (error) {
      console.error('Error checking first time user:', error)
      setShowButtons(true)
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

  const handleReaderPress = async () => {
    // Store user type and navigate to login
    await AsyncStorage.setItem('userType', 'reader')
    router.replace('/login')
  }

  const handleAuthorPress = async () => {
    // Store user type and navigate to login
    await AsyncStorage.setItem('userType', 'author')
    router.replace('/login')
  }

  const { height } = Dimensions.get('window')

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
          position: 'absolute',
          top: showButtons ? height * 0.25 : '50%',
          transform: [{ translateY: showButtons ? 0 : -128 }],
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

        {/* Buttons - Only show after animation */}
        {showButtons && (
          <View 
            style={{ 
              position: 'absolute',
              bottom: height * 0.15,
              width: '100%',
              maxWidth: 320,
              paddingHorizontal: Spacing.screenPadding,
            }}
          >
            <TouchableOpacity
              onPress={handleReaderPress}
              style={{ 
                backgroundColor: Colors.splashButton,
                borderRadius: 999,
                paddingVertical: 16,
                paddingHorizontal: 32,
                marginBottom: 16,
              }}
              activeOpacity={0.8}
            >
              <Text style={{ 
                color: 'white', 
                textAlign: 'center', 
                fontSize: 18, 
                fontWeight: '600' 
              }}>
                I&apos;m a reader
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAuthorPress}
              style={{ 
                backgroundColor: Colors.splashButton,
                borderRadius: 999,
                paddingVertical: 16,
                paddingHorizontal: 32,
              }}
              activeOpacity={0.8}
            >
              <Text style={{ 
                color: 'white', 
                textAlign: 'center', 
                fontSize: 18, 
                fontWeight: '600' 
              }}>
                I&apos;m an author
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}

export default SplashScreen
