import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  loading?: boolean
  className?: string
}

const Button = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  className = '',
}: ButtonProps): React.JSX.Element => {
  const baseStyles = 'px-6 py-3 rounded-xl items-center justify-center'
  
  const variantStyles = {
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500',
    danger: 'bg-red-500',
  }

  const disabledStyles = disabled || loading ? 'opacity-50' : ''

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${disabledStyles} ${className}`}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-white font-semibold text-base">{title}</Text>
      )}
    </TouchableOpacity>
  )
}

export default Button
