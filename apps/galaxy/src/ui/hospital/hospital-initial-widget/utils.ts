import { HospitalInitialPrefixes } from './constants'
import { HospitalInitialWidgetSchemaType } from './hospital-initial-widget-schema'

const createEmptyFormValues = (): HospitalInitialWidgetSchemaType => ({
  strengths: [],
  liabilities: [],
  needForLevelOfCare: [],
  shortTermGoals: [],
  precautions: [],
  dcPlan: [],
  strengthsOtherDetails: '',
  liabilitiesOtherDetails: '',
  stgOtherDetails: '',
  precautionsOtherDetails: '',
  dcplanOtherDetails: '',
})

export { createEmptyFormValues }
