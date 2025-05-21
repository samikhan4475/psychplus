import React from 'react'
import { Text } from '@radix-ui/themes'
import { Link } from 'lucide-react'

const RowLinkClaimAction = () => {
  return (
    <>
      <Link size={15} />
      <Text size="2" className="text-black">
        Link Claim with Visit
      </Text>
    </>
  )
}

export default RowLinkClaimAction
