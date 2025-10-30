import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { Spacing } from '@/constants'

const categories = [
  { id: '1', name: 'Electronics', icon: 'laptop' as const, color: 'bg-blue-100' },
  { id: '2', name: 'Fashion', icon: 'shirt' as const, color: 'bg-pink-100' },
  { id: '3', name: 'Home & Garden', icon: 'home' as const, color: 'bg-green-100' },
  { id: '4', name: 'Sports', icon: 'football' as const, color: 'bg-orange-100' },
  { id: '5', name: 'Books', icon: 'book' as const, color: 'bg-purple-100' },
  { id: '6', name: 'Toys', icon: 'game-controller' as const, color: 'bg-yellow-100' },
]

const Category = (): React.JSX.Element => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View style={{ padding: Spacing.sectionSpacing }}>
          <Text className="text-2xl font-bold text-gray-900 mb-6">
            Browse Categories
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className="w-[48%] mb-4"
                activeOpacity={0.7}
              >
                <View className={`${category.color} rounded-xl p-6 items-center`}>
                  <Ionicons name={category.icon} size={40} color="#374151" />
                  <Text className="text-gray-900 font-semibold mt-3 text-center">
                    {category.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Category