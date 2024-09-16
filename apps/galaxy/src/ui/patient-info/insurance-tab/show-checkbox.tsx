'use client'

import { Checkbox, Flex, Text } from '@radix-ui/themes'
import { useStore } from './store'

const ShowCheckbox = () => {
  const { activeStatus, setActiveStatus } = useStore((state) => ({
    activeStatus: state.activeStatus,
    setActiveStatus: state.setActiveStatus,
  }))

  const handleChange = (status: boolean) => {
    setActiveStatus(status)
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
            checked={activeStatus === true}
            onCheckedChange={() => handleChange(true)}
          />
          Active
        </Flex>
      </Text>
      <Text as="label" size="1">
        <Flex gap="1">
          <Checkbox
            size="1"
            highContrast
            checked={activeStatus === false}
            onCheckedChange={() => handleChange(false)}
          />
          Inactive
        </Flex>
      </Text>
    </Flex>
  )
}

export { ShowCheckbox }
