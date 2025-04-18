import { Flex } from '@radix-ui/themes'
import { PropsWithRow, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { ClinicSchedule } from '../types'

const ServiceCell = ({
  row: { original: clinicTime },
}: PropsWithRow<ClinicSchedule>) => {
  const groupServiceCodes = useCodesetCodes(CODESETS.GroupTherapyType)
  const serviceOffered = useCodesetCodes(CODESETS.ServicesOffered).find(
    (code) => code.value === clinicTime.serviceOffered,
  )
  const groupTherapy =
    clinicTime.therapyTypeCode &&
    groupServiceCodes.find((el) => el.value === clinicTime.therapyTypeCode)
      ?.display

  return (
    <Flex align="center" gapX="1">
      <TextCell className="min-w-52">
        {serviceOffered?.display ?? clinicTime.serviceOffered}
        {groupTherapy && `, ${groupTherapy}`}
      </TextCell>
    </Flex>
  )
}

export { ServiceCell }
