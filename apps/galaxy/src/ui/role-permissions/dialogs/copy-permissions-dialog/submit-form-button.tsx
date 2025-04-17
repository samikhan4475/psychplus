'use client'

import { Box, Button, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer } from '@/components/form'
import { SchemaType } from './copy-permissions-form'

const SubmitFormButton = () => {
  const form = useFormContext<SchemaType>()
  const {
    formState: { isSubmitting },
  } = form

  return (
    <FormFieldContainer className="flex-1 gap-0">
      <Box className="mt-4 flex justify-end">
        <Button loading={isSubmitting} className="bg-pp-black-2 text-white">
          <Text size="2">Apply Permission</Text>
        </Button>
      </Box>
    </FormFieldContainer>
  )
}

export { SubmitFormButton }
