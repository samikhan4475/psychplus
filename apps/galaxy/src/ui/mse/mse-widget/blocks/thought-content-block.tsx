import { Box, Flex } from '@radix-ui/themes'
import { BlockLabel, GroupSelectSection } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { cn, mapCodesetToOptions } from '@/utils'
import { ERROR_ID } from '../constants'
import { MseGroupDetailSection } from '../history/mse-details/mse-group-detail-section'
import { type MseWidgetSchemaType } from '../mse-widget-schema'
import { GroupSelectOption } from '../types'
import { DelusionHallucinationSection } from './delusion-hallucination-section'
import { SiHiSection } from './si-hi-section'

const THOUGHT_CONTENT_OTHER_BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'Other',
    value: 'tcOther',
    details: {
      type: 'text',
      field: 'tcOtherDetails',
      maxLength: 500,
    },
  },
]

const ThoughtContentBlock = ({ result }: { result?: MseWidgetSchemaType }) => {
  const HALLUCINATIONS_OPTIONS = mapCodesetToOptions(
    useCodesetCodes(CODESETS.HallucinationType),
  )

  const DELUSION_OPTIONS = mapCodesetToOptions(
    useCodesetCodes(CODESETS.DelusionType),
  )

  return (
    <Flex direction="row" gap="2" className={cn(result && 'mt-3')}>
      <Box>
        <BlockLabel>Thought Content</BlockLabel>
      </Box>

      <Flex direction={'column'} align="start" gap="2" wrap="wrap">
        <SiHiSection result={result} label={'SI'} field={'tcsiYesNo'} />
        <SiHiSection result={result} label="HI" field="tchiYesNo" />

        <Flex align="center" gap="2" wrap="wrap">
          <DelusionHallucinationSection
            result={result}
            label={'Delusions'}
            yesNoField={'tcDelusionsYesNo'}
            multiSelectField={'schizophreniaDelusionValues'}
            multiSelectOptions={DELUSION_OPTIONS}
          />
          <DelusionHallucinationSection
            result={result}
            label={'Hallucinations'}
            yesNoField={'tcHallucinationsYesNo'}
            multiSelectField={'schizophreniaHallucinationsValues'}
            multiSelectOptions={HALLUCINATIONS_OPTIONS}
          />
          <>
            {result ? (
              <MseGroupDetailSection
                field="thoughtContentOther"
                options={THOUGHT_CONTENT_OTHER_BLOCK_OPTIONS}
                result={result}
              />
            ) : (
              <GroupSelectSection
                field="thoughtContentOther"
                options={THOUGHT_CONTENT_OTHER_BLOCK_OPTIONS}
                errorField={ERROR_ID}
              />
            )}
          </>
        </Flex>
      </Flex>
    </Flex>
  )
}

export { ThoughtContentBlock }
