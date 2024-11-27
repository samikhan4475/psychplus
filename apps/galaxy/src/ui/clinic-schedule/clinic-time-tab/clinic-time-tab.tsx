import { Flex } from '@radix-ui/themes'
import { ClinicTimeHeader } from './clinic-time-header'
import { ClinicTimeFilterForm } from './clinic-time-filter-form'
import { ClinicTimeTable } from './clinic-time-table'

const ClinicTimeTab = () => {
  return (
    <Flex flexGrow="1" direction='column'>
      <ClinicTimeHeader />
      <ClinicTimeFilterForm />
      <ClinicTimeTable />
    </Flex>
  )
}

export { ClinicTimeTab }
