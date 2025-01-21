'use client'

import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer } from '@/components/form'
import { SchemaType } from './practice-form'

const SubmitFormButton = () => {
  const form = useFormContext<SchemaType>()
  const {
    formState: { isSubmitting },
  } = form

  return (
    <FormFieldContainer className="flex-1 gap-0">
      <Flex className="mt-4" justify="end">
        <Button loading={isSubmitting} className="bg-pp-black-2 text-white">
          <Text size="2">Save</Text>
        </Button>
      </Flex>
    </FormFieldContainer>
  )
}

export { SubmitFormButton }
