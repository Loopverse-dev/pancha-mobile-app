import { Text, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Spacing } from '@/constants'

const Index = (): React.JSX.Element => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View style={{ padding: Spacing.sectionSpacing }}>
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Pancha App
          </Text>
          <Text className="text-base text-gray-600 mb-6">
            Your one-stop shop for all your needs
          </Text>

          <View className="bg-white rounded-xl p-6 shadow-sm mb-4">
            <Text className="text-xl font-semibold text-gray-900 mb-2">
              Featured Products
            </Text>
            <Text className="text-gray-600">
              Discover our latest collection of amazing products
            </Text>
          </View>

          <View className="bg-white rounded-xl p-6 shadow-sm mb-4">
            <Text className="text-xl font-semibold text-gray-900 mb-2">
              Categories
            </Text>
            <Text className="text-gray-600">
              Browse through our wide range of categories
            </Text>
          </View>

          <View className="bg-white rounded-xl p-6 shadow-sm">
            <Text className="text-xl font-semibold text-gray-900 mb-2">
              Special Offers
            </Text>
            <Text className="text-gray-600">
              Don&apos;t miss out on our exclusive deals
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Index