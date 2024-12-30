import { Flex } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { CodesetSelect, FormFieldError, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { LabResult } from '@/types'
import { useStore } from '../store'

interface FlagStatusCellProps {
  row: Row<LabResult>
}

const UnitDropdown = ({ row }: FlagStatusCellProps) => {
  const { editAbleLabResults } = useStore()
  const isAddingOrEditing = editAbleLabResults?.id === row.original.id
  return isAddingOrEditing ? (
    <Flex direction="column" className="w-full">
      <CodesetSelect
        name={`labResults.resultValueUnit`}
        codeset={CODESETS.Unit}
        size="1"
      />
      <FormFieldError name="labResults.resultValueUnit" />
    </Flex>
  ) : (
    <TextCell>{row.original.resultValueUnit}</TextCell>
  )
}

export { UnitDropdown }
