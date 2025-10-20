import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * Check if user is logged in
 */
export const isUserLoggedIn = async (): Promise<boolean> => {
  try {
    const userLoggedIn = await AsyncStorage.getItem('userLoggedIn')
    return userLoggedIn === 'true'
  } catch (error) {
    console.error('Error checking login status:', error)
    return false
  }
}

/**
 * Get user type (reader or author)
 */
export const getUserType = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('userType')
  } catch (error) {
    console.error('Error getting user type:', error)
    return null
  }
}

/**
 * Get user email
 */
export const getUserEmail = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('userEmail')
  } catch (error) {
    console.error('Error getting user email:', error)
    return null
  }
}

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('userLoggedIn')
    await AsyncStorage.removeItem('userEmail')
    // Keep userType and hasSeenSplash for better UX
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

/**
 * Clear all app data (for testing)
 */
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear()
  } catch (error) {
    console.error('Error clearing data:', error)
  }
}
