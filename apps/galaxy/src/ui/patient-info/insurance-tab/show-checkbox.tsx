'use client'

import { useEffect, useState } from 'react'
import { Checkbox, Flex, Text } from '@radix-ui/themes'
import { useStore } from './store'

const ShowCheckbox = () => {
  const { setFilteredInsurances } = useStore((state) => ({
    setFilteredInsurances: state.setFilteredInsurances,
  }))

  const [status, setStatus] = useState({ active: true, inactive: false })

  useEffect(() => {
    setFilteredInsurances(status.active, status.inactive)
  }, [status, setFilteredInsurances])

  const handleStatusChange = (
    type: 'active' | 'inactive',
    checked: boolean | 'indeterminate',
  ) => {
    setStatus((prev) => ({ ...prev, [type]: checked }))
  }

  return (
    <Flex direction="row" gap="2" align="center">
      <Text size="1" weight="medium">
        Show
      </Text>

      <Text as="label" size="1">
        <Flex gap="1">
          <Checkbox
            size="1"
            highContrast
            checked={status.active}
            onCheckedChange={(checked) => handleStatusChange('active', checked)}
          />
          Active
        </Flex>
      </Text>

      <Text as="label" size="1">
        <Flex gap="1">
          <Checkbox
            size="1"
            highContrast
            checked={status.inactive}
            onCheckedChange={(checked) =>
              handleStatusChange('inactive', checked)
            }
          />
          Inactive
        </Flex>
      </Text>
    </Flex>
  )
}

export { ShowCheckbox }
