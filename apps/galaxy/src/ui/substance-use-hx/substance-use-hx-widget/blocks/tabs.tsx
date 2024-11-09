import { Flex, Text } from '@radix-ui/themes'
import {
  DeleteButton,
  SendToPatientButton,
} from '@/ui/questionnaires/questionnaires-widget/blocks'

type AlcoholDrugsTabProps = {
  label: string
}

const AlcoholDrugsTab = ({ label }: AlcoholDrugsTabProps) => {
  return (
    <Flex
      justify="between"
      align="center"
      width="40%"
      py="1"
      px="2"
      className="border-pp-focus-outline rounded-1 border"
    >
      <Text size="1" weight="bold">
        {label}
      </Text>
      <Flex align="center" gap="2">
        <SendToPatientButton /> <DeleteButton />
      </Flex>
    </Flex>
  )
}

export { AlcoholDrugsTab }
