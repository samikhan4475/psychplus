'use client'

import { Flex } from '@radix-ui/themes'
import { DetailBox } from '../../shared'

const PatientInfoAccordian = () => {
  return (
    <Flex gap="4" width="100%" className="bg-white p-2">
      <DetailBox
        title="First Name"
        content="John"
        className="!text-1 !font-medium"
        required
      />
      <DetailBox
        title="Middle Name"
        content="John"
        className="!text-1 !font-medium"
        required
      />
      <DetailBox
        title="Last Name"
        content="John"
        className="!text-1 !font-medium"
        required
      />
      <DetailBox
        title=" Date of Birth"
        content="12/11/1994"
        className="!text-1 !font-medium"
        required
      />
      <DetailBox
        title="Phone Number"
        content="362728282828"
        className="!text-1 !font-medium"
        required
      />
      <DetailBox
        title="Email"
        content="john@corner.com"
        className="!text-1 !font-medium"
        required
      />
      <DetailBox
        title="Gender"
        content="Male"
        className="!text-1 !font-medium"
        required
      />
    </Flex>
  )
}

export { PatientInfoAccordian }
