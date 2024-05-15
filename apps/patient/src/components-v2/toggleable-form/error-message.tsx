import { Text } from '@radix-ui/themes'
import { useToggleableFormContext } from './context'

const ErrorMessage = () => {
  const { error } = useToggleableFormContext()

  return error ? (
    <Text className="text-[13px] text-tomato-11">{error}</Text>
  ) : null
}

export { ErrorMessage }
