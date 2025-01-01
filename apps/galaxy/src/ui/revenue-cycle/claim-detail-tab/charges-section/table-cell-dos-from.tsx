'use client'

import { I18nProvider } from 'react-aria-components'
import { DatePickerInput } from '@/components'

interface TableCellDosFromProps {
  rowIndex: number
}

const TableCellDosFrom: React.FC<TableCellDosFromProps> = ({ rowIndex }) => {
  return (
    <I18nProvider locale="en-US">
      <DatePickerInput
        field={`claimServiceLines.${rowIndex}.dateOfServiceFrom`}
        dateInputClass={'!border-none'}
      />{' '}
    </I18nProvider>
  )
}

export { TableCellDosFrom }
