import { Box, Flex } from '@radix-ui/themes'
import { CardHeading } from '@/components'
import { PatientLookupForm } from './patient-lookup-form'
import { PatientLookupTable } from './patient-lookup-table'
import { PatientLookupTablePagination } from './patient-lookup-table-pagination'

const PatientLookupView = () => {
  return (
    <Flex gap="2" p="2" className="flex-1 overflow-auto">
      <Box className="shadow-2 min-w-[250px] overflow-auto bg-white">
        <PatientLookupForm />
      </Box>
      <Flex direction="column" className="shadow-2 flex-1 bg-white">
        <CardHeading title="Patient Lookup" />
        <Box className="flex-1 overflow-auto">
          <PatientLookupTable />
        </Box>
        <PatientLookupTablePagination />
      </Flex>
    </Flex>
  )
}

export { PatientLookupView }
