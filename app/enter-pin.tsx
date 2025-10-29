import { Colors, Spacing } from '@/constants'
import { useRouter } from 'expo-router'
import { useState, useCallback } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const EnterPinScreen = (): React.JSX.Element => {
  const router = useRouter()
  const [pin, setPin] = useState<string[]>([])
  const maxPinLength = 4

  const handleNumberPress = useCallback((num: string) => {
    setPin((prevPin) => {
      if (prevPin.length < maxPinLength) {
        return [...prevPin, num]
      }
      return prevPin
    })
  }, [maxPinLength])

  const handleDelete = useCallback(() => {
    setPin((prevPin) => prevPin.slice(0, -1))
  }, [])

  const handleContinue = useCallback(async () => {
    if (pin.length !== maxPinLength) {
      Alert.alert('Incomplete PIN', 'Please enter all 4 digits')
      return
    }

    const enteredPin = pin.join('')
    
    try {
      // Check if PIN exists in storage
      const storedPin = await AsyncStorage.getItem('parentalPin')
      const defaultPin = '1111' // Default PIN for easy access
      
      if (!storedPin) {
        // First time setup - save the entered PIN and complete onboarding
        await AsyncStorage.setItem('parentalPin', enteredPin)
        await AsyncStorage.setItem('onboardingComplete', 'true')
        router.replace('/(tabs)')
      } else {
        // Validate PIN - check against stored PIN or default PIN
        if (enteredPin === storedPin || enteredPin === defaultPin) {
          await AsyncStorage.setItem('onboardingComplete', 'true')
          router.replace('/(tabs)')
        } else {
          Alert.alert('Incorrect PIN', 'Please try again. Default PIN is 1111')
          setPin([])
        }
      }
    } catch (error) {
      console.error('Error validating PIN:', error)
      Alert.alert('Error', 'Failed to validate PIN')
    }
  }, [pin, maxPinLength, router])

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.splashBackground,
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.splashBackground}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: Spacing.screenPadding,
            paddingTop: 20,
            paddingBottom: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
              minHeight: 600,
            }}
          >
            {/* Header Section */}
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              {/* Title with Icon */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 32,
                    fontWeight: '700',
                    color: '#1F2937',
                    marginRight: 8,
                  }}
                >
                  Enter PIN
                </Text>
                <Text style={{ fontSize: 32 }}>🔐</Text>
              </View>

              {/* Subtitle */}
              <Text
                style={{
                  fontSize: 16,
                  color: '#374151',
                  marginBottom: 40,
                  textAlign: 'center',
                }}
              >
                Please enter your parental PIN
              </Text>
            </View>

            {/* Middle Section - PIN Input */}
            <View style={{ alignItems: 'center' }}>
              {/* PIN Dots */}
              <View
                style={{
                  flexDirection: 'row',
                  gap: 16,
                  marginBottom: 40,
                }}
              >
                {[0, 1, 2, 3].map((index) => (
                  <View
                    key={index}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 28,
                      backgroundColor: pin[index] ? '#9CA3AF' : 'white',
                      borderWidth: 3,
                      borderColor: 'rgba(255, 255, 255, 0.8)',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 2,
                    }}
                  />
                ))}
              </View>

              {/* Number Pad */}
              <View
                style={{
                  width: '100%',
                  maxWidth: 300,
                }}
              >
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 16,
            }}
          >
            {numbers.slice(0, 9).map((num) => (
              <TouchableOpacity
                key={num}
                onPress={() => handleNumberPress(num)}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: '600',
                    color: '#1F2937',
                  }}
                >
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Bottom Row: 0 and Delete */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 16,
              marginTop: 16,
            }}
          >
            <TouchableOpacity
              onPress={() => handleNumberPress('0')}
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: '600',
                  color: '#1F2937',
                }}
              >
                0
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDelete}
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={28} color="#1F2937" />
            </TouchableOpacity>
          </View>
              </View>
            </View>

        {/* Bottom Section with Elephant */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {/* Elephant Image */}
          <Image
            source={require('@/assets/images/elephant-reader.png')}
            style={{
              width: 120,
              height: 120,
            }}
            resizeMode="contain"
          />

          {/* Continue Button */}
          <TouchableOpacity
            onPress={handleContinue}
            disabled={pin.length !== maxPinLength}
            style={{
              backgroundColor:
                pin.length === maxPinLength ? '#3B82F6' : '#9CA3AF',
              borderRadius: 12,
              paddingVertical: 14,
              paddingHorizontal: 40,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 4,
              elevation: 3,
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '600',
                textTransform: 'uppercase',
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default EnterPinScreen
