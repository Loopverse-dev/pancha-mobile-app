import { Text, View, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Settings = (): React.JSX.Element => {
  const [darkMode, setDarkMode] = useState(false)

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              // Clear all user session data
              await AsyncStorage.multiRemove([
                'userLoggedIn',
                'userEmail',
                'onboardingComplete',
              ])
              // Navigate to login screen
              router.replace('/login')
            } catch (error) {
              console.error('Error during logout:', error)
              Alert.alert('Error', 'Failed to logout. Please try again.')
            }
          },
        },
      ],
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 py-4 bg-white">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="w-10 h-10 items-center justify-center"
            >
              <Ionicons name="chevron-back" size={24} color="#374151" />
            </TouchableOpacity>
            <Text className="text-lg font-bold text-gray-900">Settings</Text>
            <View className="w-10" />
          </View>
        </View>

        {/* Settings List Container */}
        <View className="px-4 py-4">
          <View className="bg-white rounded-3xl overflow-hidden" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
          {/* My Profile */}
          <TouchableOpacity className="flex-row items-center py-4 px-4 border-b border-gray-100">
            <View className="w-10 h-10 rounded-full bg-orange-100 items-center justify-center mr-3">
              <Ionicons name="person" size={20} color="#F97316" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 font-semibold text-base">My Profile</Text>
              <Text className="text-gray-400 text-xs mt-0.5">John Doe</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Language */}
          <TouchableOpacity className="flex-row items-center py-4 px-4 border-b border-gray-100">
            <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
              <Ionicons name="globe-outline" size={20} color="#3B82F6" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 font-semibold text-base">Language</Text>
            </View>
            <Text className="text-gray-400 text-sm mr-2">English</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Dark Mode */}
          <View className="flex-row items-center py-4 px-4 border-b border-gray-100">
            <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3">
              <Ionicons name="moon-outline" size={20} color="#6B7280" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 font-semibold text-base">Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#E5E7EB"
            />
          </View>

          {/* Advanced Settings */}
          <TouchableOpacity className="flex-row items-center py-4 px-4 border-b border-gray-100">
            <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3">
              <Ionicons name="settings-outline" size={20} color="#6B7280" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 font-semibold text-base">Advanced settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* User Agreement */}
          <TouchableOpacity className="flex-row items-center py-4 px-4 border-b border-gray-100">
            <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3">
              <Ionicons name="document-text-outline" size={20} color="#6B7280" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 font-semibold text-base">User Agreement</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Privacy Policy */}
          <TouchableOpacity className="flex-row items-center py-4 px-4 border-b border-gray-100">
            <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3">
              <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 font-semibold text-base">Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Rate us */}
          <TouchableOpacity className="flex-row items-center py-4 px-4 border-b border-gray-100">
            <View className="w-10 h-10 rounded-full bg-yellow-50 items-center justify-center mr-3">
              <Ionicons name="star-outline" size={20} color="#F59E0B" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 font-semibold text-base">Rate us</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Contact Us */}
          <TouchableOpacity className="flex-row items-center py-4 px-4 border-b border-gray-100">
            <View className="w-10 h-10 rounded-full bg-green-50 items-center justify-center mr-3">
              <Ionicons name="call-outline" size={20} color="#10B981" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 font-semibold text-base">Contact Us</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* About */}
          <TouchableOpacity className="flex-row items-center py-4 px-4 border-b border-gray-100">
            <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3">
              <Ionicons name="information-circle-outline" size={20} color="#6B7280" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 font-semibold text-base">About</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity 
            className="flex-row items-center py-4 px-4"
            onPress={handleLogout}
          >
            <View className="w-10 h-10 rounded-full bg-red-50 items-center justify-center mr-3">
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            </View>
            <View className="flex-1">
              <Text className="text-red-600 font-semibold text-base">Logout</Text>
            </View>
          </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Settings
