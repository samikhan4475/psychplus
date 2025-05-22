import { PolicyType } from '@psychplus-v2/types'
import { Container, Flex } from '@radix-ui/themes'
import { BookingCancelIcon } from '@/components-v2'
import { AppointmentHeader } from '@/events/appointments/confirmations/ui/appointment-header'
import { getPatientsConsentsStatus } from '../api'
import { PatientsConsents } from './patients-consents'

interface PatientsConsentsViewProps {
  policyType: PolicyType
  referenceId: string
}

const PatientsConsentsView = async ({
  policyType,
  referenceId,
}: PatientsConsentsViewProps) => {
  const response = await getPatientsConsentsStatus({
    policyType,
    referenceId,
  })

  return (
    <Flex direction="column" className="w-full" align="center">
      <Container className="w-full px-6 xs:w-[80%] sm:w-[60%] md:w-[50%] lg:w-[35%] xl:w-[35%]">
        {response.state === 'success' ? (
          <AppointmentHeader
            icon={<BookingCancelIcon />}
            title="Your policy is already signed!"
            textClass="text-pp-gray-1"
          />
        ) : (
          <PatientsConsents policyType={policyType} referenceId={referenceId} />
        )}
      </Container>
    </Flex>
  )
}

export { PatientsConsentsView }
