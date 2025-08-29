'use client'

import { Box, Button, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer } from '@/components/form'

const SubmitFormButton = () => {
  const form = useFormContext()

  return (
    <FormFieldContainer className="flex-1 gap-0">
      <Box className="mt-4 flex justify-end">
        <Button
          loading={form.formState.isSubmitting}
          className="bg-pp-black-2 text-white"
        >
          <Text size="2">Save</Text>
        </Button>
      </Box>
    </FormFieldContainer>
  )
}

export { SubmitFormButton }
