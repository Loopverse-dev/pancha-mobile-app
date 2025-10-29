import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const AuthorStories = (): React.JSX.Element => {
  const authors = [
    { id: 1, name: 'Emma Johnson', stories: 12, avatar: 'person', color: '#8B5CF6' },
    { id: 2, name: 'Michael Chen', stories: 8, avatar: 'person', color: '#EC4899' },
    { id: 3, name: 'Sarah Williams', stories: 15, avatar: 'person', color: '#3B82F6' },
    { id: 4, name: 'David Brown', stories: 10, avatar: 'person', color: '#10B981' },
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
              <Text className="text-2xl font-bold text-gray-900">Author Stories</Text>
              <Text className="text-sm text-gray-500">Stories by talented authors</Text>
            </View>
          </View>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
            <Ionicons name="search" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Create Your Story */}
        <View className="px-4 py-6">
          <TouchableOpacity className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl p-6" style={{ backgroundColor: '#A78BFA' }}>
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white text-xl font-bold mb-2">Create Your Story</Text>
                <Text className="text-white/90 text-sm mb-4">
                  Become an author and share your imagination
                </Text>
                <View className="bg-white rounded-full px-4 py-2 self-start">
                  <Text className="text-purple-600 font-semibold text-sm">Start Writing</Text>
                </View>
              </View>
              <View className="w-20 h-20 rounded-full bg-white/20 items-center justify-center">
                <Ionicons name="create" size={40} color="white" />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Featured Authors */}
        <View className="px-4 pb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">Featured Authors</Text>
          {authors.map((author) => (
            <TouchableOpacity 
              key={author.id}
              className="flex-row items-center bg-gray-50 rounded-2xl p-4 mb-3"
            >
              <View 
                className="w-16 h-16 rounded-full items-center justify-center mr-4"
                style={{ backgroundColor: `${author.color}20` }}
              >
                <Ionicons name={author.avatar as any} size={32} color={author.color} />
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-bold text-base mb-1">
                  {author.name}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {author.stories} stories published
                </Text>
              </View>
              <View className="w-10 h-10 rounded-full bg-white items-center justify-center">
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Latest Author Stories */}
        <View className="px-4 pb-8">
          <Text className="text-lg font-bold text-gray-900 mb-3">Latest Stories</Text>
          {[1, 2, 3, 4].map((item) => (
            <TouchableOpacity 
              key={item}
              className="bg-white border border-gray-200 rounded-2xl p-4 mb-3"
            >
              <View className="flex-row items-start mb-3">
                <View className="w-12 h-12 rounded-full bg-purple-100 items-center justify-center mr-3">
                  <Ionicons name="person" size={24} color="#8B5CF6" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-900 font-bold text-base mb-1">
                    Author Name
                  </Text>
                  <Text className="text-gray-500 text-xs">2 days ago</Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="bookmark-outline" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
              <Text className="text-gray-900 font-semibold text-base mb-2">
                The Adventure Begins
              </Text>
              <Text className="text-gray-600 text-sm mb-3" numberOfLines={2}>
                Once upon a time in a magical land, there lived a brave little hero who...
              </Text>
              <View className="flex-row items-center">
                <View className="flex-row items-center mr-4">
                  <Ionicons name="heart-outline" size={16} color="#9CA3AF" />
                  <Text className="text-gray-500 text-xs ml-1">124</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="chatbubble-outline" size={16} color="#9CA3AF" />
                  <Text className="text-gray-500 text-xs ml-1">32</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AuthorStories
