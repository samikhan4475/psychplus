import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DateInput, RadioSelectSection, YesNoSelect } from '@/components'
import { type SubstanceUseHxWidgetSchemaType } from '../substance-use-hx-schema'
import { SmokingCessationBlock } from './smoking-cessation-block'

const TOBACCO_ID = 'tobacco'
const TOBACCO_LABEL = 'Tobacco'
const TOBACCO_CHEW_SMOKE_ID = 'tobaccoChewSmoke'
const TOBACCO_CHEW_SMOKE_LABEL = 'Chew/Smoke'

const TOBACCO_CHEW_SMOKE_OPTIONS = [
  { label: 'Chew', value: 'chew' },
  { label: 'Smoke', value: 'smoke' },
]

const TobaccoBlock = () => {
  const form = useFormContext<SubstanceUseHxWidgetSchemaType>()
  return (
    <Flex
      direction="column"
      gap="2"
      p="2"
      className="rounded-3 border border-gray-7"
    >
      <Flex gap="3" align="center" wrap="wrap">
        <YesNoSelect label={TOBACCO_LABEL} field={TOBACCO_ID} />
        {form.watch('tobacco') === 'yes' && (
          <>
            <RadioSelectSection
              label={TOBACCO_CHEW_SMOKE_LABEL}
              field={TOBACCO_CHEW_SMOKE_ID}
              options={TOBACCO_CHEW_SMOKE_OPTIONS}
            />
            <DateInput label="Start Date" field="tobaccoStartDate" />
            <DateInput label="End Date" field="tobaccoEndDate" />
            <SmokingCessationBlock />
          </>
        )}
      </Flex>
    </Flex>
  )
}

export { TobaccoBlock }
