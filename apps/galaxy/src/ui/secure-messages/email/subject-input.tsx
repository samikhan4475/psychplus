import { Box, Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError } from '@/components'
import { SendMessageSchemaType } from './send-message-schema'
import { SubjectTitle } from './subject-title'

const SubjectInput = ({ disabled }: { disabled: boolean }) => {
  const form = useFormContext<SendMessageSchemaType>()
  return (
    <Box className="!mt-4">
      <FormFieldError name="subject" />
      <Flex
        direction="row"
        className="border-pp-gray-4   h-[40px] w-[100%] border-b pb-[6px]"
        align={'center'}
      >
        <SubjectTitle />

        <TextField.Root
          size="3"
          type="text"
          className="rounded-lg h-[20px] w-full outline-none [box-shadow:none]"
          disabled={disabled}
          {...form.register('subject')}
        />
      </Flex>
    </Box>
  )
}

export { SubjectInput }
