import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { logout } from '@/utils/auth'
import { Spacing } from '@/constants'

const Profile = (): React.JSX.Element => {
  const router = useRouter()

  const handleLogout = () => {
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
            await logout()
            router.replace('/login')
          },
        },
      ]
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View style={{ padding: Spacing.sectionSpacing }}>
          {/* Profile Header */}
          <View className="bg-white rounded-xl p-6 shadow-sm mb-6 items-center">
            <View className="w-24 h-24 bg-blue-500 rounded-full items-center justify-center mb-4">
              <Ionicons name="person" size={48} color="white" />
            </View>
            <Text className="text-2xl font-bold text-gray-900 mb-1">
              John Doe
            </Text>
            <Text className="text-gray-600">
              john.doe@example.com
            </Text>
          </View>

          {/* Menu Items */}
          <View className="bg-white rounded-xl shadow-sm mb-4">
            <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
              <Ionicons name="settings" size={24} color="#6B7280" />
              <Text className="text-gray-900 text-base ml-4 flex-1">Settings</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
              <Ionicons name="heart" size={24} color="#6B7280" />
              <Text className="text-gray-900 text-base ml-4 flex-1">Favorites</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
              <Ionicons name="receipt" size={24} color="#6B7280" />
              <Text className="text-gray-900 text-base ml-4 flex-1">Orders</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-4">
              <Ionicons name="help-circle" size={24} color="#6B7280" />
              <Text className="text-gray-900 text-base ml-4 flex-1">Help & Support</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity 
            onPress={handleLogout}
            className="bg-red-500 rounded-xl p-4 items-center"
          >
            <Text className="text-white font-semibold text-base">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile