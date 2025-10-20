import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'
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

  return (
    <SafeAreaView 
      className="flex-1" 
      style={{ backgroundColor: Colors.splashBackground }}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-center" style={{ paddingHorizontal: Spacing.screenPadding }}>
          {/* Header */}
          <View className="items-center mb-12">
            <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-6">
              <Ionicons name="book" size={48} color={Colors.splashButton} />
            </View>
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back!
            </Text>
            <Text className="text-gray-600 text-center">
              Sign in to continue reading
            </Text>
          </View>

          {/* Login Form */}
          <View className="space-y-4">
            {/* Email Input */}
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Email</Text>
              <View className="flex-row items-center bg-white rounded-xl px-4 py-3">
                <Ionicons name="mail-outline" size={20} color={Colors.gray400} />
                <TextInput
                  className="flex-1 ml-3 text-base"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>
            </View>

            {/* Password Input */}
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Password</Text>
              <View className="flex-row items-center bg-white rounded-xl px-4 py-3">
                <Ionicons name="lock-closed-outline" size={20} color={Colors.gray400} />
                <TextInput
                  className="flex-1 ml-3 text-base"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password"
                />
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity className="self-end">
              <Text className="text-blue-600 font-semibold">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              className="rounded-xl py-4 mt-4"
              style={{ backgroundColor: Colors.splashButton }}
              activeOpacity={0.8}
            >
              <Text className="text-white text-center text-lg font-semibold">
                {loading ? 'Signing in...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View className="flex-row justify-center items-center mt-6">
              <Text className="text-gray-600">Don&apos;t have an account? </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text className="text-blue-600 font-semibold">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen
