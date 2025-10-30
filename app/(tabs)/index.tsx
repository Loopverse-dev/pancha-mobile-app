import { Text, View, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const { width } = Dimensions.get('window')
const CARD_WIDTH = (width - 100) / 3

const storyImages = [
  require('@/assets/images/Stories/ST01.png'),
  require('@/assets/images/Stories/ST02.png'),
  require('@/assets/images/Stories/ST03.png'),
]

const Index = (): React.JSX.Element => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header Image Section */}
        <View className="relative" style={{ height: 200, marginBottom: 20 }}>
          <Image
            source={require('@/assets/images/Screens/HS.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
          {/* Search Icon */}
          <TouchableOpacity 
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white items-center justify-center"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 3, elevation: 4 }}
          >
            <Ionicons name="search" size={22} color="#374151" />
          </TouchableOpacity>
          {/* User Icon */}
          <TouchableOpacity 
            className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white items-center justify-center"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 3, elevation: 4 }}
          >
            <Ionicons name="person" size={22} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Our Top Picks Section */}
        <View className="mb-6 bg-white rounded-3xl mx-4 px-5 py-6" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}>
          <Text className="text-2xl font-bold text-gray-900 mb-4">Our Top Picks</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          >
            {storyImages.map((imageSource, index) => (
              <View 
                key={index}
                className="rounded-xl overflow-hidden"
                style={{ 
                  width: CARD_WIDTH, 
                  backgroundColor: '#F9FAFB',
                }}
              >
                {/* Image Container */}
                <View style={{ height: CARD_WIDTH * 1.2, backgroundColor: '#E5E7EB' }}>
                  <Image
                    source={imageSource}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </View>
                {/* Blue Button at Bottom */}
                <TouchableOpacity 
                  className="bg-blue-500 items-center justify-center py-2"
                  style={{ flexDirection: 'row', gap: 6 }}
                >
                  <Ionicons name="heart-outline" size={16} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Content Library Section */}
        <View className="px-5 mb-6">
          <View className="flex-row items-center mb-5">
            <Text className="text-lg font-bold text-gray-900">Content Library</Text>
            <Text className="ml-2 text-lg">📚</Text>
          </View>
          
          <View className="flex-row justify-between" style={{ paddingHorizontal: 4 }}>
            {/* Stories */}
            <TouchableOpacity 
              className="items-center"
              style={{ width: '23%' }}
              onPress={() => router.push('/stories')}
            >
              <View 
                className="w-16 h-16 rounded-full items-center justify-center mb-2 bg-white" 
                style={{ 
                  borderWidth: 2.5, 
                  borderColor: '#3B82F6',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 2
                }}
              >
                <Ionicons name="book-outline" size={26} color="#3B82F6" />
              </View>
              <Text className="text-gray-900 font-medium text-center" style={{ fontSize: 11 }}>Stories</Text>
            </TouchableOpacity>

            {/* Author Stories */}
            <TouchableOpacity 
              className="items-center"
              style={{ width: '23%' }}
              onPress={() => router.push('/author-stories')}
            >
              <View 
                className="w-16 h-16 rounded-full items-center justify-center mb-2 bg-white" 
                style={{ 
                  borderWidth: 2.5, 
                  borderColor: '#3B82F6',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 2
                }}
              >
                <Ionicons name="layers-outline" size={26} color="#3B82F6" />
              </View>
              <Text className="text-gray-900 font-medium text-center" style={{ fontSize: 11 }} numberOfLines={2}>Author{"\n"}Stories</Text>
            </TouchableOpacity>

            {/* Lullabies */}
            <TouchableOpacity 
              className="items-center"
              style={{ width: '23%' }}
              onPress={() => router.push('/lullabies')}
            >
              <View 
                className="w-16 h-16 rounded-full items-center justify-center mb-2 bg-white" 
                style={{ 
                  borderWidth: 2.5, 
                  borderColor: '#3B82F6',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 2
                }}
              >
                <Ionicons name="moon-outline" size={26} color="#3B82F6" />
              </View>
              <Text className="text-gray-900 font-medium text-center" style={{ fontSize: 11 }}>Lullabies</Text>
            </TouchableOpacity>

            {/* Songs */}
            <TouchableOpacity 
              className="items-center"
              style={{ width: '23%' }}
              onPress={() => router.push('/songs')}
            >
              <View 
                className="w-16 h-16 rounded-full items-center justify-center mb-2 bg-white" 
                style={{ 
                  borderWidth: 2.5, 
                  borderColor: '#3B82F6',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 2
                }}
              >
                <Ionicons name="musical-notes-outline" size={26} color="#3B82F6" />
              </View>
              <Text className="text-gray-900 font-medium text-center" style={{ fontSize: 11 }}>Songs</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Index