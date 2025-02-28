'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Grid, Switch } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer, FormSubmitButton } from '@/components'
import { AddClaimNotes, ClaimNotesResponse } from '@/types'
import { getLocalCalendarDate, sanitizeFormData } from '@/utils'
import { addClaimNotesAction, updateClaimNotesAction } from '../../actions'
import { useStore } from '../../store'
import { addClaimNotesSchema, SchemaType } from '../schema'
import { EffectiveDateFromInput } from './effective-date-from-input'
import { EffectiveDateToInput } from './effective-date-to-input'
import { NotesInput } from './notes-input'

interface ClaimNotesFormProps {
  onCloseModal: () => void
  claimId: string
  selectedData?: ClaimNotesResponse
  isEditMode: boolean
}

const ClaimNotesForm = ({
  onCloseModal,
  claimId,
  selectedData,
  isEditMode,
}: ClaimNotesFormProps) => {
  const { search } = useStore((state) => ({ search: state.search }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(addClaimNotesSchema),
    defaultValues: {
      id: selectedData?.id ?? '',
      claimId: selectedData?.claimId ?? '',
      note: selectedData?.note ?? '',
      effectiveDateTo:
        getLocalCalendarDate(selectedData?.effectiveDateTo) ?? undefined,
      effectiveDateFrom:
        getLocalCalendarDate(selectedData?.effectiveDateFrom) ?? undefined,
      isAlert: selectedData?.isAlert ?? false,
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const sanitizedPayload = sanitizeFormData(data)
    const reqPayload: Partial<AddClaimNotes> = {
      ...sanitizedPayload,
      claimId: claimId,
      effectiveDateFrom: sanitizedPayload.effectiveDateFrom
        ? sanitizedPayload.effectiveDateFrom.toString()
        : null,
      effectiveDateTo: sanitizedPayload.effectiveDateTo
        ? sanitizedPayload.effectiveDateTo.toString()
        : null,
      isAlert: data.isAlert ?? false,
      recordStatus: 'Active',
    }
    const response = isEditMode
      ? await updateClaimNotesAction(
          reqPayload,
          reqPayload.claimId ?? claimId,
          reqPayload.id ?? '',
        )
      : await addClaimNotesAction(reqPayload, claimId)

    if (response.state === 'error') {
      toast.error(response.error)
      return
    }
    if (response.state === 'success') {
      onCloseModal()
      const requestedPayload = {
        claimId: claimId,
        recordStatuses: ['Active'],
        isAlert: [true, false],
      }

      search(requestedPayload)
      form.reset()
      toast.success('Record has been saved successfully')
    }
  }
  const onCheckedChange = (isAlert: boolean) => {
    form.setValue('isAlert', isAlert, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }
  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Grid>
        <NotesInput />
      </Grid>
      <Grid columns={'2'} gap={'2'} className="mt-2">
        <EffectiveDateFromInput />
        <EffectiveDateToInput />
      </Grid>
      <Box className="mt-4 flex justify-start">
        <Switch
          className="ml-2 mr-2 mt-1"
          checked={form.getValues('isAlert')}
          onCheckedChange={onCheckedChange}
          size="1"
          highContrast
        />
        Alert
      </Box>
      <Box className="mt-4 flex justify-end">
        <FormSubmitButton size="2" highContrast form={form}>
          Save
        </FormSubmitButton>
      </Box>
    </FormContainer>
  )
}

export { ClaimNotesForm }
