import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Flex, Heading, Text, TextField } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import { SaveAddendumsAgainstNoteIdAction } from '@/actions/save-addendums-against-noteId-action'
import { FormContainer, FormFieldContainer, FormFieldError } from '@/components'
import { SignIcon } from '@/components/icons'
import { useStore } from '../store'

const schema = z.object({
  text: z
    .string()
    .min(1, 'Required')
    .max(128, 'Text must be at most 128 characters'),
})

type SchemaType = z.infer<typeof schema>

interface AddendumFormProps {
  onCancel: () => void
}

const AddendumForm = ({ onCancel }: AddendumFormProps) => {
  const [loading, setLoading] = useState(false)

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      text: '',
    },
  })
  const { selectedRow } = useStore((state) => ({
    selectedRow: state.selectedRow,
  }))

  const onSubmit = async (data: SchemaType) => {
    setLoading(true)
    const payload = {
      noteId: selectedRow?.id ?? '',
      patientId: String(selectedRow?.patientId),
      appointmentId: String(selectedRow?.appointmentId),
      isCoSigner: false,
      signerDescription: data.text,
    }

    const response = await SaveAddendumsAgainstNoteIdAction(payload)

    if (response.state === 'error') toast.error('Failed to save')
    else {
      toast.success('Saved')
      onCancel()
    }

    setLoading(false)
  }

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
          <Text as="label" size={'1'} color="red">
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
        <Box ml="9">
          <FormFieldError name="text" />
        </Box>
        <Flex justify="end" className="mt-2 gap-x-3">
          <Button
            variant="outline"
            color="gray"
            onClick={onCancel}
            type="button"
            className="text-pp-black-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button highContrast disabled={loading}>
            <SignIcon width={16} height={16} />
            Sign
          </Button>
        </Flex>
      </Flex>
    </FormContainer>
  )
}

export { AddendumForm }
