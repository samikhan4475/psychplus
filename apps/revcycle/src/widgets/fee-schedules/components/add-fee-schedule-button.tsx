import Link from 'next/link'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@psychplus/ui/button'

const AddFeeScheduleButton = () => {
  return (
    <Link href={'fee-schedules/add'}>
      <Button>
        <PlusIcon />
        New Fee Schedule
      </Button>
    </Link>
  )
}

export { AddFeeScheduleButton }
