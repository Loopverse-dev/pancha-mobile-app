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

const LoginScreen = (): React.JSX.Element => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter email and password')
      return
    }

    setLoading(true)

    // Simulate login (replace with actual API call)
    setTimeout(async () => {
      try {
        // Store user data to indicate they've logged in
        await AsyncStorage.setItem('userLoggedIn', 'true')
        await AsyncStorage.setItem('userEmail', email)
        
        setLoading(false)
        // Navigate to main app
        router.replace('/(tabs)')
      } catch {
        setLoading(false)
        alert('Login failed. Please try again.')
      }
    }, 1000)
  }

  const handleSignUp = () => {
    // Navigate to sign up screen (you can create this later)
    alert('Sign up functionality coming soon!')
  }

  const handleForgotPassword = () => {
    alert('Forgot password functionality coming soon!')
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
              overflow: 'hidden',
              borderBottomLeftRadius: 32,
              borderBottomRightRadius: 32,
            }}
          >
            <Image
              source={require('@/assets/images/IMG/1-SI.png')}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>

          {/* Login Form Container */}
          <View
            style={{
              flex: 1,
              paddingHorizontal: Spacing.screenPadding + 8,
              paddingTop: 32,
              paddingBottom: 24,
            }}
          >
            {/* Title */}
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                color: Colors.splashButton,
                marginBottom: 24,
                textAlign: 'center',
              }}
            >
              Login to account
            </Text>

            {/* Username Input */}
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
                placeholder="Username (Email Address)"
                placeholderTextColor={Colors.gray400}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {/* Password Input */}
            <View style={{ marginBottom: 8 }}>
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

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={handleForgotPassword}
              style={{ alignSelf: 'flex-end', marginBottom: 24 }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: Colors.text,
                  fontWeight: '500',
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity
              onPress={handleLogin}
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
                {loading ? 'SIGNING IN...' : 'SIGN IN'}
              </Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 32,
              }}
            >
              <Text style={{ fontSize: 14, color: Colors.text }}>
                Don&apos;t have an account ?{' '}
              </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.splashButton,
                    fontWeight: '600',
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default LoginScreen
