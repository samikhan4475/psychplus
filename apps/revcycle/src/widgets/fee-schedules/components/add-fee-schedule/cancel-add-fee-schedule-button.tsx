import Link from 'next/link'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Button } from '@psychplus/ui/button'

interface Props {
  formDirty?: boolean
}

const CancelAddFeeScheduleButton = ({ formDirty }: Props) => {
  //TODO: Display cancel confirmation dialog on formDirty, if approved by the UX
  return (
    <>
      {formDirty ? (
        <Link href={'/widgets/fee-schedules'}>
          <Button>
            <Cross1Icon />
            Cancel
          </Button>
        </Link>
      ) : (
        <Link href={'/widgets/fee-schedules'}>
          <Button>
            <Cross1Icon />
            Cancel
          </Button>
        </Link>
      )}
    </>
  )
}

export { CancelAddFeeScheduleButton }
