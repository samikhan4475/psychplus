'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import {
  FormContainer,
  FormFieldError,
  FormFieldLabel,
  FormSubmitButton,
} from '@/components'
import { sendToCosignerAction } from './actions/sent-to-cosigner'
import { NotesCosignerDropdown } from './note-detail/note-cosigner-dropdown'
import { useStore } from './store'
import { useNoteActions } from './use-note-actions'

const schema = z.object({
  provider: z.string().min(1, 'Provider is required'),
})
type CosignSchemaType = z.infer<typeof schema>

const CosignDialogForm = () => {
  const { appointment } = useStore((state) => ({
    appointment: state.appointment,
  }))
  const { validateAndPreparePayload } = useNoteActions()

  const form = useForm<CosignSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      provider: '',
    },
  })

  const onSubmit: SubmitHandler<CosignSchemaType> = async (values) => {
    const payload = validateAndPreparePayload()

    if (!payload) return

    const result = await sendToCosignerAction({
      ...payload,
      staffId: values.provider,
    })

    if (result.state === 'error') {
      toast.error(result.error || 'Failed to send to co-signer')
      return
    }

    toast.success('Successfully sent to co-signer')
  }

  const updateFormField = (value: string) => {
    form.setValue('provider', value)
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex direction="column" width="100%" gap="6">
        <Flex direction="column" className={selectButtonClass}>
          <FormFieldLabel>Select Provider to Transfer</FormFieldLabel>
          <NotesCosignerDropdown
            cosigners={appointment?.cosigners}
            setField={updateFormField}
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

export { CosignDialogForm, type CosignSchemaType }
