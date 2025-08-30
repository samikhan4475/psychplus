import React, { useEffect, useMemo } from 'react'
import Image from 'next/image'
import { Box, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { RadioSelectSection } from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { formatDate, postEvent } from '@/utils'
import { useStore } from '../../store'
import { QUESTIONS, TOGRA_BLUE_LABEL, TOTAL_TIME_LIMIT } from '../constants'
import { CountdownTimer } from '../countdown-timer'
import { StartTimer } from '../start-timer'
import { QuestionnairesFormProps } from '../types'
import { RadioImageButton } from './image-radio'

const QuestionnairesFormTogra = ({
  disabled,
  patientId,
  fillOutView = false,
  submittedDate,
  startedAt,
}: QuestionnairesFormProps) => {
  const form = useFormContext()
  const { startTimer, setStartTimer, hasActiveTimer } = useStore(
    (state) => state,
  )
  const { getValues } = useFormContext()
  const hasSubmittedData = submittedDate
    ? submittedDate
    : getValues('TograBlueSubmittedDate')

  const isFormDisabled = useMemo(() => {
    if (!startedAt) {
      return disabled
    }

    const currentTime = Date.now()
    const startedAtDate = new Date(startedAt).getTime()
    const timeElapsed = (currentTime - startedAtDate) / (1000 * 60)

    return disabled || timeElapsed >= TOTAL_TIME_LIMIT
  }, [disabled, startedAt, startTimer])

  useEffect(() => {
    if (fillOutView && !isFormDisabled && hasActiveTimer(patientId)) {
      setStartTimer(true)
    }
  }, [fillOutView, isFormDisabled, patientId, hasActiveTimer, setStartTimer])

  const handleTimeUp = () => {
    form.setValue('TograBlueSubmittedDate', new Date().toISOString())
    form.setValue('TograBlueCompletedDuration', `${TOTAL_TIME_LIMIT}`)
    postEvent({
      type: 'quicknotes:save',
      widgetId: QuickNoteSectionName.QuicknoteSectionTograBlue,
    })
  }

  const handleStartTimer = (value: boolean) => {
    form.setValue('TograBlueStartedAt', new Date().toISOString())
    setStartTimer(value)
  }

  if (fillOutView && !startTimer && !isFormDisabled) {
    return <StartTimer onChange={handleStartTimer} />
  }

  return (
    <Flex direction="column" gap="2">
      <Flex
        maxWidth="100%"
        className="bg-white"
        px="3"
        py="1"
        justify="between"
      >
        {isFormDisabled && fillOutView ? (
          <Box className="py-2">
            <Text>
              This questionnaire was completed on{' '}
              {hasSubmittedData && formatDate(hasSubmittedData)}
            </Text>
          </Box>
        ) : (
          <>
            <Box>
              <Text>{TOGRA_BLUE_LABEL}</Text>
            </Box>
            <Box>
              <CountdownTimer
                initialMinutes={TOTAL_TIME_LIMIT}
                patientId={patientId}
                onTimeUp={handleTimeUp}
              />
            </Box>
          </>
        )}
      </Flex>
      <Flex maxWidth="100%" className="bg-white" px="3">
        <Flex direction="column" width="100%" gap="2">
          {QUESTIONS.map((question, index) => {
            const questionNumber = index + 1
            return (
              <Box key={question.id}>
                <Flex direction="column" gap="2">
                  <Box
                    className={
                      questionNumber % 2 === 0
                        ? 'bg-pp-bg-table-cell w-full p-2'
                        : 'p-2'
                    }
                  >
                    <Flex direction="row" gap="2" align="start">
                      <Text
                        className={
                          questionNumber % 2 === 0 ? 'bg-pp-bg-table-cell' : ''
                        }
                      >
                        {questionNumber}.
                      </Text>
                      <Text>{question.question}</Text>
                    </Flex>
                  </Box>

                  {!question.radio || questionNumber === 49 ? (
                    <Box className="ml-8 flex w-[768px] justify-center">
                      <div className="relative h-36 w-full">
                        <Image
                          src={`/ehr/togra/blue/${question.id}.png`}
                          alt="question"
                          fill
                          className="rounded-lg border object-contain"
                        />
                      </div>
                    </Box>
                  ) : null}

                  <Box className="ml-8">
                    <Flex gap="2" direction="row">
                      {question.radio ? (
                        <RadioSelectSection
                          field={question.id}
                          options={question.options}
                          disabled={isFormDisabled}
                        />
                      ) : (
                        <RadioImageButton
                          question={question.id}
                          field={question.id}
                          options={question.options}
                          disabled={isFormDisabled}
                        />
                      )}
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            )
          })}
        </Flex>
      </Flex>
    </Flex>
  )
}

export { QuestionnairesFormTogra }
