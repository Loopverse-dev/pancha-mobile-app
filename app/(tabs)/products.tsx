import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { Spacing } from '@/constants'

const products = [
  { id: '1', name: 'Wireless Headphones', price: '$99.99', rating: 4.5 },
  { id: '2', name: 'Smart Watch', price: '$249.99', rating: 4.8 },
  { id: '3', name: 'Laptop Stand', price: '$49.99', rating: 4.3 },
  { id: '4', name: 'USB-C Cable', price: '$19.99', rating: 4.6 },
  { id: '5', name: 'Phone Case', price: '$29.99', rating: 4.4 },
  { id: '6', name: 'Portable Charger', price: '$39.99', rating: 4.7 },
]

const Products = (): React.JSX.Element => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View style={{ padding: Spacing.sectionSpacing }}>
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-gray-900">
              Products
            </Text>
            <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-lg">
              <Text className="text-white font-semibold">Filter</Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            {products.map((product) => (
              <TouchableOpacity
                key={product.id}
                className="bg-white rounded-xl p-4 shadow-sm flex-row"
                activeOpacity={0.7}
              >
                <View className="w-20 h-20 bg-gray-200 rounded-lg mr-4" />
                
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-900 mb-1">
                    {product.name}
                  </Text>
                  <View className="flex-row items-center mb-2">
                    <Ionicons name="star" size={16} color="#F59E0B" />
                    <Text className="text-gray-600 ml-1">{product.rating}</Text>
                  </View>
                  <Text className="text-xl font-bold text-blue-600">
                    {product.price}
                  </Text>
                </View>

                <TouchableOpacity className="justify-center">
                  <View className="bg-blue-500 w-10 h-10 rounded-full items-center justify-center">
                    <Ionicons name="cart" size={20} color="white" />
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Products