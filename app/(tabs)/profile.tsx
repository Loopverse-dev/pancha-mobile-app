import { Spacing } from '@/constants'
import { logout } from '@/utils/auth'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = (): React.JSX.Element => {
  const router = useRouter()

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout()
          router.replace('/user-selection')
        },
      },
    ])
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View style={{ padding: Spacing.sectionSpacing }}>
          {/* Profile Header */}
          <View className="mb-6 items-center rounded-xl bg-white p-6 shadow-sm">
            <View className="mb-4 h-24 w-24 items-center justify-center rounded-full bg-blue-500">
              <Ionicons name="person" size={48} color="white" />
            </View>
            <Text className="mb-1 text-2xl font-bold text-gray-900">John Doe</Text>
            <Text className="text-gray-600">john.doe@example.com</Text>
          </View>

          {/* Menu Items */}
          <View className="mb-4 rounded-xl bg-white shadow-sm">
            <TouchableOpacity className="flex-row items-center border-b border-gray-100 p-4">
              <Ionicons name="settings" size={24} color="#6B7280" />
              <Text className="ml-4 flex-1 text-base text-gray-900">Settings</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center border-b border-gray-100 p-4">
              <Ionicons name="heart" size={24} color="#6B7280" />
              <Text className="ml-4 flex-1 text-base text-gray-900">Favorites</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center border-b border-gray-100 p-4">
              <Ionicons name="receipt" size={24} color="#6B7280" />
              <Text className="ml-4 flex-1 text-base text-gray-900">Orders</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-4">
              <Ionicons name="help-circle" size={24} color="#6B7280" />
              <Text className="ml-4 flex-1 text-base text-gray-900">Help & Support</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            className="items-center rounded-xl bg-red-500 p-4"
          >
            <Text className="text-base font-semibold text-white">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
