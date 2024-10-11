'use client'

import { Flex, Text } from '@radix-ui/themes'
import { FormFieldLabel } from '@/components'
import {
  CloseIcon,
  NotRequestedIcon,
  QuestionIcon,
  TickIcon,
} from '@/components/icons'

interface PatientPolicyStatusProps {
  patientPolicyAStatus?: string
}
const PatientPolicyStatus = ({
  patientPolicyAStatus,
}: PatientPolicyStatusProps) => {
  return (
    <FormFieldLabel>
      <Flex gap="1" align="center">
        {renderStatusIcon(patientPolicyAStatus)}
        <Text size="1" className="text-pp-black-3" weight="medium">
          Patient Policy A
        </Text>
      </Flex>
    </FormFieldLabel>
  )
}

const renderStatusIcon = (status: string | undefined) => {
  switch (status) {
    case 'Unverifiable':
      return <CloseIcon width={20} height={20} />
    case 'Pending':
      return <QuestionIcon width={20} height={20} />
    case 'Verified':
      return <TickIcon width={20} height={20} rectRx="6" />
    default:
      return <NotRequestedIcon width={20} height={20} />
  }
}
export { PatientPolicyStatus }
