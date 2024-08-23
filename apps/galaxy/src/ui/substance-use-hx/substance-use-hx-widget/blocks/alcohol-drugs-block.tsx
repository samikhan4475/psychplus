import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SingleSelectChip, TextInput, YesNoSelect } from '@/components'
import { type SubstanceUseHxWidgetSchemaType } from '../substance-use-hx-schema'

const ALCOHOL_ID = 'alcohol'
const ALCOHOL_LABEL = 'Alcohol'
const ALCOHOL_DESCRIPTION = (
  <span>
    Do you drink{' '}
    <span className="rounded-3 bg-gray-3 px-1.5 py-[1px]">&gt;4</span> alcoholic
    drinks/day or{' '}
    <span className="rounded-3 bg-gray-3 px-1.5 py-[1px]">&gt;14</span>{' '}
    alcoholic drinks/week?
  </span>
)

const DRUGS_ID = 'drugs'
const DRUGS_LABEL = 'Drugs'
const DRUGS_DESCRIPTION =
  'In the past 6 months, have you used a recreational drug or used a prescription medication for nonmedical reasons?'

const DRUG_OPTIONS = [
  {
    label: 'Opioids',
    field: 'opioids',
    detailsField: 'opioidsDetails',
  },
  {
    label: 'Sedative',
    field: 'sedative',
    detailsField: 'sedativeDetails',
  },
  {
    label: 'Cocaine',
    field: 'cocaine',
    detailsField: 'cocaineDetails',
  },
  {
    label: 'Amphetamine',
    field: 'amphetamine',
    detailsField: 'amphetamineDetails',
  },
  {
    label: 'PCP',
    field: 'pcp',
    detailsField: 'pcpDetails',
  },
  {
    label: 'Inhalants',
    field: 'inhalants',
    detailsField: 'inhalantsDetails',
  },
]

const AlcoholDrugsBlock = () => {
  const form = useFormContext<SubstanceUseHxWidgetSchemaType>()
  return (
    <Flex
      direction="column"
      gap="2"
      p="2"
      className="rounded-3 border border-gray-7"
    >
      <YesNoSelect
        label={ALCOHOL_LABEL}
        description={ALCOHOL_DESCRIPTION}
        field={ALCOHOL_ID}
      />
      <YesNoSelect
        label={DRUGS_LABEL}
        description={DRUGS_DESCRIPTION}
        field={DRUGS_ID}
      />
      {form.watch('drugs') === 'yes' && (
        <Flex direction="column" gap="2">
          <Flex align="center" gap="2" wrap="wrap">
            {DRUG_OPTIONS.map((option) => (
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
          <TextInput label="Questionnaire" field="questionnaire" />
        </Flex>
      )}
    </Flex>
  )
}

export { AlcoholDrugsBlock }
