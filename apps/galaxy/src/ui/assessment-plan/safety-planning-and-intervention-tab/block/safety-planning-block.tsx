import React, { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldError,
  GroupSelectOption,
  GroupSelectSection,
} from '@/components'
import { SafetyPlanningInterventionSchemaType } from '../safety-planning-intervention-schema'

interface SafetyPlanningBlockProps {
  title: string
  fieldId: keyof SafetyPlanningInterventionSchemaType
  options: GroupSelectOption<string>[]
}

const SafetyPlanningBlock = ({
  title,
  fieldId,
  options,
}: SafetyPlanningBlockProps) => {
  const form = useFormContext<SafetyPlanningInterventionSchemaType>()
  const {
    watch,
    clearErrors,
    formState: { errors },
  } = form

  const hasError = !!errors[fieldId]
  const safetyPlanningIntervention = watch('widgetContainerCheckboxField')

  useEffect(() => {
    if (!safetyPlanningIntervention) {
      clearErrors(fieldId)
    }
  }, [safetyPlanningIntervention, fieldId, clearErrors])

  return (
    <Flex>
      <GroupSelectSection
        label={title}
        field={fieldId}
        options={options}
        blockLabelProps={{ required: safetyPlanningIntervention === 'show' }}
        chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
      />
      <FormFieldError className="ml-2" name={fieldId} />
    </Flex>
  )
}

export { SafetyPlanningBlock }
