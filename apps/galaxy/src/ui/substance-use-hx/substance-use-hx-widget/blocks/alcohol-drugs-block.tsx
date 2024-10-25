import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  CheckboxCell,
  RadioSelectSection,
  SingleSelectChip,
  TextInput,
  YesNoSelect,
} from '@/components'
import { type SubstanceUseHxWidgetSchemaType } from '../substance-use-hx-schema'
import {
  ALCOHOL_ID,
  ALCOHOL_LABEL,
  DRUG_DETAILS_OPTIONS,
  DRUGS_DESCRIPTION,
  DRUGS_ID,
  DRUGS_LABEL,
  QUESTIONNAIRE_DESCRIPTION,
  QUESTIONNAIRE_ID,
  QUESTIONNAIRE_LABEL,
} from './constants'
import { ReferralTreatmentBlock } from './referral-treatement-block'
import { AlcoholDrugsTab } from './tabs'

const ALCOHOL_DESCRIPTION = (
  <span>
    Do you drink{' '}
    <span className="rounded-3 bg-gray-3 px-1.5 py-[1px]">&gt;4</span> alcoholic
    drinks/day or{' '}
    <span className="rounded-3 bg-gray-3 px-1.5 py-[1px]">&gt;14</span>{' '}
    alcoholic drinks/week?
  </span>
)

const AlcoholDrugsBlock = () => {
  const form = useFormContext<SubstanceUseHxWidgetSchemaType>()
  const briefIntervention = form.watch('briefIntervention') ? true : false
  const handleCheckedChange = (checked: boolean | 'indeterminate') => {
    form.setValue('briefIntervention', checked === true)
  }
  return (
    <Flex
      direction="column"
      gap="2"
      p="2"
      className="rounded-3 border border-gray-7"
    >
      <Text size="2" weight="medium">
        Screening for drug/alcohol use:
      </Text>
      <YesNoSelect
        label={ALCOHOL_LABEL}
        description={ALCOHOL_DESCRIPTION}
        field={ALCOHOL_ID}
        isNoFirst
      />
      <YesNoSelect
        label={DRUGS_LABEL}
        description={DRUGS_DESCRIPTION}
        field={DRUGS_ID}
        isNoFirst
      />
      {form.watch('drugs') === 'yes' && (
        <Flex direction="column" gap="2">
          <Flex align="center" gap="2" wrap="wrap">
            {DRUG_DETAILS_OPTIONS.map((option) => (
              <SingleSelectChip
                key={option.field}
                label={option.label}
                field={option.field}
                details={{
                  type: 'text',
                  label: 'Details',
                  field: option.detailsField,
                }}
              />
            ))}
          </Flex>
        </Flex>
      )}
      <YesNoSelect
        label={QUESTIONNAIRE_LABEL}
        description={QUESTIONNAIRE_DESCRIPTION}
        field={QUESTIONNAIRE_ID}
        isNoFirst
      />
      {form.watch('questionnaire') === 'yes' && (
        <>
          {form.watch('alcohol') === 'yes' && <AlcoholDrugsTab label="Audit" />}
          {form.watch('drugs') === 'yes' && <AlcoholDrugsTab label="Dast" />}
        </>
      )}
      {(form.watch('alcohol') === 'yes' || form.watch('drugs') === 'yes') && (
        <Flex align="center">
          <Text size="1" weight="medium" className="mr-2">
            Brief Intervention
          </Text>
          <CheckboxCell
            checked={briefIntervention}
            onCheckedChange={handleCheckedChange}
          />
          <Text
            size="1"
            className="ml-1 w-[50%] rounded-2 border border-gray-5 p-1"
          >
            Discussed with patient reasons for use of substance, health risk
            associated with use, how ready and confident the patient is about
            quitting, gave adviceand discussed the following goal
          </Text>
        </Flex>
      )}
      <ReferralTreatmentBlock />
      <RadioSelectSection
        label="Discussed alcohol/substance use cessation for"
        field="alcoholSubstanceCessationDiscussionDuration"
        options={[
          { label: '≥ 15 mins', value: '>=15m' },
          { label: '≥ 31 mins', value: '>=31m' },
        ]}
      />
      <TextInput label="Other" field="otherAlcoholDrugs" />
    </Flex>
  )
}

export { AlcoholDrugsBlock }
