'use client'

import { Button, Flex } from '@radix-ui/themes'

const AddTemplateButton = () => {

  return (
    <Flex justify="end" mt="3">
      <Button
        type="submit"
        className="h-8 bg-pp-black-1 text-white"
      >
        Save
      </Button>
    </Flex>
  )
}

export { AddTemplateButton }

