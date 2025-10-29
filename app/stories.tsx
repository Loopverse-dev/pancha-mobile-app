import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const Stories = (): React.JSX.Element => {
  const storyCategories = [
    { id: 1, title: 'Adventure Stories', icon: 'rocket', color: '#3B82F6', count: 24 },
    { id: 2, title: 'Fairy Tales', icon: 'sparkles', color: '#EC4899', count: 18 },
    { id: 3, title: 'Animal Stories', icon: 'paw', color: '#10B981', count: 32 },
    { id: 4, title: 'Bedtime Stories', icon: 'moon', color: '#8B5CF6', count: 15 },
    { id: 5, title: 'Moral Stories', icon: 'heart', color: '#F59E0B', count: 21 },
    { id: 6, title: 'Fantasy Tales', icon: 'planet', color: '#6366F1', count: 19 },
  ]

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-4 border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3"
            >
              <Ionicons name="arrow-back" size={20} color="#374151" />
            </TouchableOpacity>
            <View>
              <Text className="text-2xl font-bold text-gray-900">Stories</Text>
              <Text className="text-sm text-gray-500">Explore amazing tales</Text>
            </View>
          </View>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
            <Ionicons name="search" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Featured Story */}
        <View className="px-4 py-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">Featured Story</Text>
          <TouchableOpacity className="bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl overflow-hidden" style={{ backgroundColor: '#60A5FA' }}>
            <View className="p-6">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-white text-xl font-bold mb-2">The Magic Forest</Text>
                  <Text className="text-white/90 text-sm mb-4">A wonderful adventure awaits...</Text>
                  <View className="flex-row items-center">
                    <View className="bg-white/20 rounded-full px-3 py-1 mr-2">
                      <Text className="text-white text-xs font-semibold">15 min</Text>
                    </View>
                    <View className="bg-white/20 rounded-full px-3 py-1">
                      <Text className="text-white text-xs font-semibold">Age 4-8</Text>
                    </View>
                  </View>
                </View>
                <View className="w-20 h-20 rounded-full bg-white/20 items-center justify-center">
                  <Ionicons name="book" size={40} color="white" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Story Categories */}
        <View className="px-4 pb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">Browse Categories</Text>
          <View className="flex-row flex-wrap justify-between">
            {storyCategories.map((category) => (
              <TouchableOpacity 
                key={category.id}
                className="w-[48%] mb-4 rounded-2xl overflow-hidden"
                style={{ backgroundColor: `${category.color}10` }}
              >
                <View className="p-4">
                  <View 
                    className="w-12 h-12 rounded-full items-center justify-center mb-3"
                    style={{ backgroundColor: category.color }}
                  >
                    <Ionicons name={category.icon as any} size={24} color="white" />
                  </View>
                  <Text className="text-gray-900 font-bold text-base mb-1">
                    {category.title}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {category.count} stories
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Stories */}
        <View className="px-4 pb-8">
          <Text className="text-lg font-bold text-gray-900 mb-3">Popular Stories</Text>
          {[1, 2, 3].map((item) => (
            <TouchableOpacity 
              key={item}
              className="flex-row bg-gray-50 rounded-2xl p-4 mb-3"
            >
              <View className="w-16 h-16 rounded-xl bg-blue-100 items-center justify-center mr-4">
                <Ionicons name="book-outline" size={28} color="#3B82F6" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-bold text-base mb-1">
                  Story Title {item}
                </Text>
                <Text className="text-gray-500 text-sm mb-2">
                  A wonderful tale for children
                </Text>
                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                  <Text className="text-gray-400 text-xs ml-1">12 min</Text>
                  <View className="w-1 h-1 rounded-full bg-gray-300 mx-2" />
                  <Ionicons name="star" size={14} color="#F59E0B" />
                  <Text className="text-gray-400 text-xs ml-1">4.8</Text>
                </View>
              </View>
              <View className="w-10 h-10 rounded-full bg-white items-center justify-center">
                <Ionicons name="play" size={20} color="#3B82F6" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Stories
