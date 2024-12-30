import React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import { PlusIcon } from 'lucide-react'

type AddButtonProps = {
  label: string
  onClick?: () => void
}

const AddButton = ({ label, onClick }: AddButtonProps) => {
  return (
    <Button variant="outline" onClick={onClick} type="button">
      <Flex align="center" gap="2" px="1">
        <PlusIcon height={12} width={12} />
        <Text weight="regular" size="2">
          {label}
        </Text>
      </Flex>
    </Button>
  )
}

export default AddButton
