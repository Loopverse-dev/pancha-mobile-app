import { Colors, Spacing } from '@/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { Dimensions, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native'

const UserSelectionScreen = (): React.JSX.Element => {
  const router = useRouter()
  const { height } = Dimensions.get('window')

  const handleReaderPress = async () => {
    // Store user type and mark splash as seen, then navigate to login
    await AsyncStorage.setItem('userType', 'reader')
    await AsyncStorage.setItem('hasSeenSplash', 'true')
    router.replace('/login')
  }

  const handleAuthorPress = async () => {
    // Store user type and mark splash as seen, then navigate to login
    await AsyncStorage.setItem('userType', 'author')
    await AsyncStorage.setItem('hasSeenSplash', 'true')
    router.replace('/login')
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.splashBackground,
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.splashBackground}
        translucent={true}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: Spacing.screenPadding,
        }}
      >
        {/* Elephant Character Container */}
        <View
          style={{
            marginBottom: height * 0.08,
          }}
        >
          <View
            style={{
              width: 280,
              height: 280,
              borderRadius: 48,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.splashCircle,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 5,
            }}
          >
            <Image
              source={require('@/assets/images/elephant-reader.png')}
              style={{ width: 220, height: 220 }}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Buttons Container */}
        <View
          style={{
            width: '100%',
            maxWidth: 280,
            gap: 16,
          }}
        >
          <TouchableOpacity
            onPress={handleReaderPress}
            style={{
              backgroundColor: Colors.splashButton,
              borderRadius: 16,
              paddingVertical: 18,
              paddingHorizontal: 32,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 3,
            }}
            activeOpacity={0.85}
          >
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 18,
                fontWeight: '600',
                letterSpacing: 0.3,
              }}
            >
              I&apos;m a reader
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleAuthorPress}
            style={{
              backgroundColor: Colors.splashButton,
              borderRadius: 16,
              paddingVertical: 18,
              paddingHorizontal: 32,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 3,
            }}
            activeOpacity={0.85}
          >
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 18,
                fontWeight: '600',
                letterSpacing: 0.3,
              }}
            >
              I&apos;m an author
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default UserSelectionScreen
