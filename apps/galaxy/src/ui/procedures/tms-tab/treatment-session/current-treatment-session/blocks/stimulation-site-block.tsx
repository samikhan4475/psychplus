import { Flex } from '@radix-ui/themes'
import { BlockLabel, CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'

const StimulationSite = () => {
  return (
    <Flex direction="row" gap="1" align="center">
      <BlockLabel required>Stimulation Site</BlockLabel>
      <CodesetSelect
        name="stimulationSite"
        codeset={CODESETS.TMSStimulationSite}
        size="1"
        className="max-w-72"
      />
    </Flex>
  )
}

export { StimulationSite }
