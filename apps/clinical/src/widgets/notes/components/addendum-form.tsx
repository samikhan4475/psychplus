import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Heading } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { FormTextInput, validate } from '@psychplus/form'
import { FormContainer } from '@psychplus/ui/form/form-container'
import { SignIcon } from '@/components/icons'
import { ActionButton } from './action-button'

const schema = z.object({
  text: validate.requiredString,
})

type SchemaType = z.infer<typeof schema>

interface AddendumFormProps {
  onCancel: () => void
}

const AddendumForm = ({ onCancel }: AddendumFormProps) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      text: '',
    },
  })

  const onSubmit = () => {
    // TODO: Will be implemented once APIs are there
  }

  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      formClassName="border border-[#8DA4EF] rounded-[8px] p-3 my-3"
    >
      <Heading className="text-[16px]">Addendum Text</Heading>
      <Flex className="gap-x-1" align='center'>
        <Flex className="text-[12px]">
          <span>Add Text</span>
          <span className="text-[#FF0000]">*</span>
        </Flex>
        <Box className="flex-1">
          <FormTextInput
            label=""
            className="h-6 text-[12px]"
            {...form.register('text')}
          />
        </Box>
      </Flex>
      <Flex justify="end" className="gap-x-3">
        <ActionButton
          mode="ghost"
          variant="outline"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </ActionButton>
        <ActionButton mode="secondary">
          <SignIcon width={16} height={16} />
          Sign
        </ActionButton>
      </Flex>
    </FormContainer>
  )
}

export { AddendumForm }
