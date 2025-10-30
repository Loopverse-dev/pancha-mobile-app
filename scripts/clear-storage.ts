/**
 * Utility script to clear AsyncStorage for testing
 * Run this in your app to reset to first-time user state
 */

import AsyncStorage from '@react-native-async-storage/async-storage'

export const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear()
    console.log('✅ AsyncStorage cleared successfully')
    return true
  } catch (error) {
    console.error('❌ Error clearing AsyncStorage:', error)
    return false
  }
}

export const clearUserData = async () => {
  try {
    await AsyncStorage.multiRemove(['userLoggedIn', 'hasSeenSplash', 'userType'])
    console.log('✅ User data cleared successfully')
    return true
  } catch (error) {
    console.error('❌ Error clearing user data:', error)
    return false
  }
}

export const getStorageData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys()
    const data = await AsyncStorage.multiGet(keys)
    console.log('📦 Current AsyncStorage data:', data)
    return data
  } catch (error) {
    console.error('❌ Error getting storage data:', error)
    return []
  }
}
