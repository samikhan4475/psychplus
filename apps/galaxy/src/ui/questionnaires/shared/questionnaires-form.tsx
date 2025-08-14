import { useMemo, useState } from 'react'
import { Box, Flex, Table, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils'
import { Pagination } from './questionnaires-pagination'
import { RadioButton } from './radio-button'
import {
  ScoreInterpretation,
  ScoreInterpretationRange,
} from './score-interpretation'
import {
  ScoreInterpretationDesired,
  SubscalesConfig,
} from './score-interpretation-desired'

interface Option {
  value: string
  label: string
}

interface QuestionnairesData {
  id: string
  question: string
  value: number
  options: Option[]
}

interface PaginationConfig {
  enabled: boolean
  itemsPerPage?: number
  interpretation: SubscalesConfig
}

interface QuestionnairesFormProps {
  data: QuestionnairesData[]
  labels: string[]
  totalScore: number
  scoreInterpretationRanges: ScoreInterpretationRange[]
  classNameHeader?: string
  classNameHeaderCell?: string
  classNameCell?: string
  disabled?: boolean
  showCounter?: boolean
  showHeader?: boolean
  headingLabel?: string
  pagination?: PaginationConfig
}

const QuestionnairesForm = ({
  data,
  labels,
  totalScore,
  scoreInterpretationRanges,
  classNameHeader,
  classNameHeaderCell,
  classNameCell,
  disabled = false,
  showCounter = true,
  showHeader = true,
  headingLabel,
  pagination,
}: QuestionnairesFormProps) => {
  const { watch } = useFormContext()

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = pagination?.itemsPerPage || 50
  const totalPages = pagination?.enabled
    ? Math.ceil(data.length / itemsPerPage)
    : 1

  const paginatedData = useMemo(() => {
    if (!pagination?.enabled) return data

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }, [data, currentPage, itemsPerPage, pagination?.enabled])

  const getQuestionNumber = (index: number) => {
    if (!pagination?.enabled) return index + 1
    return (currentPage - 1) * itemsPerPage + index + 1
  }

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages + 1, prev + 1))
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const result = Object.fromEntries(
    data.map((item) => {
      const value = watch(item.id)
      return [item.id, Number(item.value) === Number(value)]
    }),
  )

  const headerClass =
    classNameHeader || (classNameHeaderCell && 'bg-pp-bg-table-label')

  return (
    <Box className="w-full">
      <Table.Root variant="ghost" size="1">
        {paginatedData.length > 0 && (
          <Table.Header className={headerClass}>
            {showHeader && (
              <Table.Row>
                <Table.ColumnHeaderCell width="50%">
                  <Text weight="medium" size="2">
                    {labels?.[0]}
                  </Text>
                </Table.ColumnHeaderCell>

                {labels?.slice(1).map((label) => (
                  <Table.ColumnHeaderCell
                    key={label}
                    width={`${50 / (labels.length - 1)}%`}
                    className={classNameHeaderCell}
                  >
                    <Text weight="medium" size="2">
                      {label}
                    </Text>
                  </Table.ColumnHeaderCell>
                ))}
              </Table.Row>
            )}

            {headingLabel && (
              <Table.Row className="bg-pp-bg-table-label">
                <Table.Cell colSpan={5} className="h-fit py-1">
                  <Text weight="medium" size="1">
                    {headingLabel}
                  </Text>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Header>
        )}

        <Table.Body>
          {paginatedData.map((item, index) => (
            <Table.Row
              key={item.id}
              className={cn(index % 2 === 1 && 'bg-pp-bg-table-cell')}
              align="center"
            >
              <Table.Cell width="50%">
                <Flex gap="1">
                  {showCounter && (
                    <Text weight="medium" size="1">
                      {getQuestionNumber(index)}.
                    </Text>
                  )}
                  <Text weight="medium" size="1">
                    {item.question}
                  </Text>
                </Flex>
              </Table.Cell>
              {item.options?.map((option, colIndex) => {
                return (
                  <Table.Cell
                    key={`${item.id}-${colIndex}`}
                    width={`${50 / (labels.length - 1)}%`}
                    className={classNameCell}
                  >
                    {option.label && option.value && (
                      <RadioButton
                        className="bg-0 rounded-0 border-0"
                        field={`${item.id}`}
                        options={[option]}
                        disabled={disabled}
                      />
                    )}
                  </Table.Cell>
                )
              })}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {scoreInterpretationRanges && !!scoreInterpretationRanges.length ? (
        <Box mt="2">
          <ScoreInterpretation
            ranges={scoreInterpretationRanges}
            totalScore={totalScore}
          />
        </Box>
      ) : (
        currentPage === totalPages + 1 && (
          <ScoreInterpretationDesired
            answers={result}
            interpretationData={pagination?.interpretation as SubscalesConfig}
          />
        )
      )}

      {pagination?.enabled && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </Box>
  )
}

export {
  QuestionnairesForm,
  type PaginationConfig,
  type QuestionnairesData,
  type Option,
}
