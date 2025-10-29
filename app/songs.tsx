import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const Songs = (): React.JSX.Element => {
  const songCategories = [
    { id: 1, title: 'Nursery Rhymes', icon: 'musical-notes', color: '#EC4899', count: 28 },
    { id: 2, title: 'Learning Songs', icon: 'school', color: '#3B82F6', count: 22 },
    { id: 3, title: 'Dance & Move', icon: 'fitness', color: '#F59E0B', count: 16 },
    { id: 4, title: 'Sing Along', icon: 'mic', color: '#8B5CF6', count: 19 },
  ]

  const playlists = [
    { id: 1, name: 'Top Hits', songs: 25, color: '#EC4899' },
    { id: 2, name: 'Morning Songs', songs: 18, color: '#F59E0B' },
    { id: 3, name: 'Fun Time', songs: 32, color: '#3B82F6' },
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
              <Text className="text-2xl font-bold text-gray-900">Songs</Text>
              <Text className="text-sm text-gray-500">Fun music for kids</Text>
            </View>
          </View>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
            <Ionicons name="search" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Now Playing Banner */}
        <View className="px-4 py-6">
          <View className="bg-gradient-to-r from-pink-400 to-rose-400 rounded-3xl p-6" style={{ backgroundColor: '#F472B6' }}>
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white text-xl font-bold mb-2">Now Playing</Text>
                <Text className="text-white/90 text-sm mb-4">
                  Twinkle Twinkle Little Star
                </Text>
                <View className="flex-row items-center">
                  <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 items-center justify-center mr-2">
                    <Ionicons name="play-skip-back" size={20} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity className="w-12 h-12 rounded-full bg-white items-center justify-center mr-2">
                    <Ionicons name="pause" size={24} color="#F472B6" />
                  </TouchableOpacity>
                  <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
                    <Ionicons name="play-skip-forward" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="w-20 h-20 rounded-full bg-white/20 items-center justify-center">
                <Ionicons name="musical-notes" size={40} color="white" />
              </View>
            </View>
          </View>
        </View>

        {/* Playlists */}
        <View className="px-4 pb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">Playlists</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-2"
          >
            {playlists.map((playlist) => (
              <TouchableOpacity 
                key={playlist.id}
                className="mr-3 rounded-2xl overflow-hidden"
                style={{ width: 160, backgroundColor: `${playlist.color}20` }}
              >
                <View className="p-4">
                  <View 
                    className="w-16 h-16 rounded-full items-center justify-center mb-3"
                    style={{ backgroundColor: playlist.color }}
                  >
                    <Ionicons name="musical-notes" size={32} color="white" />
                  </View>
                  <Text className="text-gray-900 font-bold text-base mb-1">
                    {playlist.name}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {playlist.songs} songs
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Categories */}
        <View className="px-4 pb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">Categories</Text>
          <View className="flex-row flex-wrap justify-between">
            {songCategories.map((category) => (
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
                    {category.count} songs
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Songs */}
        <View className="px-4 pb-8">
          <Text className="text-lg font-bold text-gray-900 mb-3">Popular Songs</Text>
          {[1, 2, 3, 4, 5].map((item) => (
            <TouchableOpacity 
              key={item}
              className="flex-row bg-gray-50 rounded-2xl p-4 mb-3"
            >
              <View className="w-16 h-16 rounded-xl bg-pink-100 items-center justify-center mr-4">
                <Ionicons name="musical-note" size={28} color="#EC4899" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-bold text-base mb-1">
                  Happy Song {item}
                </Text>
                <Text className="text-gray-500 text-sm mb-2">
                  Fun and educational music
                </Text>
                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                  <Text className="text-gray-400 text-xs ml-1">3:24</Text>
                  <View className="w-1 h-1 rounded-full bg-gray-300 mx-2" />
                  <Ionicons name="heart" size={14} color="#EC4899" />
                  <Text className="text-gray-400 text-xs ml-1">1.2k</Text>
                </View>
              </View>
              <View className="w-10 h-10 rounded-full bg-pink-500 items-center justify-center">
                <Ionicons name="play" size={20} color="white" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Songs
