'use client'

import { Button, Flex } from '@radix-ui/themes'

interface SubmitButtonProps {
  isEditAble?: boolean
}

const SubmitButton = ({ isEditAble }: SubmitButtonProps) => {
  return (
    <Flex justify="end">
      <Button size="2" highContrast type="submit">
        {isEditAble ? 'Update' : 'Add'}
      </Button>
    </Flex>
  )
}

export { SubmitButton }
