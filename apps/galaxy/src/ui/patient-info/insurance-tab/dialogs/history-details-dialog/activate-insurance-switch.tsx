'use client'

import { Flex, Switch, Text } from '@radix-ui/themes'
import { useStore } from './store'

const ActivateInsuranceSwitch = () => {
  const { selectedRow } = useStore((state) => ({
    selectedRow: state.selectedRow,
  }))
  return (
    <Flex gap="1" className="col-span-2" align="center">
      <Text size="1" weight="medium">
        Activate insurance
      </Text>
      <Text as="label" size="1" weight="medium">
        <Flex className="gap-1.5">
          <Switch size="1" checked={selectedRow?.isActive} color="green" />
          {selectedRow?.isActive ? 'Yes' : 'No'}
        </Flex>
      </Text>
    </Flex>
  )
}

export { ActivateInsuranceSwitch }
