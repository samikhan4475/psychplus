'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { QuestionnairesSelectableChip } from './questionnaires-selectable-chip'
import { SelectableQuestionnairesChipDetails } from './selectable-questionnaire-chip-details'

interface QuestionnairesSelectOption {
  label: string
  value: string
}

interface QuestionnairesSelectSectionProps {
  label: string
  field: string
  options: QuestionnairesSelectOption[]
}

interface QuestionnaireRow {
  totalScore: number
  status: string
  date: string
  filledBy?: string
  reminderToCompleteQuestionnaireAlreadySent?: boolean
  sectionName?: string
}

const QuestionnairesSelectSection = ({
  label,
  field,
  options,
}: QuestionnairesSelectSectionProps) => {
  const { setValue, watch } = useFormContext()

  const formValues = watch(field) as {
    key: string
    value: QuestionnaireRow[]
  }[]

  const isSelected = (key: string) =>
    formValues.some((item) => item.key === key)

  const toggleSelected = (key: string) => () => {
    const existingEntry = formValues.find((v) => v.key === key)

    if (isSelected(key)) {
      setValue(
        field,
        formValues.filter((v) => v.key !== key),
        { shouldDirty: true },
      )
    } else {
      const newEntry = { key, value: existingEntry?.value ?? [] }
      setValue(field, [...formValues, newEntry], { shouldDirty: true })
    }
  }

  return (
    <Flex direction="column" gap="2">
      <Flex align="center" gap="2">
        <Text size="3" weight="medium">
          {label}
        </Text>

        <Flex gap="1" wrap="wrap">
          {options.map((option) => (
            <QuestionnairesSelectableChip
              key={option.value}
              label={option.label}
              selected={isSelected(option.value)}
              onClick={toggleSelected(option.value)}
            />
          ))}
        </Flex>
      </Flex>
      {formValues.length > 0 && (
        <Flex direction="column" align="start" gap="2" width="100%">
          {formValues.map((selectedDetail) => {
            const option = options.find(
              (opt) => opt.value === selectedDetail.key,
            )

            return (
              <SelectableQuestionnairesChipDetails
                key={selectedDetail.key}
                label={option?.label || selectedDetail.key}
                options={selectedDetail.value}
              />
            )
          })}
        </Flex>
      )}
    </Flex>
  )
}

export { QuestionnairesSelectSection, type QuestionnaireRow }
