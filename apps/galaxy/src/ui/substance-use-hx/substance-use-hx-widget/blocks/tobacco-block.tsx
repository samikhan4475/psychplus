import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { RadioSelectSection, YesNoSelect } from '@/components'
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
import { TobaccoOtherBlock } from './tobacco-other-block'
import { Text } from '@radix-ui/themes/dist/cjs/components/callout.js'

const TobaccoBlock = () => {
  const form = useFormContext<SubstanceUseHxWidgetSchemaType>()
  const errors = form.formState.errors;

  return (
    <Flex
      direction="column"
      gap="2"
      p="2"
      className="rounded-3 border border-gray-7"
      mt="2"
    >
      <Flex gap="3" align="start" wrap="wrap">
        <YesNoSelect label={TOBACCO_LABEL} field={TOBACCO_ID} isNoFirst />
        {form.watch('tobacco') === 'yes' && (
          <>
            <Flex align="start" wrap="wrap" direction="column" gap="1">
              <RadioSelectSection
                field={TOBACCO_CHEW_SMOKE_ID}
                options={TOBACCO_CHEW_SMOKE_OPTIONS}
              />
              {errors.tobaccoChewSmoke && (
                <Text className="pl-1 text-[12px] text-tomato-11">{errors.tobaccoChewSmoke.message}</Text>
              )}
            </Flex>
            {form.watch('tobaccoChewSmoke') === 'smoke' && (
              <Flex align="start" wrap="wrap" direction="column" gap="1">
                <RadioSelectSection
                  label={SMOKE_PACKS_LABEL}
                  field={SMOKE_PACKS_ID}
                  options={SMOKE_PACKS_OPTIONS}
                />
                {errors.smokePacks && (
                  <Text className="pl-1 text-[12px] text-tomato-11">{errors.smokePacks.message}</Text>
                )}
              </Flex>
            )}
            <SmokingCessationBlock />
            <TobaccoOtherBlock />
          </>
        )}
      </Flex>
    </Flex>
  )
}

export { TobaccoBlock }
