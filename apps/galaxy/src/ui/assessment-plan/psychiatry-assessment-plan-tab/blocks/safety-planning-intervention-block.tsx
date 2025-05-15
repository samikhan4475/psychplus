import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CheckboxInput } from '@/components'

interface SafetyPlanningInterventionBlockProps {
  isTcsiEnabled: boolean
}

const SafetyPlanningInterventionBlock = ({
  isTcsiEnabled,
}: SafetyPlanningInterventionBlockProps) => {
  const form = useFormContext()
  const safetyPlanningIntervention = form.watch('safetyPlanningIntervention')

  return (
    <CheckboxInput
      field={'safetyPlanningIntervention'}
      label="Safety Planning Intervention"
      checked={safetyPlanningIntervention || isTcsiEnabled}
      disabled={isTcsiEnabled}
    />
  )
}

export { SafetyPlanningInterventionBlock }
