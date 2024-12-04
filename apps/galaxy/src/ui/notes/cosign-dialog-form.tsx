'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import { getProvidersOptionsAction } from '@/actions'
import {
  AsyncSelect,
  FormContainer,
  FormFieldError,
  FormFieldLabel,
  FormSubmitButton,
} from '@/components'
import { sendToCosignerAction } from './actions/sent-to-cosigner'
import { useNoteActions } from './use-note-actions'

const schema = z.object({
  provider: z.string().min(1, 'Provider is required'),
})
type SchemaType = z.infer<typeof schema>

const CosignDialogForm = () => {
  const { validateAndPreparePayload } = useNoteActions()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      provider: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (values) => {
    const payload = validateAndPreparePayload({ staffId: values.provider })

    if (!payload) return

    const result = await sendToCosignerAction(payload.payload)

    if (result.state === 'error') {
      toast.error(result.error || 'Failed to send to co-signer')
      return
    }

    toast.success('Successfully sent to co-signer')
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex direction="column" width="100%" gap="6">
        <Flex direction="column" className={selectButtonClass}>
          <FormFieldLabel>Select Provider to Transfer</FormFieldLabel>

          <AsyncSelect
            field="provider"
            placeholder="Select"
            fetchOptions={() => getProvidersOptionsAction()}
            buttonClassName="w-full h-6"
          />
          <FormFieldError name="provider" />
        </Flex>
        <Flex justify="end">
          <FormSubmitButton highContrast form={form} size="1">
            Send To Co-Sign
          </FormSubmitButton>
        </Flex>
      </Flex>
    </FormContainer>
  )
}

const selectButtonClass =
  'w-full gap-[2px] [&__button]:border-pp-gray-2 [&__button]:w-full [&__button]:h-6 [&__button]:border [&__button]:border-solid [&__button]:!outline-none [&__button]:[box-shadow:none]'

export { CosignDialogForm }
