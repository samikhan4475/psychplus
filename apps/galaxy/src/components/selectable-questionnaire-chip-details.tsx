import { Badge, Flex, Text } from '@radix-ui/themes'
import {
  DeleteButton,
  FilloutButton,
  HistoryButton,
  SendToPatientButton,
  ViewButton,
} from '@/ui/questionnaires/questionnaires-widget'
import { QuestionnaireRow } from './questionnaires-select-section'

interface SelectableQuestionnairesChipDetailsProps {
  label: string
  options: QuestionnaireRow[]
}

const SelectableQuestionnairesChipDetails = ({
  label,
  options,
}: SelectableQuestionnairesChipDetailsProps) => {
  return (
    <Flex className="w-full" direction="column">
      <Flex
        align="center"
        px="2"
        py="1"
        className="border-pp-focus-outline w-full rounded-1 border"
        justify="between"
      >
        <Flex align="center" gap="2">
          <Text size="2" weight="bold">
            {label}
            {options?.length > 1 && ` (${options?.length})`}
          </Text>
          {options?.length === 1 &&
            options.map((option, index) => (
              <Flex gap="2" align="center" key={`${index}+${option.date}`}>
                <Badge variant="surface" className="px-3 py-1">
                  Score {option.totalScore || 10}
                </Badge>
                <Badge variant="surface" className="px-3 py-1">
                  {option.status || 'Completed'}
                </Badge>
                <Text size="2" color="gray" weight="medium">
                  ON {option.date || '03/25/2024 09:27:30'}
                </Text>
              </Flex>
            ))}
        </Flex>
        {options?.length >= 1 && (
          <Flex gap="3" align="center">
            <SendToPatientButton />
            <FilloutButton />
            <HistoryButton />
            <ViewButton />
            <DeleteButton />
          </Flex>
        )}
      </Flex>
      {options?.length > 1 &&
        options.map((option, index) => (
          <Flex
            align="center"
            className="border-pp-bg-accent border"
            px="2"
            py="1"
            justify="between"
            key={`${index}+${option.date}`}
          >
            <Flex gap="2" align="center">
              <Badge variant="surface" className="px-3 py-1">
                Score {option.totalScore || 10}
              </Badge>
              <Badge variant="surface" className="px-3 py-1">
                {option.status || 'Completed'}
              </Badge>
              <Text size="2" color="gray" weight="medium">
                ON {option.date || '03/25/2024 09:27:30'}
              </Text>
            </Flex>
            <Flex gap="3" align="center">
              <ViewButton />
              <DeleteButton />
            </Flex>
          </Flex>
        ))}
    </Flex>
  )
}

export {
  SelectableQuestionnairesChipDetails,
  type SelectableQuestionnairesChipDetailsProps,
}
