import { useEffect, useRef } from 'react'
import { Flex, Text, Tooltip } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldError, NumberInput } from '@/components'
import { InformationLineIcon } from '@/components/icons'
import { ScheduleTemplateSchemaType } from './schedule-report-form'

const NumberOfDuration = () => {
  const form = useFormContext<ScheduleTemplateSchemaType>()
  const durationInterval = form.watch('durationInterval')
  const forDuration = form.watch('forDuration')
  const previousValues = useRef<{
    forDuration?: string
    durationInterval?: string
  }>({
    forDuration: undefined,
    durationInterval: undefined,
  })

  const getMaxValue = (interval: string) => {
    switch (interval) {
      case 'week':
        return 4
      case 'day':
        return 30
      case 'month':
        return 12
      case 'year':
        return 10
      default:
        return 31
    }
  }

  const maxValue = durationInterval ? getMaxValue(durationInterval) : 31

  const limitHandler = (values: { floatValue?: number; value: string }) => {
    const { floatValue, value } = values
    if (value === '') {
      return true
    }
    return floatValue !== undefined && floatValue >= 1 && floatValue <= maxValue
  }
  useEffect(() => {
    if (
      forDuration !== previousValues.current.forDuration ||
      durationInterval !== previousValues.current.durationInterval
    ) {
      form.setValue('numberOfDuration', '')
      previousValues.current = { forDuration, durationInterval }
    }
  }, [forDuration, durationInterval, form])

  const tooltipBody = (
    <Text size="1" className="text-pp-warning-black-text ">
      <ol className="list-decimal pl-5">
        <li>Days: Enter up to 30 days</li>
        <li>Week: Enter up to 4 weeks</li>
        <li>Month: Enter up to 12 months</li>
        <li>Year: Enter up to 10 years</li>
      </ol>
    </Text>
  )

  return (
    <FormFieldContainer className="max-w-[72px]">
      <Flex align="center" direction="row" gap="1">
        <NumberInput
          field="numberOfDuration"
          className="h-[24px]"
          max={maxValue}
          isAllowed={limitHandler}
          disabled={forDuration !== 'last'}
        />
        <Tooltip
          content={tooltipBody}
          delayDuration={250}
          className="bg-pp-warning-bg-1 [&__.rt-TooltipArrow]:fill-pp-warning-bg-1 max-w-[230px]"
          side="bottom"
          align="start"
        >
          <Text size="1">
            <InformationLineIcon />
          </Text>
        </Tooltip>
      </Flex>
      <FormFieldError name="numberOfDuration" />
    </FormFieldContainer>
  )
}

export { NumberOfDuration }
