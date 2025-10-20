import React, { Component, ErrorInfo, ReactNode } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <SafeAreaView className="flex-1 bg-gray-50">
          <View className="flex-1 items-center justify-center p-6">
            <View className="bg-red-100 w-20 h-20 rounded-full items-center justify-center mb-6">
              <Text className="text-red-600 text-4xl">!</Text>
            </View>
            
            <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Oops! Something went wrong
            </Text>
            
            <Text className="text-gray-600 text-center mb-6">
              We encountered an unexpected error. Please try again.
            </Text>

            {__DEV__ && this.state.error && (
              <View className="bg-gray-100 p-4 rounded-lg mb-6 w-full">
                <Text className="text-red-600 text-sm font-mono">
                  {this.state.error.toString()}
                </Text>
              </View>
            )}

            <TouchableOpacity
              onPress={this.handleReset}
              className="bg-blue-500 px-8 py-3 rounded-xl"
            >
              <Text className="text-white font-semibold text-base">
                Try Again
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
