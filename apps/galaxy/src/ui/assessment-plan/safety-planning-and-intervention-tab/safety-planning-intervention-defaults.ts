import { SafetyPlanningInterventionSchemaType } from './safety-planning-intervention-schema'

export const createEmptyFormValues =
  (): SafetyPlanningInterventionSchemaType => ({
    widgetContainerCheckboxField: undefined,
    copingStrategies: [],
    restrictingAccess: [],
    warningSigns: [],
  })
