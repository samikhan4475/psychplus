'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore as zustandUseStore } from 'zustand'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { useStore } from '../store'
import { getInitialValues } from '../utils'
import { ExperienceSchemaType } from './schema'

const ClearButton = () => {
  const form = useFormContext<ExperienceSchemaType>()

  const store = useStore()
  const { getExperiences, page } = zustandUseStore(store, (state) => ({
    getExperiences: state.getExperiences,
    page: state.page,
  }))

  const handleResetForm = () => {
    const initialValues = getInitialValues()
    getExperiences(
      sanitizeFormData({
        ...initialValues,
        dateOfBirth: initialValues.dateOfBirth?.toString(),
        fromDateTime: formatDateToISOString(initialValues.fromDateTime) ?? '',
        toDateTime: formatDateToISOString(initialValues.toDateTime, true) ?? '',
      }),
      page,
      true,
    )
    form.reset({ ...getInitialValues() })
  }
  return (
    <Button
      size="1"
      variant="outline"
      color="gray"
      type="button"
      className="text-black disabled:text-gray-5"
      onClick={handleResetForm}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
