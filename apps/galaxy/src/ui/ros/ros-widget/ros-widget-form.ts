import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ERROR_ID } from './constant'
import {
  createRosWidgetSchema,
  type RosWidgetSchemaType,
} from './ros-widget-schema'

const useRosWidgetForm = (
  initialValue: RosWidgetSchemaType,
  visitType: string,
) => {
  const form = useForm<RosWidgetSchemaType>({
    resolver: zodResolver(createRosWidgetSchema(visitType)),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
    values: initialValue,
  })
  const { watch, clearErrors, setError } = form

  const selectedSections = watch([
    'constitutional',
    'entMouth',
    'eyes',
    'cardiovascular',
    'respiratory',
    'gastrointestinal',
    'genitourinary',
    'skin',
    'musculoskeletal',
    'neuro',
  ])
  const selectedCount = selectedSections.filter(
    (section) => section.length > 0,
  ).length

  React.useEffect(() => {
    if (selectedCount >= 3) {
      clearErrors(ERROR_ID)
    }
  }, [selectedCount, clearErrors, setError])
  return form
}

export { useRosWidgetForm }
