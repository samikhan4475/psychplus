import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { RadioSelectSection, TextInput, YesNoSelect } from '@/components'
import { type SubstanceUseHxWidgetSchemaType } from '../substance-use-hx-schema'
import {
  SMOKE_PACKS_ID,
  SMOKE_PACKS_LABEL,
  SMOKE_PACKS_OPTIONS,
  TOBACCO_CHEW_SMOKE_ID,
  TOBACCO_CHEW_SMOKE_OPTIONS,
  TOBACCO_ID,
  TOBACCO_LABEL,
} from './constants'
import { SmokingCessationBlock } from './smoking-cessation-block'

const TobaccoBlock = () => {
  const form = useFormContext<SubstanceUseHxWidgetSchemaType>()
  return (
    <Flex
      direction="column"
      gap="2"
      p="2"
      className="rounded-3 border border-gray-7"
      mt="2"
    >
      <Flex gap="3" align="center" wrap="wrap">
        <YesNoSelect label={TOBACCO_LABEL} field={TOBACCO_ID} isNoFirst />
        {form.watch('tobacco') === 'yes' && (
          <>
            <RadioSelectSection
              field={TOBACCO_CHEW_SMOKE_ID}
              options={TOBACCO_CHEW_SMOKE_OPTIONS}
            />
            {form.watch('tobaccoChewSmoke') === 'smoke' && (
              <RadioSelectSection
                label={SMOKE_PACKS_LABEL}
                field={SMOKE_PACKS_ID}
                options={SMOKE_PACKS_OPTIONS}
              />
            )}
            <SmokingCessationBlock />
            <TextInput label="Other" field="otherTobacco" />
          </>
        )}
      </Flex>
    </Flex>
  )
}

export { TobaccoBlock }
