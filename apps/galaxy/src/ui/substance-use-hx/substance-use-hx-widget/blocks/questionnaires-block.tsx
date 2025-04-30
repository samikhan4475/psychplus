import React, { useEffect } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { YesNoSelect } from '@/components'
import { QuickNoteHistory } from '@/types'
import { QuestionnaireRowDetail } from '@/ui/questionnaires/questionnaires-widget/blocks'
import { SendToPatientButton } from '@/ui/questionnaires/shared'
import { FillOutButton } from '@/ui/questionnaires/shared/fill-out'
import { useStore } from '@/ui/questionnaires/store'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QUESTIONNAIRE_DESCRIPTION } from './constants'

type QuestionnaireRowProps = {
  sectionName: QuickNoteSectionName
  label: string
  badgeLabel: string
  latestHistory: QuickNoteHistory
}

const QuestionnaireRow = ({
  label,
  badgeLabel,
  sectionName,
  latestHistory,
}: QuestionnaireRowProps) => {
  const { formState } = useFormContext()

  const isError = formState.errors[sectionName]?.message as string | undefined

  return (
    <Flex>
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
            {label}
          </Text>
          {latestHistory && (
            <QuestionnaireRowDetail
              option={latestHistory}
              label={badgeLabel}
              questionnaire={label}
            />
          )}
        </Flex>
        <Flex align="center" gap="2">
          <SendToPatientButton sectionName={sectionName} />
          <FillOutButton sectionName={sectionName} data={[]} />
        </Flex>
      </Flex>

      {!!isError && (
        <Text size="1" color="red" className="ml-2 ">
          {isError}
        </Text>
      )}
    </Flex>
  )
}

const QuestionnairesBlock: React.FC = () => {
  const form = useFormContext()
  const { histories } = useStore((state) => ({
    histories: state.histories,
  }))

  const auditHistories =
    histories[QuickNoteSectionName.QuickNoteSectionAudit] || []
  const DastHistories =
    histories[QuickNoteSectionName.QuickNoteSectionDast10] || []

  useEffect(() => {
    if (auditHistories.length) {
      form.setValue(QuickNoteSectionName.QuickNoteSectionAudit, true)
    }
    if (DastHistories.length) {
      form.setValue(QuickNoteSectionName.QuickNoteSectionDast10, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [histories, form.watch('alcohol'), form.watch('drugs')])

  const checked = form.watch(['drugs', 'alcohol', 'questionnaire'])

  useEffect(() => {
    if (auditHistories.length) {
      form.setValue(QuickNoteSectionName.QuickNoteSectionAudit, true)
    }
    if (DastHistories.length) {
      form.setValue(QuickNoteSectionName.QuickNoteSectionDast10, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(checked)])

  return (
    <>
      <YesNoSelect
        label="Questionnaire"
        description={QUESTIONNAIRE_DESCRIPTION}
        field="questionnaire"
        isNoFirst
      />

      {form.watch('alcohol') === 'yes' && (
        <QuestionnaireRow
          label={'Audit'}
          badgeLabel="AUDIT"
          latestHistory={auditHistories[0]}
          sectionName={QuickNoteSectionName.QuickNoteSectionAudit}
        />
      )}
      {form.watch('drugs') === 'yes' && (
        <QuestionnaireRow
          label={'Dast'}
          badgeLabel="DAST-10"
          latestHistory={DastHistories[0]}
          sectionName={QuickNoteSectionName.QuickNoteSectionDast10}
        />
      )}
    </>
  )
}

export { QuestionnairesBlock }
