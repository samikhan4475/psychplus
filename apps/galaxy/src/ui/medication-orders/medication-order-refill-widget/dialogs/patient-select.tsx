import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn, formatDateOfBirth, getAgeFromDate, getCalendarDate, getPatientDOB } from '@/utils'
import { UpdateMedicationSchema } from './schema'

const PatientSelect = () => {
  const form = useFormContext<UpdateMedicationSchema>()
  const patientLastName = form.watch('patientLastName')
  const patientFirstName = form.watch('patientFirstName')
  const patientDateOfBirth = form.watch('patientDateOfBirth')
  const patientGender = form.watch('patientGender')

  const patientName = `${patientFirstName} ${patientLastName}`
  return (
    <Flex className="bg-pp-bg-table-label rounded-[5px] p-2">
      <Flex gap="1" className="whitespace-nowrap">
        <Text className={cn('text-[11.5px]')}>
          {patientName} ,{formatDateOfBirth(patientDateOfBirth)}
          {` | ${getAgeFromDate(
            getCalendarDate(patientDateOfBirth),
          )} yo ${patientGender?.charAt(0)}`}
        </Text>
      </Flex>
    </Flex>
  )
}

export { PatientSelect }
