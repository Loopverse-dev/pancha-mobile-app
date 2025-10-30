import { View, Text } from 'react-native'

/**
 * Placeholder component for the elephant character
 * Replace this with actual elephant image when available
 */
const ElephantPlaceholder = (): React.JSX.Element => {
  return (
    <View className="w-48 h-48 items-center justify-center">
      {/* Crown */}
      <View className="absolute top-0 z-10">
        <Text className="text-6xl">👑</Text>
      </View>
      
      {/* Elephant */}
      <View className="items-center justify-center">
        <Text className="text-8xl">🐘</Text>
      </View>
      
      {/* Book */}
      <View className="absolute bottom-8">
        <Text className="text-4xl">📖</Text>
      </View>
    </View>
  )
}

export default ElephantPlaceholder
