import { Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, GroupSelectSection } from '@/components'
import { TmsWidgetSchemaType } from '../../tms-widget-schema'
import DiscontinueBlock from './discontinue-block'
import FollowUpBlock from './follow-up-block'
import ModifyTreatmentPlanBlock from './modify-treatment-plan-bloack'
import ReferralBlock from './referral-block'

const BLOCK_ID = 'dischargePlan'

const BLOCK_OPTIONS = [
  {
    label: 'Continue with Current Protocol',
    value: 'continueWithCurrentProtocol',
  },
  {
    label: 'Modify Treatment Plan',
    value: 'modifyTreatmentPlan',
  },
  {
    label: 'Discontinue Treatment',
    value: 'discontinueTreatment',
  },
  {
    label: 'Referral',
    value: 'referral',
  },
  {
    label: 'Follow-up Assessment Screening',
    value: 'followupAssessmentScreening',
  },
]

const DischargePlanBlock = () => {
  const form = useFormContext<TmsWidgetSchemaType>()
  const dischargeBlock = form.watch('dischargePlan')
  return (
    <FormFieldContainer className="gap-2">
      <Text weight="medium">Discharge Plan</Text>
      <GroupSelectSection label="" field={BLOCK_ID} options={BLOCK_OPTIONS} />
      {dischargeBlock.map((dischargeBlockItem, index) => (
        <FormFieldContainer key={dischargeBlockItem + index} className="mt-2">
          {dischargeBlockItem === 'modifyTreatmentPlan' && (
            <ModifyTreatmentPlanBlock />
          )}
          {dischargeBlockItem === 'discontinueTreatment' && (
            <DiscontinueBlock />
          )}
          {dischargeBlockItem === 'referral' && <ReferralBlock />}
          {dischargeBlockItem === 'followupAssessmentScreening' && (
            <FollowUpBlock />
          )}
        </FormFieldContainer>
      ))}
    </FormFieldContainer>
  )
}

export { DischargePlanBlock }
