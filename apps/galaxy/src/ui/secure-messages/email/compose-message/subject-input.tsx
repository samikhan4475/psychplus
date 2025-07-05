import { Box, Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError } from '@/components'
import { InputTitle } from './input-title'
import { SendMessageSchemaType } from './send-message-schema'

const SubjectInput = ({ disabled }: { disabled: boolean }) => {
  const form = useFormContext<SendMessageSchemaType>()
  return (
    <Box className="!mt-0">
      <Flex direction="row" className="h-[40px] w-[100%]" align={'center'}>
        <InputTitle label="Subject" />

        <TextField.Root
          size="3"
          type="text"
          className="rounded-lg h-[20px] w-full outline-none [box-shadow:none]"
          disabled={disabled}
          {...form.register('subject')}
        />
      </Flex>
      <FormFieldError name="subject" className="pl-2" />
    </Box>
  )
}

export { SubjectInput }
