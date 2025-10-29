import { Text, View, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const { width } = Dimensions.get('window')
const CARD_WIDTH = (width - 64) / 2.5

const storyImages = [
  require('@/assets/images/Stories/ST01.png'),
  require('@/assets/images/Stories/ST02.png'),
  require('@/assets/images/Stories/ST03.png'),
]

const Index = (): React.JSX.Element => {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header Image Section */}
        <View className="relative" style={{ height: 180, marginBottom: 16 }}>
          <Image
            source={require('@/assets/images/elephant-reader.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
          {/* Search Icon */}
          <TouchableOpacity 
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white items-center justify-center"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}
          >
            <Ionicons name="search" size={20} color="#374151" />
          </TouchableOpacity>
          {/* User Icon */}
          <TouchableOpacity 
            className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white items-center justify-center"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}
          >
            <Ionicons name="person" size={20} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Our Top Picks Section */}
        <View className="mb-8 bg-white">
          <Text className="text-xl font-bold text-gray-900 px-5 mb-3">Our Top Picks</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 8 }}
          >
            {storyImages.map((imageSource, index) => (
              <TouchableOpacity 
                key={index}
                className="mr-4 rounded-2xl overflow-hidden"
                style={{ 
                  width: CARD_WIDTH, 
                  height: CARD_WIDTH * 1.4,
                  backgroundColor: '#F3F4F6',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 6,
                  elevation: 4,
                }}
              >
                <Image
                  source={imageSource}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
                <View className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-blue-500 items-center justify-center">
                  <Ionicons name="heart-outline" size={16} color="white" />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Content Library Section */}
        <View className="px-5 mb-8">
          <View className="flex-row items-center mb-5">
            <Text className="text-lg font-bold text-gray-900">Content Library</Text>
            <Text className="ml-2 text-lg">📚</Text>
          </View>
          
          <View className="flex-row justify-around" style={{ paddingHorizontal: 8 }}>
            {/* Stories */}
            <TouchableOpacity 
              className="items-center"
              style={{ width: '22%' }}
              onPress={() => router.push('/stories')}
            >
              <View className="w-14 h-14 rounded-full bg-blue-500 items-center justify-center mb-2" style={{ shadowColor: '#3B82F6', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 3 }}>
                <Ionicons name="book-outline" size={24} color="white" />
              </View>
              <Text className="text-gray-900 font-semibold text-center" style={{ fontSize: 11 }}>Stories</Text>
            </TouchableOpacity>

            {/* Author Stories */}
            <TouchableOpacity 
              className="items-center"
              style={{ width: '22%' }}
              onPress={() => router.push('/author-stories')}
            >
              <View className="w-14 h-14 rounded-full bg-purple-500 items-center justify-center mb-2" style={{ shadowColor: '#A855F7', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 3 }}>
                <Ionicons name="layers-outline" size={24} color="white" />
              </View>
              <Text className="text-gray-900 font-semibold text-center" style={{ fontSize: 11 }} numberOfLines={2}>Author{"\n"}Stories</Text>
            </TouchableOpacity>

            {/* Lullabies */}
            <TouchableOpacity 
              className="items-center"
              style={{ width: '22%' }}
              onPress={() => router.push('/lullabies')}
            >
              <View className="w-14 h-14 rounded-full bg-indigo-500 items-center justify-center mb-2" style={{ shadowColor: '#6366F1', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 3 }}>
                <Ionicons name="moon-outline" size={24} color="white" />
              </View>
              <Text className="text-gray-900 font-semibold text-center" style={{ fontSize: 11 }}>Lullabies</Text>
            </TouchableOpacity>

            {/* Songs */}
            <TouchableOpacity 
              className="items-center"
              style={{ width: '22%' }}
              onPress={() => router.push('/songs')}
            >
              <View className="w-14 h-14 rounded-full bg-pink-500 items-center justify-center mb-2" style={{ shadowColor: '#EC4899', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 3 }}>
                <Ionicons name="musical-notes-outline" size={24} color="white" />
              </View>
              <Text className="text-gray-900 font-semibold text-center" style={{ fontSize: 11 }}>Songs</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Index