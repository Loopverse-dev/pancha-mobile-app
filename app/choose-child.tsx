import { Colors, Spacing } from '@/constants'
import { useRouter } from 'expo-router'
import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect, useCallback } from 'react'

const ChooseChildScreen = (): React.JSX.Element => {
  const router = useRouter()
  const [childName, setChildName] = useState<string>('')
  const [loading, setLoading] = useState(true)

  const checkIfNewUser = useCallback(async () => {
    try {
      const hasChild = await AsyncStorage.getItem('childName')
      // If no child profile exists, automatically go to choose-avatar
      if (!hasChild) {
        router.replace('/choose-avatar')
      }
    } catch (error) {
      console.error('Error checking new user:', error)
    }
  }, [router])

  useEffect(() => {
    loadChildProfile()
    checkIfNewUser()
  }, [checkIfNewUser])

  const loadChildProfile = async () => {
    try {
      const name = await AsyncStorage.getItem('childName')
      if (name) {
        setChildName(name.toUpperCase())
      }
    } catch (error) {
      console.error('Error loading child profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddNewProfile = useCallback(() => {
    // New profile goes to choose-avatar
    router.push('/choose-avatar')
  }, [router])

  const handleSelectChild = useCallback(async () => {
    // Existing child goes to enter-pin for parental control
    router.push('/enter-pin')
  }, [router])

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
      <View
        style={{
          flex: 1,
          paddingHorizontal: Spacing.screenPadding,
          paddingTop: 80,
          alignItems: 'center',
        }}
      >
        {/* Title */}
        <Text
          style={{
            fontSize: 32,
            fontWeight: '700',
            color: '#1F2937',
            marginBottom: 64,
          }}
        >
          Choose Child
        </Text>

        {/* Profile Cards */}
        <View
          style={{
            flexDirection: 'row',
            gap: 20,
            marginBottom: 32,
          }}
        >
          {/* Existing Child Profile */}
          {!loading && childName && (
            <TouchableOpacity
              onPress={handleSelectChild}
              style={{
                width: 140,
                height: 180,
                backgroundColor: 'white',
                borderRadius: 20,
                borderWidth: 3,
                borderColor: '#3B82F6',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
              }}
              activeOpacity={0.8}
            >
              {/* Avatar Circle */}
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: '#E5E7EB',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                }}
              >
                <Ionicons name="person" size={40} color="#9CA3AF" />
              </View>

              {/* Name */}
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#3B82F6',
                  letterSpacing: 1,
                }}
              >
                {childName}
              </Text>
            </TouchableOpacity>
          )}

          {/* Add New Profile */}
          <TouchableOpacity
            onPress={handleAddNewProfile}
            style={{
              width: 140,
              height: 180,
              backgroundColor: 'white',
              borderRadius: 20,
              borderWidth: 3,
              borderColor: '#3B82F6',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
            activeOpacity={0.8}
          >
            {/* Plus Icon Circle */}
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: '#E5E7EB',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
              }}
            >
              <Ionicons name="add" size={48} color="#3B82F6" />
            </View>

            {/* Text */}
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#3B82F6',
                textAlign: 'center',
              }}
            >
              Add a new{'\n'}profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ChooseChildScreen
