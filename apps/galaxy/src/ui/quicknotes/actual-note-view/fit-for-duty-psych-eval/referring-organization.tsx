'use client'

import { Flex } from '@radix-ui/themes'
import { BlockContainer, LabelAndValue } from '../shared'

interface SharedReferralFields {
  referringOrganization: string
  referringOrganizationOtherDetails?: string
  intervieweeRole: string
  intervieweeRoleOtherDetails?: string
}

interface Props<T extends SharedReferralFields> {
  data: T
}

const ReferringOrganizationDetails = <T extends SharedReferralFields>({
  data,
}: Props<T>) => {
  return (
    <BlockContainer heading="">
      <Flex direction="column">
        <LabelAndValue
          label="Referral Organization:"
          value={data?.referringOrganization}
          allowEmptyValue
        />

        <LabelAndValue
          label="Interviewee Role:"
          value={data?.intervieweeRole}
          allowEmptyValue
        />
      </Flex>
    </BlockContainer>
  )
}

export { ReferringOrganizationDetails }
