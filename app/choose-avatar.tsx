import { Colors, Spacing } from '@/constants'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Alert,
  Modal,
  FlatList,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AGE_OPTIONS = ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

const ChooseAvatarScreen = (): React.JSX.Element => {
  const router = useRouter()
  const [childName, setChildName] = useState('')
  const [selectedGender, setSelectedGender] = useState<'girl' | 'boy'>('girl')
  const [selectedAge, setSelectedAge] = useState('')
  const [showAgePicker, setShowAgePicker] = useState(false)

  const handleContinue = async () => {
    const trimmedName = childName.trim()
    
    if (!trimmedName) {
      Alert.alert('Missing Information', 'Please enter child name')
      return
    }
    
    if (!selectedAge) {
      Alert.alert('Missing Information', 'Please select child age')
      return
    }

    try {
      // Store child profile data
      await AsyncStorage.setItem('childName', trimmedName)
      await AsyncStorage.setItem('childGender', selectedGender)
      await AsyncStorage.setItem('childAge', selectedAge)
      
      router.push('/enter-pin')
    } catch (error) {
      console.error('Error saving child data:', error)
      Alert.alert('Error', 'Failed to save child information')
    }
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
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: Spacing.screenPadding,
            paddingTop: 60,
            paddingBottom: 40,
          }}
        >
          {/* Close Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              position: 'absolute',
              top: 50,
              right: 24,
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
              zIndex: 10,
            }}
          >
            <Ionicons name="close" size={24} color="#374151" />
          </TouchableOpacity>

          {/* Title with Icon */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 32,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: '700',
                color: '#1F2937',
                marginRight: 8,
              }}
            >
              Choose Avatar
            </Text>
            <Text style={{ fontSize: 32 }}>🎀</Text>
          </View>

          {/* Avatar Circle */}
          <View
            style={{
              alignItems: 'center',
              marginBottom: 32,
            }}
          >
            <View
              style={{
                width: 180,
                height: 180,
                borderRadius: 90,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                borderWidth: 4,
                borderColor: 'rgba(255, 255, 255, 0.8)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Placeholder for avatar image */}
              <Ionicons name="person" size={80} color="#9CA3AF" />
            </View>
          </View>

          {/* Gender Selection */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 24,
              gap: 24,
            }}
          >
            <TouchableOpacity
              onPress={() => setSelectedGender('girl')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor:
                    selectedGender === 'girl' ? '#6B7280' : '#D1D5DB',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {selectedGender === 'girl' && (
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: 'white',
                    }}
                  />
                )}
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#374151',
                }}
              >
                Girl
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedGender('boy')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor:
                    selectedGender === 'boy' ? '#6B7280' : '#D1D5DB',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {selectedGender === 'boy' && (
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: 'white',
                    }}
                  />
                )}
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#374151',
                }}
              >
                Boy
              </Text>
            </TouchableOpacity>
          </View>

          {/* Child Name Input */}
          <TextInput
            style={{
              backgroundColor: 'white',
              borderRadius: 16,
              paddingHorizontal: 20,
              paddingVertical: 16,
              fontSize: 16,
              color: '#374151',
              marginBottom: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 2,
            }}
            placeholder="Child Name"
            placeholderTextColor="#9CA3AF"
            value={childName}
            onChangeText={setChildName}
            autoCapitalize="words"
          />

          {/* Age Selection */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 32,
              gap: 12,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: '#374151',
              }}
            >
              Child&apos;s age ?
            </Text>
            <TouchableOpacity
              onPress={() => setShowAgePicker(true)}
              style={{
                backgroundColor: 'white',
                borderRadius: 12,
                paddingHorizontal: 20,
                paddingVertical: 12,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: selectedAge ? '#374151' : '#9CA3AF',
                }}
              >
                {selectedAge || 'Age'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Age Picker Modal */}
          <Modal
            visible={showAgePicker}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowAgePicker(false)}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              activeOpacity={1}
              onPress={() => setShowAgePicker(false)}
            >
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 16,
                  padding: 20,
                  width: '80%',
                  maxHeight: 400,
                }}
                onStartShouldSetResponder={() => true}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    color: '#1F2937',
                    marginBottom: 16,
                    textAlign: 'center',
                  }}
                >
                  Select Age
                </Text>
                <FlatList
                  data={AGE_OPTIONS}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedAge(item)
                        setShowAgePicker(false)
                      }}
                      style={{
                        paddingVertical: 16,
                        paddingHorizontal: 20,
                        borderRadius: 12,
                        backgroundColor:
                          selectedAge === item ? '#3B82F6' : 'transparent',
                        marginBottom: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '500',
                          color: selectedAge === item ? 'white' : '#374151',
                          textAlign: 'center',
                        }}
                      >
                        {item} years old
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>

          {/* Spacer */}
          <View style={{ flex: 1 }} />

          {/* Bottom Section with Elephant */}
          <View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
              marginHorizontal: -Spacing.screenPadding,
              paddingHorizontal: Spacing.screenPadding,
              paddingTop: 24,
              paddingBottom: 32,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Text and Button */}
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: '#3B82F6',
                  marginBottom: 16,
                }}
              >
                Are you{'\n'}ready{'\n'}for{'\n'}fun?
              </Text>
              <TouchableOpacity
                onPress={handleContinue}
                style={{
                  backgroundColor: '#3B82F6',
                  borderRadius: 12,
                  paddingVertical: 12,
                  paddingHorizontal: 32,
                  alignSelf: 'flex-start',
                }}
                activeOpacity={0.8}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: '600',
                  }}
                >
                  Go
                </Text>
              </TouchableOpacity>
            </View>

            {/* Elephant Image */}
            <Image
              source={require('@/assets/images/elephant-reader.png')}
              style={{
                width: 140,
                height: 140,
              }}
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default ChooseAvatarScreen
