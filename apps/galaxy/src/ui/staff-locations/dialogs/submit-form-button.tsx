'use client'

import {  Button, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer } from '@/components/form'
import { SchemaType } from './schema'

interface SubmitFormButtonProps {
  isUpdate: boolean
}

const SubmitFormButton = ({ isUpdate }: SubmitFormButtonProps) => {
  const form = useFormContext<SchemaType>()
  const {
    formState: { isSubmitting },
  } = form

  return (
    <FormFieldContainer className="flex-1 gap-0">
      <Flex justify="end" mt="3">
        <Button loading={isSubmitting} className="bg-pp-black-2 text-white">
          <Text size="2">{isUpdate ? 'Update' : 'Register Now'}</Text>
        </Button>
      </Flex>
    </FormFieldContainer>
  )
}

export { SubmitFormButton }