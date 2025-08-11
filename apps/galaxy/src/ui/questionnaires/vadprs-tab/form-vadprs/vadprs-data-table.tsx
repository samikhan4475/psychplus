import { SelectOptionType } from '@/types'
import { Badge, Flex, Table, Text } from '@radix-ui/themes'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { RadioButton } from '../../shared'
import { TOTAL_SCORE } from '../constants'
import { calculateVadprsTotalScore } from '../utils'
import { QuestionnairesVadprsData } from '../types'

interface QuestionnairesFormVadprsDatatableProps {
  data: QuestionnairesVadprsData[]
  disabled?: boolean
  options: SelectOptionType[]
}

const QuestionnairesFormVadprsDataTable = ({
  data,
  disabled,
  options,
}: QuestionnairesFormVadprsDatatableProps) => {
  const { watch } = useFormContext()
  const formValues = watch()

  const totalScore = useMemo(() => calculateVadprsTotalScore(formValues), [formValues])

  const calculateQ1to18Score = () => totalScore

  const getRowClassName = (
    questionIndex: number,
    isScoreInterpretor: boolean,
  ) => {
    if (questionIndex % 2 === 1) return 'bg-pp-bg-table-cell'
    if (isScoreInterpretor) return 'bg-[#EEF2F6]'
    return ''
  }

  return (
    <Table.Body>
      {data.map((item, questionIndex) => {
        const isScoreInterpretor = item.id === TOTAL_SCORE
        return (
          <Table.Row
            key={item.id}
            className={getRowClassName(questionIndex, isScoreInterpretor)}
          >
            <Table.Cell className="w-[37.5%]">
              <Text weight="medium" size="1">
                {item.question}
              </Text>
            </Table.Cell>
            {isScoreInterpretor ? (
              <Table.Cell colSpan={options.length}>
                <Flex align="center" justify="end" gap="1">
                  <Badge
                    size="1"
                    variant="soft"
                    mx="1"
                    color={'green'}
                    className="1px solid border bg-green-4"
                  >
                    Score {calculateQ1to18Score()}
                  </Badge>
                </Flex>
              </Table.Cell>
            ) : (
              options?.map((option, optionIndex) => (
                <Table.Cell
                  key={`${item.id}-${optionIndex}`}
                  className={`align-middle ${'w-[12.5%]'}`}
                >
                  <RadioButton
                    className="bg-0 rounded-0 border-0 [&>label]:justify-center"
                    field={`${item.id}`}
                    options={[option]}
                    disabled={disabled}
                    labelClassName="!flex-[0]"
                  />
                </Table.Cell>
              ))
            )}
          </Table.Row>
        )
      })}
    </Table.Body>
  )
}

export { QuestionnairesFormVadprsDataTable }
