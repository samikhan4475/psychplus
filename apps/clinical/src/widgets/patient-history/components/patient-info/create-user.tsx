import { Flex, Heading, Text } from '@radix-ui/themes'
import { Checkbox } from '@psychplus/ui/checkbox'
import { usePatientHistoryContext } from '../../context'
import { LabelledText } from './text-and-label'

const CreateUser = () => {
  const { profileHistory } = usePatientHistoryContext()
  const contactNumber =
    profileHistory?.contactDetails?.phoneNumbers?.find(
      (number) => number.type === 'Contact',
    )?.number ?? ''

  return (
    <Flex direction="column">
      <Heading size="3" className="pb-1 pl-2 pt-2">
        Create User
      </Heading>
      <Flex
        wrap="wrap"
        className="justify-between gap-x-4 gap-y-3.5 bg-[#FFFF] p-2"
      >
        <LabelledText
          required
          value={profileHistory?.legalName?.firstName}
          label="First Name"
        />
        <LabelledText
          value={profileHistory?.legalName?.middleName ?? ''}
          label="Middle Name"
        />

        <LabelledText
          value={profileHistory?.legalName?.lastName ?? ''}
          label="Last Name"
          required
        />
        <LabelledText
          value={profileHistory?.birthdate}
          label="Date of Birth"
          required
        />
        <LabelledText value={contactNumber} label="Phone Number" required />
        <LabelledText
          value={profileHistory?.contactDetails?.email}
          label="Email"
          required
        />
        <LabelledText
          value={profileHistory?.hasGuardian ? 'Yes' : 'No'}
          label="Guardian (Do you have a Parent/Guardian?)"
          required
        />
        {profileHistory.hasGuardian && (
          <>
            <LabelledText
              value={profileHistory?.guardian?.name?.firstName ?? ''}
              label="Guardian First Name"
              required
            />
            <LabelledText
              value={profileHistory?.guardian?.name?.lastName ?? ''}
              label="Guardian Last Name"
              required
            />
          </>
        )}
        <Flex gap="2" className="flex-1">
          <Checkbox defaultChecked={true} disabled />
          <Text className="text-[12px] font-[500]">Patient Policy A</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CreateUser
