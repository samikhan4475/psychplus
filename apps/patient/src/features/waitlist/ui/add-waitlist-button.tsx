import { useState } from 'react'
import { cn } from '@psychplus-v2/utils'
import { Button, Flex } from '@radix-ui/themes'
import { WaitlistIcon } from '@/components-v2'
import { WaitlistDialog } from './waitlist-dialog'

const AddWaitlistButton = ({ ...props }) => {
  const [open, setOpen] = useState(false)

  return (
    <Flex className={props.className}>
      <Button
        color={props.useAsAction ? 'gray' : 'blue'}
        variant={props.useAsAction ? 'outline' : 'solid'}
        highContrast={!props.useAsAction}
        className={cn(props.useAsAction ? 'text-black' : 'bg-pp-blue-3')}
        onClick={() => setOpen(true)}
      >
        <WaitlistIcon color={props.useAsAction ? '#8B8D98' : 'white'} />
        {props.title ?? 'Add Waitlist'}
      </Button>

      <WaitlistDialog open={open} setOpen={setOpen} />
    </Flex>
  )
}

export { AddWaitlistButton }
