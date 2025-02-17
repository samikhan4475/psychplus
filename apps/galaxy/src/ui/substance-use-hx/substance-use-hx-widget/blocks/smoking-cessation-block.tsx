import { Box, Flex, Text } from '@radix-ui/themes'
import { RadioSelectSection, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { mapCodesetToOptions } from '@/utils'
import { useFormContext } from 'react-hook-form'
import { SubstanceUseHxWidgetSchemaType } from '../substance-use-hx-schema'

const SmokingCessationBlock = () => {
  const COUNSELING_OPTIONS = mapCodesetToOptions(
    useCodesetCodes(CODESETS.CounsellingOptions),
  )

  const SMOKING_CESSATION_OPTIONS = mapCodesetToOptions(
    useCodesetCodes(CODESETS.TobaccoTreatment),
  )
  const form = useFormContext<SubstanceUseHxWidgetSchemaType>()
  const errors = form.formState.errors;
  return (
    <Flex align="start" gap="2" wrap="wrap">
      <Text size="1" className="flex h-[var(--chip-height)] items-center">
        I have reviewed the risks of continued smoking with the patient and
        offered
      </Text>
      <Box className="ml-[-2px]">
        <SelectInput
          label="Smoking Cessation Options"
          field="smokingCessationOption"
          options={SMOKING_CESSATION_OPTIONS}
        />
        {errors.smokingCessationOption && (
          <Text className="pl-1 text-[12px] text-tomato-11">{errors.smokingCessationOption.message}</Text>
        )}
      </Box>
      <Text size="1" className="flex h-[var(--chip-height)] items-center">
        and
      </Text>
      <Box className="ml-[-2px]">
        <SelectInput
          label="Counseling Options"
          field="counselingOption"
          options={COUNSELING_OPTIONS}
        />
        {errors.counselingOption && (
          <Text className="pl-1 text-[12px] text-tomato-11">{errors.counselingOption.message}</Text>
        )}
      </Box>
      <Flex align="start" direction="column" wrap="wrap" gap="1">
        <RadioSelectSection
          label="Discussed smoking cessation for"
          field="smokingCessationDiscussionDuration"
          options={[
            { label: '≥ 3 mins', value: '≥ 3 mins' },
            { label: '≥ 11 mins', value: '≥ 11 mins' },
          ]}
        />
        {errors.smokingCessationDiscussionDuration && (
          <Text className="pl-1 text-[12px] text-tomato-11">
            {errors.smokingCessationDiscussionDuration.message}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}

export { SmokingCessationBlock }
