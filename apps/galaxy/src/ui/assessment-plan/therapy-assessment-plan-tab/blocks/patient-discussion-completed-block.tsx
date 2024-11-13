import { useFormContext } from 'react-hook-form'
import { YesNoSelect } from '@/components'
import { useStore } from '../../store'
import { TherapyAssessmentPlanTabSchemaType } from '../therapy-assessment-plan-tab-schema'

const BLOCK_ID = 'patientDiscussionCompleted'
const BLOCK_LABEL =
  'Treatment/Therapy options, labs, medications risks/SE, safety plan, & emergency procedures discussed with the patient'

const BLOCK_OPTIONS = [
  {
    label: 'Yes',
    value: 'yes',
  },
  {
    label: 'No',
    value: 'no',
  },
]

const PatientDiscussionCompletedBlock = () => {
  const form = useFormContext<TherapyAssessmentPlanTabSchemaType>()

  const { setErrorMessage, setIsErrorAlertOpen } = useStore((state) => ({
    setErrorMessage: state.setErrorMessage,
    setIsErrorAlertOpen: state.setIsErrorAlertOpen,
  }))

  const handleNoOptionClick = () => {
    setIsErrorAlertOpen(true)
    setErrorMessage(
      'unable to change, please contact your supervisor for further assistance',
    )
    form.setValue(BLOCK_ID, 'yes', { shouldValidate: true })
  }
  return (
    <YesNoSelect
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      label={BLOCK_LABEL}
      onChange={(value) => {
        if (value === 'no') {
          handleNoOptionClick()
        } else {
          form.setValue(BLOCK_ID, value as 'yes' | 'no', {
            shouldValidate: true,
          })
        }
      }}
    />
  )
}

export { PatientDiscussionCompletedBlock }
