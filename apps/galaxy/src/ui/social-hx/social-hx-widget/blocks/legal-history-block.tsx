import { YesNoSelect } from '@/components'

const BLOCK_ID = 'legalHistory'

const BLOCK_TITLE = 'Legal History'

const LegalHistoryBlock = () => {
  return <YesNoSelect label={BLOCK_TITLE} field={BLOCK_ID} />
}

export { LegalHistoryBlock }
