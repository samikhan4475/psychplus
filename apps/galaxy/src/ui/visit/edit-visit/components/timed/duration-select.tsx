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
import { SelectOptionType } from '@/types'
import { isDirty } from '@/ui/schedule/utils'
import { getPrescriberSettings } from '@/ui/visit/client-actions'
import { SchemaType } from '../../schema'
import { useEditVisitStore } from '../../store'

const DurationSelect = () => {
  const form = useFormContext<SchemaType>()
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const { visitTypes } = useEditVisitStore()
  const [loading, setLoading] = useState<boolean>(false)
  const { dirtyFields } = form.formState
  const [selectedVisitType, provider, visitSequence, visitMedium] = useWatch({
    control: form.control,
    name: ['visitType', 'provider', 'visitSequence', 'visitMedium'],
  })

  useEffect(() => {
    if (
      !provider ||
      !selectedVisitType ||
      !visitSequence ||
      !visitMedium ||
      !isDirty(dirtyFields)
    )
      return
    const visitType = visitTypes.find(
      (type) => type.encouterType === selectedVisitType,
    )
    setLoading(true)
    const name = `${visitType?.visitTypeCode}_${visitSequence}_${visitMedium}`
    getPrescriberSettings({ userId: provider ? +provider : 0, name }).then(
      (res) => {
        setLoading(false)
        if (res.state === 'error') {
          return toast.error(res.error || 'Failed to fetch staff preferences')
        }
        form.setValue('duration', res.data?.[0]?.content ?? '')
      },
    )
  }, [provider, visitTypes, selectedVisitType, visitSequence, visitMedium])

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
          value: `${value}`,
          label: `${value}`,
          disabled: false,
        }),
      )
      setOptions(durationOptions)
    }
  }, [selectedVisitType])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Duration</FormFieldLabel>
      <SelectInput
        field="duration"
        options={options}
        buttonClassName="h-6 w-full"
        loading={loading}
      />
      <FormFieldError name="duration" />
    </FormFieldContainer>
  )
}

export { DurationSelect }
