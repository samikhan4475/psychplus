import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Flex, Heading, Text, TextField } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer, FormFieldContainer } from '@/components'
import { SignIcon } from '@/components/icons'

const schema = z.object({
  text: z.string().min(1, 'Required'),
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

  const onSubmit = () => {}

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex
        className="border-pp-focus-outline my-3 flex-1 gap-1 rounded-2 border p-3"
        direction={'column'}
      >
        <Heading className="text-[16px]">Addendum Text</Heading>
        <Flex className="gap-x-1" align="center">
          <Text as="label" size={'1'} weight={'medium'}>
            Add Text
          </Text>
          <Text as="label" size={'1'} className="text-red">
            *
          </Text>
          <Box className="flex-1">
            <FormFieldContainer>
              <TextField.Root
                size="1"
                id={'text'}
                autoFocus
                {...form.register('text')}
              />
            </FormFieldContainer>
          </Box>
        </Flex>
        <Flex justify="end" className="mt-2 gap-x-3">
          <Button
            variant="outline"
            color="gray"
            onClick={onCancel}
            type="button"
            className="text-pp-black-1"
          >
            Cancel
          </Button>
          <Button highContrast>
            <SignIcon width={16} height={16} />
            Sign
          </Button>
        </Flex>
      </Flex>
    </FormContainer>
  )
}

export { AddendumForm }
