import { useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { Checkbox } from '@psychplus/ui/checkbox'
import { FeeScheduleConfigLocationRadio } from './fee-schedule-config-location-radio'
import { FeeScheduleConfigModifierRadio } from './fee-schedule-config-modifier-radio'
import { FeeScheduleConfigPayerRadio } from './fee-schedule-config-payer-radio'
import { FeeScheduleConfigServiceRadio } from './fee-schedule-config-service-radio'

enum FEE_SCHEDULE_CONFIG_ENUM {
  PAYER = 'PAYER',
  LOCATION = 'LOCATION',
  SERVICE = 'SERVICE',
  MODIFIER = 'MODIFIER',
}

interface Props {
  label: string
  value: FEE_SCHEDULE_CONFIG_ENUM
  disabled?: boolean
}

const FeeScheduleConfigCheckbox = ({
  label,
  value,
  disabled = false,
}: Props) => {
  const [isSelected, setIsSelected] = useState<boolean>(false)

  return (
    <>
      <Text as="label" size="2">
        <Flex gap="2" direction="column">
          <div>
            <Checkbox
              size="1"
              disabled={disabled}
              onCheckedChange={(checked: boolean) => setIsSelected(checked)}
            />{' '}
            {label}
          </div>
          {isSelected && value === FEE_SCHEDULE_CONFIG_ENUM.PAYER && (
            <FeeScheduleConfigPayerRadio />
          )}
          {isSelected && value === FEE_SCHEDULE_CONFIG_ENUM.LOCATION && (
            <FeeScheduleConfigLocationRadio />
          )}
          {isSelected && value === FEE_SCHEDULE_CONFIG_ENUM.SERVICE && (
            <FeeScheduleConfigServiceRadio />
          )}
          {isSelected && value === FEE_SCHEDULE_CONFIG_ENUM.MODIFIER && (
            <FeeScheduleConfigModifierRadio />
          )}
        </Flex>
      </Text>
    </>
  )
}

export { FeeScheduleConfigCheckbox, FEE_SCHEDULE_CONFIG_ENUM }
