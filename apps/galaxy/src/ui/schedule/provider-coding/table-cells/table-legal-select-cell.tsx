import { CodesetSelectCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { MergedRecord } from '../types'

const LegalSelectCell = ({
  row: { original: appointment },
}: PropsWithRow<MergedRecord>) => {
  return (
    <CodesetSelectCell
      codeset={CODESETS.LegalStatus}
      value={appointment.legalStatus}
    />
  )
}

export { LegalSelectCell }
