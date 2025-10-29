import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Colors, Spacing } from '@/constants'
import { Ionicons } from '@expo/vector-icons'

const SignUpScreen = (): React.JSX.Element => {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignUp = async () => {
    if (!fullName || !phoneNumber || !email || !password) {
      alert('Please fill in all fields')
      return
    }

    if (!agreeToTerms) {
      alert('Please agree to the Terms and Conditions')
      return
    }

    setLoading(true)

    // Simulate sign up (replace with actual API call)
    setTimeout(async () => {
      try {
        // Store user data
        await AsyncStorage.setItem('userLoggedIn', 'true')
        await AsyncStorage.setItem('userEmail', email)
        await AsyncStorage.setItem('userFullName', fullName)
        await AsyncStorage.setItem('userPhone', phoneNumber)
        
        // Check user type to determine navigation
        const userType = await AsyncStorage.getItem('userType')
        
        setLoading(false)
        
        // Navigate based on user type
        if (userType === 'reader') {
          router.replace('/choose-child')
        } else {
          router.replace('/(tabs)')
        }
      } catch {
        setLoading(false)
        alert('Sign up failed. Please try again.')
      }
    }, 1000)
  }

  const handleSignIn = () => {
    router.push('/login')
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.splashBackground }}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.splashBackground} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Image */}
          <View
            style={{
              width: '100%',
              height: 200,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 20,
            }}
          >
            <Image
              source={require('@/assets/images/elephant-reader.png')}
              style={{ width: 180, height: 180 }}
              resizeMode="contain"
            />
          </View>

          {/* Sign Up Form Container */}
          <View
            style={{
              flex: 1,
              paddingHorizontal: Spacing.screenPadding + 8,
              paddingTop: 16,
              paddingBottom: 24,
            }}
          >
            {/* Title */}
            <Text
              style={{
                fontSize: 22,
                fontWeight: '600',
                color: Colors.splashButton,
                marginBottom: 24,
                textAlign: 'center',
              }}
            >
              Create an account
            </Text>

            {/* Full Name Input */}
            <View style={{ marginBottom: 16 }}>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  fontSize: 15,
                  color: Colors.text,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 2,
                }}
                placeholder="Full Name"
                placeholderTextColor={Colors.gray400}
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                autoComplete="name"
              />
            </View>

            {/* Phone Number Input */}
            <View style={{ marginBottom: 16 }}>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  fontSize: 15,
                  color: Colors.text,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 2,
                }}
                placeholder="Phone Number"
                placeholderTextColor={Colors.gray400}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                autoComplete="tel"
              />
            </View>

            {/* Email Input */}
            <View style={{ marginBottom: 16 }}>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  fontSize: 15,
                  color: Colors.text,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 2,
                }}
                placeholder="Email Address (Username)"
                placeholderTextColor={Colors.gray400}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {/* Password Input */}
            <View style={{ marginBottom: 16 }}>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  fontSize: 15,
                  color: Colors.text,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 2,
                }}
                placeholder="Password"
                placeholderTextColor={Colors.gray400}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
              />
            </View>

            {/* Terms and Conditions Checkbox */}
            <TouchableOpacity
              onPress={() => setAgreeToTerms(!agreeToTerms)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 24,
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: agreeToTerms ? Colors.splashButton : Colors.gray400,
                  backgroundColor: agreeToTerms ? Colors.splashButton : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 8,
                }}
              >
                {agreeToTerms && (
                  <Ionicons name="checkmark" size={14} color="white" />
                )}
              </View>
              <Text style={{ fontSize: 13, color: Colors.text }}>
                I agree with the{' '}
                <Text style={{ color: Colors.splashButton, fontWeight: '600' }}>
                  Terms and Conditions
                </Text>
              </Text>
            </TouchableOpacity>

            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={handleSignUp}
              disabled={loading}
              style={{
                backgroundColor: Colors.splashButton,
                borderRadius: 24,
                paddingVertical: 14,
                paddingHorizontal: 48,
                alignSelf: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3,
                minWidth: 140,
              }}
              activeOpacity={0.85}
            >
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: '600',
                  letterSpacing: 1,
                }}
              >
                {loading ? 'SIGNING UP...' : 'SIGN UP'}
              </Text>
            </TouchableOpacity>

            {/* Sign In Link */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 24,
              }}
            >
              <Text style={{ fontSize: 14, color: Colors.text }}>
                Already have an account ?{' '}
              </Text>
              <TouchableOpacity onPress={handleSignIn}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.splashButton,
                    fontWeight: '600',
                  }}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default SignUpScreen
