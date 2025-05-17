import { Flex } from '@radix-ui/themes'
import { type Row } from '@tanstack/react-table'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import type { AllergyDataResponse } from '../types'
import { RowActionDelete } from './row-action-delete'
import { RowActionEdit } from './row-action-edit'

interface ActionsCellProps {
  row: Row<AllergyDataResponse>
  scriptSureAppUrl: string
}

const ActionsCell = ({ row, scriptSureAppUrl }: ActionsCellProps) => {
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )

  return (
    <Flex gap="1">
      <RowActionEdit scriptSureAppUrl={scriptSureAppUrl} row={row} />
      {!isFeatureFlagEnabled && <RowActionDelete row={row} />}
    </Flex>
  )
}

export { ActionsCell }
