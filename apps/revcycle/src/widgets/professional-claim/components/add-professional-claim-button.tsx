import Link from 'next/link'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@psychplus/ui/button'

const AddProfessionalClaimButton = () => {
  return (
    <Link href={'professional-claim/add'}>
      <Button>
        <PlusIcon />
        Add Professional Claim
      </Button>
    </Link>
  )
}

export { AddProfessionalClaimButton }
