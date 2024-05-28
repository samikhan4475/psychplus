import { Cross2Icon } from '@radix-ui/react-icons'
import { Text } from '@radix-ui/themes'
import { Dialog } from 'node_modules/@psychplus/ui/src/dialog'
import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { PreferredPartnerForm } from '@/widgets/preferred-partners-dialog/components/preferred-partner-form'

const RowActionEdit = ({
  row: { original: preferredPartners },
}: PropsWithRow<any>) => {
  return (
    <DropdownMenu.Item>
      <Dialog.Root>
        <Dialog.Trigger>
          <Text>Edit</Text>
        </Dialog.Trigger>
        <Dialog.Content className="relative max-w-[720px] rounded-6 p-12 font-bold text-[#151B4A]">
          <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
            <Cross2Icon />
          </Dialog.Close>
          <Dialog.Title size="8">Edit Preferred Partner</Dialog.Title>
          <PreferredPartnerForm data={preferredPartners} />
        </Dialog.Content>
      </Dialog.Root>
    </DropdownMenu.Item>
  )
}

export { RowActionEdit }
