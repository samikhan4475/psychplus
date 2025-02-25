import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { VitalTreatmentConfigType } from '@/ui/procedures/spravato-tab/vital-signs/add-vital-signs/types'

const VitalSignsDetails = ({
  config,
}: {
  config: { [key: number]: VitalTreatmentConfigType }
}) => {
  return (
    <Flex direction="column" gap="1">
      {Object.values(config).map((item) => (
        <React.Fragment key={item.treatmentLabel}>
          <Text weight="medium" size="1">
            {item.treatmentLabel}
          </Text>
          {item?.showMessage && (
            <Text className="text-pp-text-sub" weight="regular" size="1">
              {item.information}
            </Text>
          )}
        </React.Fragment>
      ))}
    </Flex>
  )
}

export { VitalSignsDetails }
