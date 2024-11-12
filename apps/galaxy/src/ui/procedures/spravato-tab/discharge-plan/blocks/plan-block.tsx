import {
  BlockLabel,
  FormFieldContainer,
  FormFieldError,
  GroupSelectSection,
} from '@/components'

const PLAN_SELECTION_OPTIONS = [
  {
    label: 'Continue with Current Protocol',
    value: 'Continue with Current Protocol',
  },
  {
    label: 'Continue with Maintenance',
    value: 'Continue with Maintenance',
  },
  {
    label: 'Discontinue Treatment',
    value: 'Discontinue Treatment',
  },
  {
    label: 'Referral',
    value: 'Referral',
  },
  {
    label: 'Follow up Assessment Screening',
    value: 'Follow up Assessment Screening',
  },
]

const PlanSelectionBlock = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <BlockLabel className="text-2 font-[600px]" required>
        Plan
      </BlockLabel>
      <GroupSelectSection
        field="plan"
        options={PLAN_SELECTION_OPTIONS}
        label=""
      />
      <FormFieldError name="plan" />
    </FormFieldContainer>
  )
}

export { PlanSelectionBlock }
