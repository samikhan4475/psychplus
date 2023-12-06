'use client'

import { Avatar, Card, Flex, Heading } from '@radix-ui/themes'
import LabelAndValue from './components/LabelAndValue'
import { useStore } from './store'

const PatientInformationWidgetClient = () => {
  const data = useStore((state) => state.getPatientProfileInformation())
  return (
    <>
      <Flex gap={'2'}>
        <Card className="mt-2 w-3/6">
          <Heading size={'3'} className="mb-3">
            Patient Info
          </Heading>
          <Flex gap={'6'}>
            <Avatar
              size="8"
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
              fallback="A"
            />
            <Flex wrap={'wrap'} gap={'6'}>
              <LabelAndValue
                label="First Name"
                value={data.legalName.firstName}
              />
              <LabelAndValue
                label="Last Name"
                value={data.legalName.lastName}
              />
              <LabelAndValue
                label="Preferred Name"
                value={data.legalName.firstName}
              />
              <LabelAndValue label="MRN Name" value={data.id} />
            </Flex>
          </Flex>
        </Card>

        <Card className="mt-2  w-3/6">
          <Heading size={'3'} className="mb-3">
            Address
          </Heading>
          <Flex wrap={'wrap'} gap={'8'}>
            {data.contactDetails.addresses.map((address) => (
              <>
                <LabelAndValue label="Type" value={address.type} />
                <LabelAndValue label="Street" value={address.street1} />
                <LabelAndValue label="City" value={address.city} />
                <LabelAndValue label="State" value={address.state} />
                <LabelAndValue label="Postal Code" value={address.postalCode} />
              </>
            ))}
          </Flex>
        </Card>
      </Flex>
      <Flex>
        <Card className="mt-2 w-full">
          <Heading size={'3'} className="mb-3">
            Gender
          </Heading>
          <Flex wrap={'wrap'} gap={'6'}>
            <LabelAndValue label="Gender" value={data.gender} />
          </Flex>
        </Card>
      </Flex>
    </>
  )
}

export { PatientInformationWidgetClient }
