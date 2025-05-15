import {
  COPING_STRATEGIES_OPTIONS,
  RESTRICTING_ACCESS_OPTIONS,
  WARNING_SIGNS_OPTIONS,
} from '../utils'
import { SafetyPlanningBlock } from './safety-planning-block'

const SafetyPlaningViewBlock = () => {
  return (
    <>
    <SafetyPlanningBlock
        title="Coping Strategies :"
        fieldId="copingStrategies"
        options={COPING_STRATEGIES_OPTIONS}
      />
      <SafetyPlanningBlock
        title="Restricting Access :"
        fieldId="restrictingAccess"
        options={RESTRICTING_ACCESS_OPTIONS}
      />
      <SafetyPlanningBlock
        title="Warning Signs :"
        fieldId="warningSigns"
        options={WARNING_SIGNS_OPTIONS}
      />
    </>
  )
}

export { SafetyPlaningViewBlock }
