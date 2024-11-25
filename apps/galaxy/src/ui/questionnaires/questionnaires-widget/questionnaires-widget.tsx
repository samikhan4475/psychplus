'use client'

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Checkbox, Flex, Text } from '@radix-ui/themes'
import { useStore } from '../store'
import { QuestionnairesDetails, SelectableChip } from './blocks'
import { BLOCK_OPTIONS, BLOCK_TITLE } from './constants'

interface QuestionnaireRow {
  totalScore: number
  status: string
  date: string
  filledBy?: string
  reminderToCompleteQuestionnaireAlreadySent?: boolean
  sectionName?: string
}

const QuestionnairesWidget = () => {
  const patientId = useParams().id as string
  const {
    showNoteViewValue,
    selectedTabs,
    setSelectedTabs,
    initializeQuestionnaires,
    updateShowNoteView,
  } = useStore((state) => ({
    showNoteViewValue: state.showNoteViewValue,
    selectedTabs: state.selectedTabs,
    setSelectedTabs: state.setSelectedTabs,
    initializeQuestionnaires: state.initializeQuestionnaires,
    updateShowNoteView: state.updateShowNoteView,
  }))

  useEffect(() => {
    initializeQuestionnaires(patientId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Flex
      direction="column"
      py="3"
      gap="2"
      className="bg-white px-2.5 shadow-2"
    >
      <Flex align="center" gap="2">
        <Checkbox
          checked={showNoteViewValue === 'show' ? true : false}
          onCheckedChange={(checked) =>
            updateShowNoteView(!!checked, patientId)
          }
          highContrast
          className="cursor-pointer"
        />
        <Text size="3" weight="medium">
          {BLOCK_TITLE}
        </Text>

        <Flex gap="1" wrap="wrap">
          {BLOCK_OPTIONS.map((questionnaire) => {
            const isSelected = selectedTabs.includes(questionnaire.value)
            return (
              <SelectableChip
                key={questionnaire.value}
                label={questionnaire.label}
                selected={isSelected}
                onClick={() => setSelectedTabs(questionnaire.value)}
              />
            )
          })}
        </Flex>
      </Flex>
      {selectedTabs.length > 0 && (
        <Flex direction="column" align="start" gap="2" width="100%">
          {selectedTabs.map((tab) => {
            const option = BLOCK_OPTIONS.find((opt) => opt.value === tab)
            return (
              option && (
                <QuestionnairesDetails
                  key={tab}
                  questionnaire={tab}
                  option={option}
                />
              )
            )
          })}
        </Flex>
      )}
    </Flex>
  )
}

export { QuestionnairesWidget, type QuestionnaireRow }
