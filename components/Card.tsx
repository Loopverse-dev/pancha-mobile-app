import { View, ViewProps } from 'react-native'

interface CardProps extends ViewProps {
  children: React.ReactNode
  className?: string
}

const Card = ({ children, className = '', ...props }: CardProps): React.JSX.Element => {
  return (
    <View
      className={`bg-white rounded-xl p-6 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </View>
  )
}

export default Card
