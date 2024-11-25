import { Box, Flex } from '@radix-ui/themes'
import { BlockLabel, GroupSelectSection } from '@/components'
import { cn } from '@/utils'
import { MseGroupDetailSection } from '../history/mse-details/mse-group-detail-section'
import { type MseWidgetSchemaType } from '../mse-widget-schema'
import { GroupSelectOption } from '../types'
import { DelusionHallucinationSection } from './delusion-hallucination-section'
import { SiHiSection } from './si-hi-section'

const DELUSION_OPTIONS = [
  { label: 'Grandiose', value: 'sdGrandiose' },
  { label: 'of reference', value: 'sdOfReference' },
  { label: 'Erotomania', value: 'sdErotomania' },
  { label: 'Persecutory', value: 'sdPersecutory' },
  { label: 'Jealous', value: 'sdJealous' },
  { label: 'Bizarre', value: 'sdBizarre' },
  { label: 'Mixed', value: 'sdMixed' },
  { label: 'Nihilistic', value: 'sdNihilistic' },
  { label: 'Thought broadcasting', value: 'sdThoughtBroadcasting' },
  { label: 'Thought Insertion', value: 'sdThughtInsertion' },
  { label: 'Guilt', value: 'sdGuilt' },
  { label: 'Persecution', value: 'sdPersecution' },
  { label: 'Unspecified', value: 'sdUnspecified' },
  { label: 'Infidelity', value: 'sdInfidelity' },
  { label: 'misidentification syndrome', value: 'sdMisidentificationSyndrome' },
]

const HALLUCINATIONS_OPTIONS = [
  { label: 'Auditory', value: 'shAuditory' },
  { label: 'Visual', value: 'shVisual' },
  { label: 'Olfactory', value: 'shOlfactory' },
  { label: 'Tactile', value: 'shTactile' },
  { label: 'Gustatory', value: 'shGustatory' },
  { label: 'Somatic', value: 'shSomatic' },
]

const THOUGHT_CONTENT_OTHER_BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'Other',
    value: 'tcOther',
    details: {
      type: 'text',
      field: 'tcOtherDetails',
    },
  },
]

const ThoughtContentBlock = ({ result }: { result?: MseWidgetSchemaType }) => {
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
              />
            )}
          </>
        </Flex>
      </Flex>
    </Flex>
  )
}

export { ThoughtContentBlock }
