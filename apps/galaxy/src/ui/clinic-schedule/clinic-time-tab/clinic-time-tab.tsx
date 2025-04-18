import { Flex } from '@radix-ui/themes'
import { ClinicTimeFilterForm } from './clinic-time-filter-form'
import { ClinicTimeHeader } from './clinic-time-header'
import { ClinicTimeTableLoader } from './clinic-time-table-loader'
import { ClinicTimeTablePagination } from './clinic-time-table-pagination'
import { PropsWithStaffId } from './types'

const ClinicTimeTab = ({ staffId }: PropsWithStaffId) => {
  return (
    <Flex flexGrow="1" direction="column">
      <ClinicTimeHeader staffId={staffId} />
      <ClinicTimeFilterForm staffId={staffId} />
      <ClinicTimeTableLoader staffId={staffId} />
      <ClinicTimeTablePagination />
    </Flex>
  )
}

export { ClinicTimeTab }
