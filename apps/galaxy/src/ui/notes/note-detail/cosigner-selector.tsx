'use client'

import { Button, DropdownMenu } from '@radix-ui/themes'
import { NotesSendCosignerButton } from '../notes-send-consigner-button'

const CosignerSelect = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          variant="outline"
          color="gray"
          size="1"
          type="button"
          className="text-black justify-between capitalize disabled:pointer-events-none"
        >
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="mr-[-30px] mt-[25px] w-[165px] p-0 shadow-3"
        color="gray"
        side="left"
      >
        <DropdownMenu.Item
          onSelect={(e) => {
            e.preventDefault()
          }}
        >
          <NotesSendCosignerButton />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
export { CosignerSelect }
