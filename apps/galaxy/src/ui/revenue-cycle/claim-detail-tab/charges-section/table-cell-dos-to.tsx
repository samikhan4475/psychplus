'use client'

import { I18nProvider } from 'react-aria-components'
import { DatePickerInput } from '@/components'

interface TableCellDosToProps {
  rowIndex: number
}

const TableCellDosTo: React.FC<TableCellDosToProps> = ({ rowIndex }) => {
  return (
    <I18nProvider locale="en-US">
      <DatePickerInput
        field={`claimServiceLines.${rowIndex}.dateOfServiceTo`}
        dateInputClass={'!border-none'}
      />
    </I18nProvider>
  )
}

export { TableCellDosTo }
