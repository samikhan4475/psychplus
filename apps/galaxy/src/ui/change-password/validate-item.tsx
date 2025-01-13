import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons'
import { Box } from '@radix-ui/themes'

const ValidationItem = ({
  isValid,
  label,
}: {
  isValid: boolean
  label: string
}) => (
  <Box className="flex items-center space-x-2">
    {isValid ? (
      <CheckIcon className="text-pp-states-success h-3 w-3" />
    ) : (
      <Cross1Icon className="text-pp-states-error h-3 w-3" />
    )}
    <span className="text-2">{label}</span>
  </Box>
)

export { ValidationItem }
