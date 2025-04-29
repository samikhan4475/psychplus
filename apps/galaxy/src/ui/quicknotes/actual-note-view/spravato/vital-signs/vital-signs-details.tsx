import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import {
  VitalSignData,
  VitalTime,
} from '@/ui/procedures/spravato-tab/vital-signs/add-vital-signs/types'

interface VitalSignsDetailsProps {
  vitalSigns: VitalSignData[]
}

const VitalSignsDetails = ({ vitalSigns }: VitalSignsDetailsProps) => {
  const uniqueVitals = Array.from(
    new Map(
      [...vitalSigns].reverse().map((item) => [item.timeSlot, item]),
    ).values(),
  )

  return (
    <Flex direction="column" gap="1">
      {uniqueVitals.map(
        (item) =>
          item?.timeSlot && (
            <React.Fragment key={item.timeSlot}>
              <Text weight="medium" size="1">
                {item.label}
              </Text>
              {Number(item.timeSlot) !== VitalTime.Minutes40 && (
                <Text className="text-pp-text-sub" weight="regular" size="1">
                  {item.information}
                </Text>
              )}
            </React.Fragment>
          ),
      )}
    </Flex>
  )
}

export { VitalSignsDetails }
