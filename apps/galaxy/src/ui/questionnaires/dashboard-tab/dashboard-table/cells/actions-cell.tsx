import { useParams } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import { SendHorizontalIcon } from 'lucide-react'
import { PropsWithRow } from '@/components'
import {
  QuestionnaireQuestionToSectionName,
  sendToPatient,
} from '@/ui/questionnaires/utils'
import { HIDDENQUESTIONNAIREIDS } from '../../constants'

interface Questionnaire {
  id: string
  question: string
}

const ActionsCell = ({ row }: PropsWithRow<Questionnaire>) => {
  const { id } = useParams<{ id: string }>()

  if (HIDDENQUESTIONNAIREIDS.includes(row.original.id)) {
    return
  }

  return (
    <Flex
      direction="row"
      height="100%"
      justify="center"
      px="1"
      align="center"
      gap="1"
      onClick={() =>
        sendToPatient(id, QuestionnaireQuestionToSectionName[row.original.id])
      }
    >
      <SendHorizontalIcon
        height={13}
        width={13}
        className="text-pp-send-icon"
      />
      <Text className="text-pp-link-text cursor-pointer text-[11px]">Send</Text>
    </Flex>
  )
}

export { ActionsCell }
