import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { TOGRA_BLUE_LABEL } from './constants'

interface StartTimerProps {
  onChange: (value: boolean) => void
}

const StartTimer = ({ onChange }: StartTimerProps) => {
  return (
    <Flex
      align="center"
      direction="column"
      className="bg-white h-[300px] rounded-b-[4px] px-2 py-1 pr-3 text-center shadow-2"
    >
      <Box className="mb-2 mt-6">
        <Text>{TOGRA_BLUE_LABEL}</Text>
      </Box>
      <Box>
        <Button
          size="2"
          onClick={() => onChange(true)}
          highContrast
          type="button"
        >
          Start Questionnaire
        </Button>
      </Box>
    </Flex>
  )
}

export { StartTimer }
