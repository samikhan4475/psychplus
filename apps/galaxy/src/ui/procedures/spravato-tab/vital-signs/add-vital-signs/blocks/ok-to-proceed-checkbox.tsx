import { useMemo } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CheckboxCell } from '@/components'
import { cn } from '@/utils'
import { SpravatoWidgetSchemaType } from '../../../spravato-widget-schema'
import { VitalTime } from '../types'

const OkToProceedCheckbox = ({ timeSlot }: { timeSlot: number }) => {
  const form = useFormContext<SpravatoWidgetSchemaType>()
  const isOkToProceed = form.watch('isOkToProceed') ?? 'false'
  const vitalSigns = form.watch('vitalSigns')
  const isSelected = isOkToProceed === 'true'
  const isDisabled = useMemo(
    () =>
      vitalSigns.some(
        (item) =>
          (item?.timeSlot &&
            Number(item?.timeSlot) !== VitalTime.PriorTreatment) ||
          (item?.isOkToProceed && item?.isOkToProceed === 'true'),
      ),
    [vitalSigns],
  )

  return (
    timeSlot === 0 && (
      <Flex
        direction="row"
        className={cn(
          'flex h-[var(--chip-height)] items-center rounded-1 px-1 py-[10px]',
          {
            'border-pp-focus-outline bg-pp-focus-bg border': isSelected,
          },
          {
            'border-pp-grey border': !isSelected,
          },
        )}
      >
        <CheckboxCell
          checked={isOkToProceed === 'true'}
          onCheckedChange={(value) =>
            form.setValue('isOkToProceed', `${value}`)
          }
          disabled={isDisabled}
        />
        <Text size="2" weight="medium">
          Ok to Proceed
        </Text>
      </Flex>
    )
  )
}

export { OkToProceedCheckbox }
