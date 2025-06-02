import { UdsWidgetSchemaType } from './uds-widget-schema'

const DEFAULT_PURPOSE_OF_VISIT =
  'The patient presented to the office for a vital sign assessment and urine drug screening (UDS) as part of ongoing clinical monitoring. These assessments are conducted to identify any subtle changes or signs of deterioration in the patient’s condition. Vital signs and UDS results are carefully monitored, documented in the patient’s medical record, and reviewed to ensure patient safety and treatment efficacy.'
export const createEmptyFormValues = (
  isContainsUrineTest?: boolean,
): UdsWidgetSchemaType => ({
  purposeOfVisit: DEFAULT_PURPOSE_OF_VISIT,
  medicalNecessity: [],
  confirmatoryTesting: isContainsUrineTest ? 'yes' : 'no',
  confirmationReasons: [],
  result: 'intNegative',
  resultAction: 'intWillNotBe',
  udsOther: '',
})
