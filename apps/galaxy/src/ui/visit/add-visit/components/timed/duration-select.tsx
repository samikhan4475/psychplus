'use client'

import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { useHasPermission } from '@/hooks'
import { SelectOptionType } from '@/types'
import { PermissionAlert } from '@/ui/schedule/shared'
import { getPrescriberSettings } from '@/ui/visit/client-actions'
import { EDIT_DURATION } from '@/ui/visit/constants'
import { SchemaType } from '../../schema'
import { useAddVisitStore } from '../../store'

const DurationDropdown = () => {
  const form = useFormContext<SchemaType>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const canEditDuration = useHasPermission('editVisitDuration')
  const [loading, setLoading] = useState<boolean>(false)
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const { visitTypes, userId } = useAddVisitStore()
  const [visitTime, selectedVisitType, visitSequence, visitMedium, providerId] =
    useWatch({
      control: form.control,
      name: [
        'visitTime',
        'visitType',
        'visitSequence',
        'visitMedium',
        'provider',
      ],
    })

  useEffect(() => {
    if (!providerId || !selectedVisitType || !visitSequence || !visitMedium)
      return

    const visitType = visitTypes.find(
      (type) => type.encouterType === selectedVisitType,
    )
    setLoading(true)
    const name = `${visitType?.visitTypeCode}_${visitSequence}_${visitMedium}`
    getPrescriberSettings({ name, userId: userId || 0 }).then((res) => {
      setLoading(false)
      if (res.state === 'error') {
        return toast.error(res.error || 'Failed to fetch staff preferences')
      }
      form.setValue('duration', res.data?.[0]?.content ?? '')
    })
  }, [
    providerId,
    userId,
    selectedVisitType,
    visitSequence,
    visitMedium,
    visitTypes,
  ])

  useEffect(() => {
    if (!selectedVisitType) {
      if (options.length) setOptions([])
      return
    }
    const visitType = visitTypes.find(
      (type) => type.encouterType === selectedVisitType,
    )
    if (visitType?.visitDurations) {
      const durationOptions: SelectOptionType[] = visitType.visitDurations.map(
        (value) => ({
          label: `${value}`,
          value: `${value}`,
          disabled: false,
        }),
      )
      setOptions(durationOptions)
    }
  }, [selectedVisitType])

  return (
    <FormFieldContainer className="flex-1">
      <PermissionAlert
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={EDIT_DURATION}
      />
      <FormFieldLabel required>Duration</FormFieldLabel>
      <SelectInput
        field="duration"
        options={options}
        buttonClassName="h-6 w-full"
        disabled={!visitTime}
        loading={loading}
        onValueChange={(value) => {
          if (canEditDuration) {
            return form.setValue('duration', value)
          }
          setIsOpen(true)
        }}
      />
      <FormFieldError name="duration" />
    </FormFieldContainer>
  )
}

export { DurationDropdown }
