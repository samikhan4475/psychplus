import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { YesNoSelect } from '@/components'
import { QuestionnaireRowDetail } from '@/ui/questionnaires/questionnaires-widget/blocks'
import { FilloutButtonBlock } from '@/ui/questionnaires/questionnaires-widget/blocks/fillout-button-block'
import { SendToPatientButton } from '@/ui/questionnaires/shared'
import { useStore } from '@/ui/questionnaires/store'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

type QuestionnaireRowProps = {
  label: QuickNoteSectionName
  badgeLabel: string
}

const Questionnaire = {
  [QuickNoteSectionName.QuickNoteSectionAudit]: {
    title: 'Audit',
    questionnaire: QuickNoteSectionName.QuickNoteSectionAudit,
  },
  [QuickNoteSectionName.QuickNoteSectionDast10]: {
    title: 'Dast',
    questionnaire: QuickNoteSectionName.QuickNoteSectionDast10,
  },
}

const QuestionnaireRow = ({ label, badgeLabel }: QuestionnaireRowProps) => {
  const { title, questionnaire } =
    Questionnaire[label as keyof typeof Questionnaire] ?? {}
  const { histories } = useStore((state) => ({
    histories: state.histories,
  }))
  const historiesData = histories[questionnaire] || []
  const latestHistory = historiesData[0]

  return (
    <Flex
      justify="between"
      align="center"
      width="60%"
      py="1"
      px="2"
      className="border-pp-focus-outline rounded-1 border"
    >
      <Flex align="center" gap="2">
        <Text size="1" weight="bold">
          {title}
        </Text>
        {latestHistory && (
          <QuestionnaireRowDetail
            option={latestHistory}
            label={badgeLabel}
            questionnaire={questionnaire}
          />
        )}
      </Flex>
      <Flex align="center" gap="2">
        <SendToPatientButton />
        <FilloutButtonBlock questionnaire={questionnaire} />
      </Flex>
    </Flex>
  )
}

const QuestionnairesBlock: React.FC = () => {
  const form = useFormContext()

  return (
    <>
      <YesNoSelect
        label="Questionnaire"
        description="Pt was agreeable to detailed assessment"
        field="questionnaire"
        isNoFirst
      />

      {form.watch('alcohol') === 'yes' && (
        <QuestionnaireRow
          label={QuickNoteSectionName.QuickNoteSectionAudit}
          badgeLabel="AUDIT"
        />
      )}
      {form.watch('drugs') === 'yes' && (
        <QuestionnaireRow
          label={QuickNoteSectionName.QuickNoteSectionDast10}
          badgeLabel="DAST-10"
        />
      )}
    </>
  )
}

export { QuestionnairesBlock }
